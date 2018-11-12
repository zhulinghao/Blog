const model = require('../model');
let { FavoriteTopic, Topic, Answer, Article, User } = model.AllModels;
const moment = require('moment')
module.exports = {
    'POST /api/getTopics': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let Topics = await Topic.findAll({})
        let fT = await FavoriteTopic.findAll({})
        fT.forEach((fItem) => {
            Topics.forEach((tItem) => {
                if (fItem.uid === data.uid && tItem.id === fItem.tid) {
                    tItem.version = 1
                }
            })
        })
        ctx.response.body = Topics;
    },
    'POST /api/getTopicDetail': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let TopicDetail = await Topic.findAll({
            where: {
                title: ctx.request.body.topic
            }
        })
        ctx.response.body = TopicDetail;
    },
    'POST /api/addTopic': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let addTopic = await Topic.create({
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            pic: '/static/topic/topic.jpg',
            fTimes: 0
        })
        ctx.response.body = 'success';
    },
    'POST /api/getTopicAnswer': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let getTopicAnswer = await Answer.findAll({
            where: {
                topic: ctx.request.body.topic
            }
        })
        ctx.response.body = getTopicAnswer;
    },
    'POST /api/deleteTopic': async(ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await Topic.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
    'POST /api/getTopicArticle': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let getUser = await User.findAll({})
        let getTopicArticle = await Article.findAll({
            where: {
                articleType: ctx.request.body.topic
            }
        })
        getTopicArticle.map(element => {
            getUser.forEach(uItem => {
                if (element.uid === uItem.id) {
                    element.username = uItem.username
                    element.upic = uItem.pic
                    element.username = uItem.username
                    element.createdAt = moment(element.createdAt).format('YYYY/MM/DD')
                }
            });
        });
        ctx.response.body = getTopicArticle;
    },
    'POST /api/updatTopic': async(ctx, next) => {
        let updateBook = await Topic.update({
            title: ctx.request.body.title,
            content: ctx.request.body.content
        }, {
            where: {
                id: ctx.request.body.id
            }
        })
        ctx.response.body = '更新成功';
    }
}