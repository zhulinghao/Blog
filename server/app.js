const Koa = require('koa')
const fs = require('fs');
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const controller = require('./controller')
const app = new Koa()

//koa2-cors解决前后端分离跨域问题
const cors = require('koa2-cors');
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowHeaders: ['Access-Control-Allow-Origin', '*', 'Content-Type', 'Authorization', 'Accept'],
}))
// 配置存储session信息的mysql
let store = new MysqlSession({
  user: 'root',
  password: 'password',
  database: 'blog',
  host: 'localhost',
})

// 存放sessionId的cookie配置
let cookie = {
  domain: 'localhost', // 写cookie所在的域名
  path: '', // 写cookie所在的路径
  maxAge: 10 * 60 * 10000, // cookie有效时长
  expires: new Date('2017-12-11'), // cookie失效时间
  httpOnly: false, // 是否只用于http请求中获取
  overwrite: false // 是否允许重写
}

// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
app.use(bodyParser());
app.use(router.routes());
//
app.use(controller());
app.listen(5000);
