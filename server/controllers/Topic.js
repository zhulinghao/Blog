const model = require('../model');
let {Topic,Answer} = model.AllModels;

module.exports = {
    'GET /api/getTopics':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let Topics = await Topic.findAll({
        })
        ctx.response.body = Topics;
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
    }
}