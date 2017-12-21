<template>
    <div>
        <el-tooltip class="item" effect="dark" content="此按钮可以对文章内容进行缩放哦" placement="top">
            <div style="position:absolute;left: 60%;cursor: pointer" @click="homeCardZoom">           
                <i v-show="zoom" class="el-icon-plus"></i>
                <i v-show="!zoom" class="el-icon-minus"></i>            
            </div>
        </el-tooltip>
        <el-card class="box-card" v-for="n in articles" :key="n.id">
                <div slot="header" class="clearfix">
                    <span style="color: #878d99;">文章类型：{{n.articleType}}</span>
                </div>
                <div class="home_card_author_block">
                        <img src="../assets/avatar/头像.jpg" alt="23333" class="home_card_img">
                        <span class="home_card_author_text">
                            <b class="home_card_author">{{n.uid}}</b>: {{AuthorInfo}}
                        </span>
                </div>
                <div class="title">
                    <router-link :to="{ name:'articleDetail', params: {aid: n.id} }"><b></b>{{n.title}}</b></router-link>
                </div>
                <div class="item">
                <div class="parent">
                    <div v-html="n.content" class="article_content">
                </div>
                </div>
                <div>
                    <el-row>
                    <el-col :span="3"><el-button type="text" class="button">{{comment}}条评论</el-button></el-col>
                    <el-col :span="3"><el-button type="text" class="button">收藏</el-button></el-col>
                    </el-row>          
                </div>
                </div>
            </el-card>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
      data() {
        return {
          articleType: '体育',
          articleTitle: '祝令昊真的贼鸡儿帅',
          articleContent: '<div><span style="background-color: rgb(238, 236, 224);"><i style="">作者：郑海波<br>链接：https://www.zhihu.com/question/263722132/answer/272863411<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</i><br></span><a href="111111111" target="_blank">11111111</a>🙃😆😄😏</div><div><pre><code><div style="text-align: center;"><font color="#f9963b"><u>console.log(aaaa);</u></font></div><div style="text-align: center;"><font color="#f9963b"><u>aaaaa</u></font></div></code></pre><p><br></p><table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th><strike>&nbsp;111</strike></th><th><strike>&nbsp;111</strike></th><th>111&nbsp;</th><th>111&nbsp;</th><th>&nbsp;111</th></tr><tr><td>&nbsp;111</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p><br></p><div><p>写一个Angular、React或Vue类似功能层级的现代MDV框架并没有像题主描述的那么难，我指的是并不需要太深入太强的计算机背景。这个<b>不难的背景</b>是在当前已经有那么多类似的MDV框架可以参考的前提下。</p><p><br></p><p>但同时也很难。比如你现在很难想象『<b>下一代的视图框架』</b>是长什么样的，因为没有这个背景条件。同理可推在Angular、React创立初期是产生了多大的思维突破，才可以将看似不合理的「脏检查」和「Virtual Dom」落地并产生普适的技术价值。</p><p>更难的是你如何将对应社区运营起来，形成开发者和框架维护者以及框架之间的良性循环。这里当然关乎技术视野，但不仅仅是技术单方面在起作用。  将一个东西做到<b>80%</b>和做到<b>90%</b>可能是一个几何级的投入差异。</p><p><br></p><p>回过头来说，工程师的本质其实就是: <b>『解决问题』</b>。  你的意义是发现你在工作中遇到的问题，并用各种可能的方式去解决它，就是看到<b>「钉子找锤子」</b> ，这个锤子可能就包含去造一个技术轮子。</p><p>但万万不是题目所表达的那种，为了写出一个框架这种虚无缥缈的目的，这很有可能会出现<b>「拿着锤子看什么都是钉子</b>」的误区。</p><p><br></p><p>举个简单的例子，如果一个复杂的前端业务需求，不需要到Excel这种量级，业务代码超过10W行。那如果能梳理出一个成熟清晰的业务框架，预留清晰的生命周期以及合理的细节封装，可以供10人以上小组同时无痛的开发，那他所隐含的技术复杂度就远比生产一个视图层框架要高得多。</p><p><br></p><p>我们在面试中，也会更倾向于招这类能发现问题并合理解决的人。因为业务问题一直都会存在，且各不相同。但纯粹去造技术框架的需求却不那么频繁。</p></div></div>',
          comment: '12',
          Author: 'MUSASHI',
          AuthorInfo: ' coming home!!!!',
          contentHeight: '',
          zoom: true
        }
      },
      props: {
        articles: {
            required: true
        }
      },
      created() {
        console.log(this.articles,"article...")
      },
      methods: {
        homeCardZoom() {
            if ($('.parent').css('min-height') == '500px') {
                $('.parent').animate({minHeight: 130}, 400);
                this.zoom = true
            } else {
                $('.parent').animate({minHeight: 500}, 400);
                this.zoom = false
            }
        }
      }
    }
  </script>
<style>
.el-card__header {
    padding-top: 10px;
    padding-bottom: 10px;
}
.el-card__body {
    padding-top: 10px;
    padding-bottom: 0;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.home_card_author_block img{
    height: 30px;
    width: 30px;
    position: absolute;
    border: 2px solid rgba(0,0,0,.08);
    border-radius: 5px
}
.home_card_author_block {
    margin-bottom: 10px;
    font-size: 14px;
    height: 30px;
    width: 30px;
    position: relative
}
.home_card_author_text {
    position: absolute;
    left: 45px;
    top: 7px;
    width: 400px;
    overflow: hidden;
}
.box-card {
    margin-bottom: 10px;
}

.parent{
    min-height: 130px;
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px;
    border: rgba(0,0,0,.08) solid 2px;
    border-radius: 5px;
    transition: .5s;
}
.title {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700
}
.article_content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
    font-size: 15px;
    overflow-y:scroll;
    overflow-x:hidden;
}
.el-icon-plus,
.el-icon-minus {
    font-size: 26px;
    color: rgb(133, 144, 166);
}
.el-icon-plus:hover,
.el-icon-minus:hover {
    color: #0f88eb;
    transition: .5s;
}
</style>