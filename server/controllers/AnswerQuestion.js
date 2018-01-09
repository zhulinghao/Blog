const model = require('../model');
let {Answer,Question,User,Topic} = model.AllModels;
const moment = require('moment')
module.exports = {
    'POST /api/addAnsewer':async (ctx, next) => {
        await Answer.create({
            title: ctx.request.body.title,
            topic: ctx.request.body.topic,
            content: ctx.request.body.content,
            uid: ctx.request.body.uid,
            username: ctx.request.body.username,
            tid: ''
        })
        ctx.response.body = "提问成功";
    },
    'POST /api/addQuestion':async (ctx, next) => {
        await Question.create({
            content: ctx.request.body.content,
            uid: ctx.request.body.uid,
            answerid: ctx.request.body.answerid,
            username: '',
            upic: '',
            description: ''
        })
        ctx.response.body = "回答成功";
    },
    'POST /api/getQuestions':async (ctx, next) => {
        let aid = ctx.request.body.aid
        let questions = await Question.findAll({
            where: {
                answerid: aid
            }
        })
        let getUserInfo = await User.findAll({
        })
        let sortCreateTime = (a,b) => {
            return b.createdAt - a.createdAt
        }
        questions.sort(sortCreateTime)
        questions.forEach(item => {
            item.createdAt = moment(item.createdAt).format('YYYY/MM/DD hh:mm')
            getUserInfo.forEach(userItem => {
                if (item.uid == userItem.id) {
                    item.username = userItem.username
                    item.description = userItem.description
                    item.upic = userItem.pic
                }
            })
        });
        ctx.response.body = questions;
        
    },
    'GET /api/getAnswers':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let answers = await Answer.findAll({
        })
        ctx.response.body = answers;
    },
    'POST /api/answerDeatil':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let id = ctx.request.body.id
        console.log(id)
        let answerDetail = await Answer.findAll({
            where: {
                id: id
            }
        })
        ctx.response.body = answerDetail;
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
    'GET /api/getTopics':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let getTopic = await Topic.findAll({
        })
        ctx.response.body = getTopic;
    }
}