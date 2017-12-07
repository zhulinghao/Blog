const model = require('../model');
let User = model.User;
module.exports = {
    'POST /api/reg': async (ctx, next) => {
        let back = "";
        let tmpData = {
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            pic: ctx.request.body.pic,
            gender: ctx.request.body.gender
        };
        ctx.response.type = 'application/json';
        let username = await User.findAll({ where: {
            'username': tmpData.username
        } });
        if (username.length != 0) {
            back = "用户已存在"
        } else {
            let reg = await User.create({
                username: tmpData.username,
                password: tmpData.password,
                pic: tmpData.pic,
                gender: tmpData.gender
            })
            console.log(reg,"regggggg");
            back = "注册成功";
        }
        ctx.response.body = back;
    },
    'GET /api/userList': async (ctx, next) => {
        ctx.response.type = 'application/json';
        var users = await User.findAll({});
        ctx.response.body = users;
    },
    'POST /api/login': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let back = ""
        //登录验证
        let tmpData = {
            username: ctx.request.body.username,
            password: ctx.request.body.password
        }
        let username = await User.findAll({ where: {
            'username': tmpData.username
        } });
        if (ctx.session.user) {
            ctx.body = `${ctx.session.user.username} 已登录，请勿重复登录`
        }
        else if(username.length == 0) {
            console.log("用户不存在")
            back = "用户不存在"
        } else {
            let password = await User.findAll({
                where: {
                    'username': tmpData.username,
                    'password': tmpData.password 
                }
            });
            if(password.length == 0) {
                console.log("密码错误")
                back = "密码错误"
            } else {
                console.log("登陆成功")
                back = "登陆成功"
            }
        }
        ctx.response.body = back;
    }
};