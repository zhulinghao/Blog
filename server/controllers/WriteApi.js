const model = require('../model');
let Article = model.Article;
module.exports = {
    'POST /api/addArticle': async (ctx, next) => {
        let tmpData = {
            uid: "uid",
            content: ctx.request.body.content,
            title: ctx.request.body.title,
            articleType: "体育"
        };
        ctx.response.type = 'application/json';
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