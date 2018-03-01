const db = require('../db/db');

module.exports = {
    Answer: db.defineModel('answers', {
        id: db.ID,
        title: db.STRING(100),
        topic: db.STRING(100),
        tid: db.STRING(100),        
        content: db.STRING(20000),
        uid: db.STRING(100),
        username: db.STRING(100)
    }),
    Article: db.defineModel('articles', {
        id: db.ID,
        uid: db.STRING(100),
        articleType: db.STRING(100),
        content: db.STRING(20000),
        title: db.STRING(100),
        upic: db.STRING(100),
        udescription: db.STRING(100),
        username: db.STRING(100)
    }),
    ArticleType: db.defineModel('articleType', {
        id: db.ID,
        type: db.STRING(100),
    }),
    Comment: db.defineModel('comments', {
        id: db.ID,
        uid: db.STRING(100),
        aid: db.STRING(100),
        comment: db.STRING(1000),
        username: db.STRING(100),
        upic: db.STRING(100)
    }),
    AnswerComment: db.defineModel('answercomments', {
        id: db.ID,
        uid: db.STRING(100),
        answerId: db.STRING(100),
        comment: db.STRING(1000),
        username: db.STRING(100),
        upic: db.STRING(100)
    }),
    Question: db.defineModel('questions', {
        id: db.ID,
        uid: db.STRING(100),
        answerid: db.STRING(100),
        content: db.STRING(20000),
        username: db.STRING(100),
        description: db.STRING(100),
        upic: db.STRING(100),
        commentData: db.STRING(100)
    }),
    User: db.defineModel('users', {
        id: db.ID,
        username: {
            type: db.STRING(100),
            unique: true
        },
        password: db.STRING(100),
        pic: db.STRING(100),
        gender: db.BOOLEAN,
        description: db.STRING(100),
    }),
    Topic: db.defineModel('topics', {
        id: db.ID,
        title: {
            type: db.STRING(100),
            unique: true
        },
        content: db.STRING(2000),
        pic: db.STRING(100),
    }),
    FavoriteArticle: db.defineModel('favoriteArticles', {
        id: db.ID,
        uid: db.STRING(100),
        aid: db.STRING(100)
    }),
    PrivateMessage: db.defineModel('privatemessages', {
        id: db.ID,
        senderId: db.STRING(100),
        toUid: db.STRING(100),
        content: db.STRING(1000),
        userInfo: db.STRING(10)
    })
}