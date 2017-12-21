const model = require('../model');
let Article = model.Article;
let ArticleType = model.ArticleType;
let User = model.User;
module.exports = {
    'POST /api/addArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let getType = await ArticleType.findAll({
            where: {
                id: ctx.request.body.articleType
            }
        })
        let getUname = await User.findAll({
            where: {
                id: ctx.request.body.uid
            }
        })
        console.log(getType,"aaaaaaaaaaasss")
        let tmpData = {
            uid: getUname[0].username,
            content: ctx.request.body.content,
            title: ctx.request.body.title,
            articleType: getType[0].type
        };
        let write = await Article.create({
            uid: tmpData.uid,
            content: tmpData.content,
            title: tmpData.title,
            articleType: tmpData.articleType
        })
        ctx.response.body = "文章已经成功发表";
    },
    'GET /api/articleList': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let articles = await Article.findAll({});
        ctx.response.body = articles;
    },
    'GET /api/articleType': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let types = await ArticleType.findAll({});
        ctx.response.body = types;
    },
    'GET /api/addType': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let reg = await ArticleType.create({
            type: '科技'
        })
        ctx.response.body = '';
    },
    'POST /api/detailArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        console.log(ctx.request.body,"aaaaaaaaaaaaaaa");
        let articles = await Article.findAll({
            where:{
                'id': ctx.request.body.aid
            }
        });
        ctx.response.body = articles;
    }
};