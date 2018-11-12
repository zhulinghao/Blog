const model = require('../model')
const moment = require('moment')
let { Article, ArticleType, Comment, User, ArticleReply } = model.AllModels;
const Sequelize = require('sequelize');

module.exports = {
    'POST /api/addArticle': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let tmpData = {
            uid: ctx.request.body.uid,
            content: ctx.request.body.content,
            title: ctx.request.body.title,
            articleType: ctx.request.body.articleType
        };
        let write = await Article.create({
            uid: tmpData.uid,
            content: tmpData.content,
            title: tmpData.title,
            articleType: tmpData.articleType,
            upic: '',
            udescription: '',
            username: '',
            commentTimes: 0,
            fTimes: 0
        })
        ctx.response.body = tmpData;
    },
    'POST /api/editArticle': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let tmpData = {
            aid: ctx.request.body.aid,
            content: ctx.request.body.content,
            title: ctx.request.body.title,
            articleType: ctx.request.body.articleType
        };
        let write = await Article.update({
            content: tmpData.content,
            title: tmpData.title,
            articleType: tmpData.articleType,
        }, {
            where: {
                id: tmpData.aid
            }
        })
        ctx.response.body = '修改成功';
    },
    'GET /api/articleList': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let articles = await Article.findAll({});
        let getUser = await User.findAll({});
        let comments = await Comment.findAll({});
        articles.forEach(item => {
            comments.forEach(cItem => {
                if (cItem.aid == item.id) {
                    item.commentTimes += 1
                }
            });
            getUser.forEach(userItem => {

                if (item.uid == userItem.id) {
                    item.username = userItem.username
                    item.upic = userItem.pic
                    item.udescription = userItem.description
                }
            })
        });
        ctx.response.body = articles;
    },
    'POST /api/detailArticle': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let articles = await Article.findAll({
            where: {
                'id': ctx.request.body.aid
            }
        });
        ctx.response.body = articles;
    },
    'POST /api/addComment': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let addComment = await Comment.create({
            uid: ctx.request.body.uid,
            aid: ctx.request.body.aid,
            comment: ctx.request.body.comment,
            username: '',
            upic: ''
        });
        ctx.response.body = "发表评论成功";
    },
    'GET /api/getAllAriticleComment': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let getComment = await Comment.findAll({});
        let getUser = await User.findAll({});
        let articleData = await Article.findAll({});
        getComment.forEach(cItem => {
            articleData.forEach(aItem => {
                if (cItem.aid == aItem.id) {
                    cItem.aid = aItem.title
                }
            });
            // cItem.aTitle = articleData[0].title
            cItem.createdAt = moment(cItem.createdAt).format('YYYY/MM-DD hh:ss')
            getUser.forEach(uItem => {
                if (cItem.uid == uItem.id) {
                    cItem.username = uItem.username
                    cItem.upic = uItem.pic
                }
            })
        });
        ctx.response.body = getComment;
    },
    'POST /api/getAriticleComment': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let getUser = await User.findAll({});
        let aReply = await ArticleReply.findAll({})
        aReply.forEach(item => {
            item.createdAt = moment(item.createdAt).format('YYYY/MM-DD hh:ss')
            getUser.forEach(uItem => {
                if (item.uid === uItem.id) {
                    item.uid = uItem.username
                }
            })
        })
        let getComment = []
        await Comment.findAll({
            where: {
                aid: ctx.request.body.aid
            }
        }).then((result) => {
            getComment = result
        })
        getComment.forEach(cItem => {
            getUser.forEach(uItem => {
                if (cItem.uid == uItem.id) {
                    cItem.username = uItem.username
                    cItem.upic = uItem.pic
                }
            })
        });
        ctx.response.body = { getComment, aReply };
    },
    'POST /api/deleteArticle': async(ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await Article.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
    'POST /api/deleteArticleComment': async(ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await Comment.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
    'POST /api/addArticleReply': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let write = await ArticleReply.create({
            uid: data.uid,
            cid: data.cid,
            reply: data.reply,
        })
        ctx.response.body = data;
    },

};