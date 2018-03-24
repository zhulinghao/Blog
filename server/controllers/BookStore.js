const model = require('../model')
const moment = require('moment')
let {BuyBook,User,BookStore} = model.AllModels;
module.exports = {
    'POST /api/addBook': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let tmpData = {
            pic: ctx.request.body.pic,
            name: ctx.request.body.name,
            author: ctx.request.body.author,
            promotion: ctx.request.body.promotion,
            description: ctx.request.body.description
        };
        let book = await BookStore.create({
            pic: tmpData.pic,
            name: tmpData.name,
            author: tmpData.author,
            promotion: tmpData.promotion,
            description: tmpData.description,
            collectionTimes: 0
        })
        ctx.response.body = tmpData;
    },
    'GET /api/getBooks': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let book = await BookStore.findAll({});
        ctx.response.body = book;
    },
    'POST /api/getBookDetail': async (ctx, next) => {
        ctx.response.type = 'application/json';
        console.log(ctx.request.body.id,"idddd")
        let bookDetail = await BookStore.findAll({
            where: {
                id: ctx.request.body.id
            }
        });
        ctx.response.body = bookDetail;
    },
    'POST /api/buyBook': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let req = await BuyBook.create({
            Uid: ctx.request.body.Uid,
            bookId: ctx.request.body.bookId
        });
        ctx.response.body = 0;
    },
    'POST /api/exameBookDetail': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let req = await BuyBook.findAll({
            where: {
                Uid: ctx.request.body.Uid,
                bookId: ctx.request.body.bookId
            }
        });
        ctx.response.body = req;
    },
    'POST /api/getMyBook': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let bookId = await BuyBook.findAll({
            where: {
                Uid: ctx.request.body.Uid
            }
        });
        let book = await BookStore.findAll({});
        let req = []
        book.forEach(element => {
            bookId.forEach(idItem => {
                if (idItem.bookId === element.id) {
                    req.push(element)
                }
            });
        });
        ctx.response.body = req;
    }

};