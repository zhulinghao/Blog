const model = require('../model');
let {Topic,Answer,Article,User} = model.AllModels;
const moment = require('moment')
module.exports = {
    'GET /api/getTopics':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let Topics = await Topic.findAll({
        })
        ctx.response.body = Topics;
    },
    'POST /api/getTopicDetail':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let TopicDetail = await Topic.findAll({
            where: {
                title: ctx.request.body.topic
            }
        })
        ctx.response.body = TopicDetail;
    },
    'POST /api/addTopic':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let addTopic = await Topic.create({
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            pic: ''
        })
        ctx.response.body = 'success';
    },
    'POST /api/getTopicAnswer':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let getTopicAnswer = await Answer.findAll({
            where: {
                topic: ctx.request.body.topic
            }
        })
        ctx.response.body = getTopicAnswer;
    },
    'POST /api/getTopicArticle':async (ctx, next) => {
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
    }
}