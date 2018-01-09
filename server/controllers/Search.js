const model = require('../model')
const moment = require('moment')
let {User,Article} = model.AllModels

module.exports = {
    'POST /api/searchComprehensive':async (ctx, next) => {
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
            searchA: searchA,
            searchU: searchU
        }
    }
}