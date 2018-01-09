const model = require('../model');
let {Article,ArticleType,Comment,User} = model.AllModels;
module.exports = {
    'POST /api/addArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let getType = await ArticleType.findAll({
            where: {
                id: ctx.request.body.articleType
            }
        })
        let tmpData = {
            uid: ctx.request.body.uid,
            content: ctx.request.body.content,
            title: ctx.request.body.title,
            articleType: getType[0].type,
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
    'GET /api/articleType': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let types = await ArticleType.findAll({});
        ctx.response.body = types;
    },
    'GET /api/addType': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let reg = await ArticleType.create({
            type: "科学"
        })
        ctx.response.body = '';
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
            comment: ctx.request.body.comment
        });
        ctx.response.body = "发表评论成功";
    },
    'POST /api/getAriticleComment': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let getComment = await Comment.findAll({
            where: {
                aid: ctx.request.body.aid
            }
        });
        ctx.response.body = getComment;
    }
};