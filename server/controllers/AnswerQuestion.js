const model = require('../model');
let {Answer,Question,User,Topic,AnswerComment} = model.AllModels;
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
            description: '',
            commentData: ''
            
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
        let answerComments = await AnswerComment.findAll({
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
            item.commentData = []
            answerComments.forEach(commentItem => {

                if (commentItem.answerId == item.id) {
                    item.commentData.push(commentItem)
                }
            });
            item.commentData.sort(sortCreateTime)
            item.commentData.forEach(item => {
                item.createdAt = moment(item.createdAt).format('YYYY/MM/DD hh:mm')
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
        let answerDetail = await Answer.findAll({
            where: {
                id: id
            }
        })
        ctx.response.body = answerDetail;
    },
    'GET /api/getTopics':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let getTopic = await Topic.findAll({
        })
        ctx.response.body = getTopic;
    },
    'GET /api/getAnswerComments':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let aC = await AnswerComment.findAll({
        })
        ctx.response.body = aC;
    },
    'POST /api/addAnswerComment':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let addComment = await AnswerComment.create({
            uid: ctx.request.body.uid,
            answerId: ctx.request.body.answerId,
            comment: ctx.request.body.comment,
            username: ctx.request.body.username,
            upic: 'some'
        })
        ctx.response.body = 'success';
    },
    'GET /api/getAllQuestions':async (ctx, next) => {
        let questions = await Question.findAll({
        })
        let answerComments = await AnswerComment.findAll({
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
            item.commentData = []
            answerComments.forEach(commentItem => {

                if (commentItem.answerId == item.id) {
                    item.commentData.push(commentItem)
                }
            });
            item.commentData.sort(sortCreateTime)
            item.commentData.forEach(item => {
                item.createdAt = moment(item.createdAt).format('YYYY/MM/DD hh:mm')
            })
        });
        ctx.response.body = questions;
    },
    'POST /api/deleteQuestion': async (ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await Answer.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
    'POST /api/deleteAnswer': async (ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await Question.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
    'POST /api/deleteAnswerComment': async (ctx, next) => {
        ctx.response.type = 'application/json';
        var affectedRows = await AnswerComment.destroy({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = '删除成功';
    },
}