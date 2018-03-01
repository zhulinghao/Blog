const model = require('../model')
const moment = require('moment')
let {User,PrivateMessage} = model.AllModels

module.exports = {
    'POST /api/addPrivateMessage':async (ctx, next) => {
        ctx.response.type = 'application/json';
        let data = ctx.request.body
        let addMessage = await PrivateMessage.create({
            senderId: data.senderId,
            toUid: data.toUid,
            content: data.content,
            userInfo: ''
        })
        ctx.response.body = '私信发送成功'
    },
    'POST /api/getPrivateMessage':async (ctx, next) => {
        let getM = await PrivateMessage.findAll({
            where: {
                'toUid': ctx.request.body.uid
            }
        })
        let tmp = await PrivateMessage.findAll({
            where: {
                'senderId': ctx.request.body.uid
            }
        })
        let getUser = await User.findAll({})
        getM.push.apply(getM,tmp);
        let kk = []
        getM.forEach(element => {
            if(element.senderId != ctx.request.body.uid) {
                kk.push(element.senderId)
            }
        });
        kk = Array.from(new Set(kk))
        let newData = [] , tmpData = []
        for(let i = 0; i < kk.length; i++) {
            let forData1 = await PrivateMessage.findAll({
                where: {
                    'senderId': kk[i]
                }
            })
             let forData2 = await PrivateMessage.findAll({
                 where: {
                     'toUid': kk[i],
                     'senderId': ctx.request.body.uid
                 }
             })
            for(let i in forData2){
                forData1.push(forData2[i]);
            }
            tmpData.push(forData1)
        }
        let sortCreateTime = (a,b) => {
            return a.createdAt - b.createdAt
        }
        tmpData.forEach(element => {
            element.sort(sortCreateTime)
            element.forEach(item => {
                item.createdAt = moment(item.createdAt).format('YYYY/MM/DD/hh:mm')
                item.userInfo = {
                    senderUsername: "",
                    senderUpic: "",
                    toUsername: "",
                    toUpic: ""
                }
                getUser.forEach(userItem => {
                    if (item.senderId == userItem.id) {
                        item.userInfo.senderUsername = userItem.username
                        item.userInfo.senderUpic = userItem.pic
                    } 
                    else if (item.toUid == userItem.id) {
                        item.userInfo.toUsername = userItem.username
                        item.userInfo.toUpic = userItem.pic
                    }
                });
            });
        });
        ctx.response.body = tmpData
    }
}