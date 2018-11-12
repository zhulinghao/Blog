<template>
  <div>
    <a v-show="showDBtn" class="editMyArticle" @click="editMyA(aid)">修改</a>
    <a v-show="showDBtn" class="deleteMyArticle" @click="deleteMyA(aid)">删除</a>
    <div class="article_comments_head">
      {{commentQuantity}}条评论
    </div>
    <div class="writeComment clearfix">
      <el-input :disabled="!loginStatic.isLogin" style="width: 695px;" v-model="content" @keyup.enter.native="Published"></el-input>
      <el-button :disabled="!loginStatic.isLogin" @click="Published" style="width: 100px;">发表评论</el-button>
    </div>
    <div class="article_comments" v-loading="loading">
      <div class="article_comment_block" v-for="(item,index) in allcomments" :key="item.id">
        <div class="article_comment_block_user">
          <div>
            <img style="cursor:pointer" @click="toUserDetail(item.uid.split(',')[0])" :src="item.upic">
            <div style="cursor:pointer" @click="toUserDetail(item.uid.split(',')[0])" class="username">{{item.username}}</div>
          </div>
          <div class="article_comments_content">
            {{item.comment}}
          </div>
          <a class="aReply" @click="sReplyBlock(index)">回复</a>
          <a class="deleteBtn" v-show="showDBtn" @click="deleteComment(item.id)">删除</a>
        </div>
        <div class="article_comment_block_time">{{item.createdAt}}</div>
        <div class="replyBlock" v-show="showRB">
          <el-input v-model="reply" @keyup.enter.native="articleReply(item.uid,item.id)" style="width: 645px;margin-left: 50px;"></el-input>
          <el-button style="width: 100px;" @click="articleReply(item.uid,item.id)">回复</el-button>
        </div>
        <div class="replysBlock">
          <div class="replyItem" v-for="rItem in item.replys" :key="rItem.uid">
            <b>{{rItem.uid}}:</b> {{rItem.reply}}
            <span>{{rItem.createdAt}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "../utils/axiosService";
export default {
  name: "detail",
  components: {},
  data() {
    return {
      content: "",
      allcomments: "",
      commentQuantity: "",
      loading: false,
      showDBtn: false,
      reply: "",
      showRB: false
    };
  },
  props: ["loginStatic", "aid", "username"],
  created() {
    if (this.loginStatic.username === this.username) {
      this.showDBtn = true;
    }
    this.getComments();
  },
  methods: {
    sReplyBlock(index) {
      let a = document.getElementsByClassName("replyBlock");
      if (a[index].style.display === "block") {
        a[index].style.display = "none";
        this.comment = "";
      } else {
        for (let x in a) {
          if (a[x].style !== undefined) {
            a[x].style.display = "none";
          }
        }
        a[index].style.display = "block";
      }
    },
    articleReply(uid, cid) {
      let data = {
        uid: uid,
        reply: this.reply,
        cid: cid
      };
      axios
        .post("/api/addArticleReply", data)
        .then(res => {
          this.reply = "";
          this.sucMessage("回复成功");
          this.getComments();
        })
        .catch(error => {
          console.log(error);
        });
    },
    toUserDetail(uid) {
      if (uid == this.loginStatic.uid) {
        this.$router.push({
          path: `/personnalCenter/${uid}/me/first`
        });
      } else {
        this.$router.push({
          path: `/personnalCenter/${uid}/others/first`
        });
      }
    },
    Published() {
      let that = this;
      let data = {
        aid: this.aid,
        uid: this.loginStatic.uid,
        comment: this.content
      };
      axios
        .post("/api/addComment", data)
        .then(function(req) {
          that.getComments();
          that.$message({
            message: "评论发表成功",
            type: "success",
            duration: 1000
          });
          that.content = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
    getComments() {
      this.loading = true;
      let that = this;
      let data2 = {
        aid: this.aid
      };
      axios.post("/api/getAriticleComment", data2).then(function(req) {
        req.data.getComment.forEach(item => {
          let tmp = [];
          req.data.aReply.forEach(rItem => {
            if (item.id === rItem.cid) {
              tmp.push(rItem);
            }
          });
          item.replys = tmp;
        });
        let tmpData = req.data.getComment;
        let sortCreateTime = (a, b) => {
          return b.createdAt - a.createdAt;
        };
        tmpData.sort(sortCreateTime);
        tmpData.forEach(item => {
          item.createdAt = moment(item.createdAt).format("YYYY/MM/DD hh:mm");
        });
        that.commentQuantity = tmpData.length;
        that.allcomments = tmpData;
        setInterval(() => {
          that.loading = false;
        }, 500);
      });
    },
    deleteComment(id) {
      let data = {
        id: id
      };
      this.$confirm("确定要删除这条评论吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/api/deleteArticleComment", data)
            .then(res => {
              this.sucMessage(res.data);
              this.getComments();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000
          });
        });
    },
    editMyA(id) {
      this.$router.push({
        path: `/write/${id}`
      });
    },
    deleteMyA(id) {
      let data = {
        id: id
      };
      this.$confirm("确定要删除这个文章吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/api/deleteArticle", data)
            .then(res => {
              this.sucMessage(res.data);
              this.getComments();
              this.$router.push({
                path: "/home"
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000
          });
        });
    }
  }
};
</script>
<style>
.replyBlock {
  margin-bottom: 10px;
  margin-top: 20px;
}

.replysBlock {
  margin: 10px 0 10px 50px;
  background: #f5f5f5;
}

.replyItem {
  padding: 10px;
}

.replyItem b {
  color: #0f88eb;
  cursor: pointer;
}

.replyItem span {
  color: #999;
  float: right;
}

.article_comment_block {
  margin: 15px 0;
  border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
  position: relative;
}

.article_comment_block_user {
  position: relative;
}

.aReply {
  position: absolute;
  right: 20px;
  bottom: -30px;
  cursor: pointer;
}

.aReply:hover {
  color: #0f88eb;
  transition: 0.3s;
}

.article_comment_block_user img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.username {
  position: absolute;
  top: 0px;
  left: 60px;
  font-weight: 700;
}

.article_comments_content {
  position: absolute;
  top: 25px;
  left: 60px;
}

.article_comment_block_time {
  color: gray;
  font-size: 14px;
  margin: 10px 0;
}

.article_comments_head {
  margin: 40px 0;
  padding-left: 20px;
}

.article_comments_head {
  border-left: 5px solid gray;
  font-weight: 700;
}

.writeComment {
  margin-bottom: 30px;
}

.article_comments {
  padding-bottom: 100px;
}

.deleteBtn {
  position: absolute;
  cursor: pointer;
  bottom: -30px;
  right: 70px;
}

.deleteMyArticle,
.editMyArticle {
  position: absolute;
  top: 20px;
  cursor: pointer;
  font-weight: 700;
}

.editMyArticle {
  right: 300px;
}

.deleteMyArticle {
  right: 350px;
}
</style>