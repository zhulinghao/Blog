const model = require('../model');
let {User,Article} = model.AllModels;
const moment = require('moment')
const md5 = require('js-md5');

module.exports = {
    'POST /api/updataUserInfo': async (ctx, next) => {
        ctx.response.type = 'application/json';
        if (ctx.request.body.password === '') {
            let upDataUserInfonp = await User.update(
                {
                    username: ctx.request.body.username,
                    gender: ctx.request.body.gender,
                    description: ctx.request.body.description
                },
                {
                    where: {
                        id: ctx.request.body.uid
                    }
                }
            )
        } else {
            let upDataUserInfo = await User.update(
                {
                    username: ctx.request.body.username,
                    gender: ctx.request.body.gender,
                    description: ctx.request.body.description,
                    password: md5(ctx.request.body.password)
                },
                {
                    where: {
                        id: ctx.request.body.uid
                    }
                }
            )
        }

        ctx.response.body = '更新成功';
    },
    'GET /api/updateDescription': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let reg = await User.update(
            {description: 'fucku11111111111'},
            {
                'where': {
                     username: 'zlh'
                }
        })
        ctx.response.body = reg;
    },
    'POST /api/getUserInfo': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let userInfo = await User.findAll({
           where: {
            id: data.uid
           }
        })
        ctx.response.body = userInfo;
    },
    'POST /api/getDataA': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let getUser = await User.findAll({})
        let userArticle = await Article.findAll({
           where: {
            uid: data.uid
           }
        })
        userArticle.map(element => {
            getUser.forEach(uItem => {
                if (element.uid === uItem.id) {
                    element.username = uItem.username
                    element.upic = uItem.pic
                    element.username = uItem.username
                    element.createdAt = moment(element.createdAt).format('YYYY/MM/DD')
                }
            });
        });
        ctx.response.body = userArticle;
    },
}
