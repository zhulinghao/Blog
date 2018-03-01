const model = require('../model');
let {FavoriteArticle,Article,User} = model.AllModels;

module.exports = {
    'POST /api/addFavoriteArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let addFA = await FavoriteArticle.create({
                uid: data.uid,
                aid: data.aid
        })
        ctx.response.body = addFA;
    },
    'POST /api/exameFavoriteArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let exame = await FavoriteArticle.findAll({
                where: {
                    uid: data.uid,
                    aid: data.aid
                }
        })
        if (exame.length != 0) {
            ctx.response.body = true;
        } else {
            ctx.response.body = false;
        }    
    },
    'POST /api/deleteFavoriteArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let deleteFA = await FavoriteArticle.destroy({
                where: {
                    uid: data.uid,
                    aid: data.aid
                }
        })
        ctx.response.body = '删除成功';
    },
    'POST /api/getFavoriteArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let getUser = await User.findAll({})
        let getFA = await FavoriteArticle.findAll({
                where: {
                    uid: data.uid
                }
        })
        let getArticle = await Article.findAll({})
        let articleData = []
        getFA.forEach(item => {
            getArticle.forEach(articleItem => {
                if (articleItem.id == item.aid) {
                    getUser.forEach(userItem => {
                        if (articleItem.uid == userItem.id) {
                            articleItem.username = userItem.username
                            articleItem.upic = userItem.pic                            
                            articleItem.udescription = userItem.description
                            articleData.push(articleItem)
                        }
                    })  
                }
            });
        });
        ctx.response.body = articleData;
    },
}