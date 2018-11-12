const model = require('../model');
let {FavoriteTopic,FavoriteArticle,FavoriteQuestion,Answer,Article,User,Topic} = model.AllModels;
const Sequelize = require('sequelize');

module.exports = {
    'POST /api/addFavoriteArticle': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let addFA = await FavoriteArticle.create({
                uid: data.uid,
                aid: data.aid
        })
        let upDataFAritcle = await Article.update(
            {
                fTimes: Sequelize.literal('`fTimes` +1')
            },
            {
                where: {
                    id: data.aid
                }
            }
        )
        ctx.response.body = addFA;
    },
    'POST /api/addFavoriteTopic': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let isF = await FavoriteTopic.findAll({
            where: {
                uid: data.uid,
                tid: data.tid
            }
        });
        if (isF.length !== 0) {
            ctx.response.body = isF;
        } else {
            let addFT = await FavoriteTopic.create({
                uid: data.uid,
                tid: data.tid
            })
            let upDataFAritcle = await Topic.update(
                {
                    fTimes: Sequelize.literal('`fTimes` +1')
                },
                {
                    where: {
                        id: data.tid
                    }
                }
            )
            ctx.response.body = true;
        }
    },
    'POST /api/addFavoriteQuestion': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let isF = await FavoriteQuestion.findAll({
            where: {
                uid: data.uid,
                qid: data.qid
            }
        });
        if (isF.length !== 0) {
            ctx.response.body = isF;
        } else {
            let addFQ = await FavoriteQuestion.create({
                uid: data.uid,
                qid: data.qid
            })
            let upDataFAritcle = await Answer.update(
                {
                    fTimes: Sequelize.literal('`fTimes` +1')
                },
                {
                    where: {
                        id: data.qid
                    }
                }
            )
            ctx.response.body = true;
        }
    },
    'POST /api/exameFavoriteT': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let exame = await FavoriteTopic.findAll({
                where: {
                    uid: data.uid,
                    tid: data.aid
                }
        })
        if (exame.length !== 0) {
            ctx.response.body = true;
        } else {
            ctx.response.body = false;
        }
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
    'POST /api/getFavoriteTopic': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let getFT = await FavoriteTopic.findAll({
                where: {
                    uid: data.uid
                }
        })
        let getTopic = await Topic.findAll({})
        let topicData = []
        getFT.forEach(item => {
            getTopic.forEach(topicItem => {
                if (topicItem.id == item.tid) {
                    topicData.push(topicItem)
                }
            });
        });
        ctx.response.body = topicData;
    },
    'POST /api/getFavoriteQuestion': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let getFQ = await FavoriteQuestion.findAll({
                where: {
                    uid: data.uid
                }
        })
        let getQuestion = await Answer.findAll({})
        let quesData = []
        getFQ.forEach(item => {
            getQuestion.forEach(quesItem => {
                if (quesItem.id == item.qid) {
                    quesData.push(quesItem)
                }
            });
        });
        ctx.response.body = quesData;
    }
}
