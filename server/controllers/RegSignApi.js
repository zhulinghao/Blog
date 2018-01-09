const model = require('../model');
let {User} = model.AllModels;
module.exports = {
    'POST /api/reg': async (ctx, next) => {
        let back = "";
        let tmpData = {
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            pic: '../../static/avatar/default.jpg',
            description: '这个人很懒，什么都没留下',
            gender: ctx.request.body.gender
        };
        ctx.response.type = 'application/json';
        let username = await User.findAll({ where: {
            'username': tmpData.username
        } });
        if (username.length != 0) {
            back = false
        } else {
            let reg = await User.create({
                username: tmpData.username,
                password: tmpData.password,
                pic: tmpData.pic,
                gender: tmpData.gender,
                description: tmpData.description
            })
            back = true;
        }
        ctx.response.body = back;
    },
    'GET /api/userList': async (ctx, next) => {
        ctx.response.type = 'application/json';
        var users = await User.findAll({});
        ctx.response.body = users;
    },
    'GET /api/logOut': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.session = null
        ctx.response.body = "已成功注销";
    },
    'POST /api/addAvatar': async (ctx, next) => {
        ctx.response.type = 'application/json';
        console.log(ctx,"ctxxxxxxxxxxxxxxxxxxx")
        ctx.response.body = "UPDATE";
    },
    'POST /api/login': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let back = ""
        let username = await User.findAll({ where: {
            'username': ctx.request.body.username
        }});
        let uid = username[0].id
        //登录验证   登录成功返回  1  密码错误返回 2   用户不存在返回 3   不允许重复登录返回 4
        let tmpData = {
            username: ctx.request.body.username,
            password: ctx.request.body.password
        }
        if(ctx.session.isLogin) {
            back = 4
        }
        else if(username.length == 0) {
            back = 3
        } else {
            let password = await User.findAll({
                where: {
                    'username': tmpData.username,
                    'password': tmpData.password 
                }
            });
            if(password.length == 0) {
                back = 2
            } else {
                let session = ctx.session
                session.isLogin = true
                session.username = tmpData.username
                session.uid = uid 
                back = 1
            }
        }
        ctx.response.body = back;
    },
    'GET /api/examine': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let back
        let user = await User.findAll({
            where: {
                id: ctx.session.uid
            }
        })
        if (user[0]) {
            back = {
                uid: ctx.session.uid,
                username: ctx.session.username,
                isLogin: ctx.session.isLogin,
                upic: user[0].pic
            }
        } else {
            back = {
                uid: ctx.session.uid,
                username: ctx.session.username,
                isLogin: ctx.session.isLogin,
                upic: 'nonono'
            }
        }
        ctx.response.body = back;
    }
};