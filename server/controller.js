const fs = require('fs');
const multer = require('koa-multer')
// add url-route in /controllers:

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping);
  });
}

function upLoad(router) {
  const model = require('./model');
  let {
    User,
    Topic
  } = model.AllModels;
  let name = ''
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/static/avatar')
    },
    filename: (req, file, cb) => {
      let tmp = file.originalname.split('.')
      let suffix = '.' + tmp[tmp.length - 1]
      name = Date.now() + suffix
      cb(null, name)
    }
  })
  const upload = multer({
    storage: storage
  })
  router.post('/api/updataAvatar', upload.single('avatar'), async (ctx, next) => {
    let uid = ctx.req.body.uid
    await User.update({
      pic: `/static/avatar/${name}`
    }, {
      'where': {
        id: uid
      }
    })
    ctx.response.body = name;
    await next()
  })
  const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../static/topic')
    },
    filename: (req, file, cb) => {
      let tmp = file.originalname.split('.')
      let suffix = '.' + tmp[tmp.length - 1]
      name = Date.now() + suffix
      cb(null, name)
    }
  })
  const upload2 = multer({
    storage: storage2
  })
  router.post('/api/updataTopicPic', upload2.single('topicPic'), async (ctx, next) => {
    let tid = ctx.req.body.tid
    await Topic.update({
      pic: `/static/topic/${name}`
    }, {
      'where': {
        id: tid
      }
    })
    ctx.response.body = name
    await next()
  });
  console.log('aaaaaaaaaaaaaaaa~')
}
module.exports = function (dir) {
  let controllers_dir = dir || 'controllers'
  let router = require('koa-router')();
  addControllers(router, controllers_dir);
  upLoad(router);
  return router.routes();
};
