const model = require('../model');
let {User} = model.AllModels;

module.exports = {
    'POST /api/updataUserInfo': async (ctx, next) => {
        ctx.response.type = 'application/json';
        console.log(ctx.request.body.description)
        let upDataUserInfo = await User.update(
            {
                gender: ctx.request.body.gender,
                description: ctx.request.body.description
            },
            {
                where: {
                    id: ctx.request.body.uid
                }
            }
        )
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
}