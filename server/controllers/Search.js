const model = require('../model')
const moment = require('moment')
let { User, Article, Topic, Answer } = model.AllModels

module.exports = {
    'POST /api/searchComprehensive': async(ctx, next) => {
        ctx.response.type = 'application/json';
        let getUser = await User.findAll({})
        let value = ctx.request.body.value
        let searchA = await Article.findAll({
            where: {
                title: {
                    '$like': `%${value}%`
                }
            }
        })
        let searchU = await User.findAll({
            where: {
                username: {
                    '$like': `%${value}%`
                }
            }
        })
        let searchT = await Topic.findAll({
            where: {
                title: {
                    '$like': `%${value}%`
                }
            }
        })
        let searchQ = await Answer.findAll({
            where: {
                title: {
                    '$like': `%${value}%`
                }
            }
        })
        searchQ.forEach(item => {
            item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
        })
        searchA.forEach(articleItem => {
            articleItem.createdAt = moment(articleItem.createdAt).format('YYYY/MM/DD')
            getUser.forEach(userItem => {
                if (articleItem.uid == userItem.id) {
                    articleItem.username = userItem.username
                    articleItem.upic = userItem.pic
                    articleItem.udescription = userItem.description
                }
            })
        });
        ctx.response.body = {
            searchA,
            searchU,
            searchQ,
            searchT
        }
    }
}