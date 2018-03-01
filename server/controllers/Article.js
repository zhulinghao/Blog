const model = require('../model')
const moment = require('moment')
let {Article,ArticleType,Comment,User} = model.AllModels;
module.exports = {
    'POST /api/addArticle': async (ctx, next) => {
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
            username: ''
        })
        ctx.response.body = tmpData;
    },
    'GET /api/articleList': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let articles = await Article.findAll({});
        let getUser = await User.findAll({})
        articles.forEach(item => {
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
    'POST /api/detailArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let articles = await Article.findAll({
            where:{
                'id': ctx.request.body.aid
            }
        });
        ctx.response.body = articles;
    },
    'POST /api/addComment': async (ctx, next) => {
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
    'GET /api/getAllAriticleComment': async (ctx, next) => {
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
    'POST /api/getAriticleComment': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let getComment = await Comment.findAll({
            where: {
                aid: ctx.request.body.aid
            }
        });
        let getUser = await User.findAll({});
        getComment.forEach(cItem => {
            getUser.forEach(uItem => {
                if (cItem.uid == uItem.id) {
                    cItem.username = uItem.username
                    cItem.upic = uItem.pic
                }
            })
        });
        ctx.response.body = getComment;
    },
    'POST /api/deleteArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await Article.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
    'POST /api/deleteArticleComment': async (ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await Comment.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
};