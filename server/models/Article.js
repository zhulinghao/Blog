const db = require('../db');

module.exports = db.defineModel('articles', {
    id: db.ID,
    uid: db.STRING(100),
    articleType: db.STRING(100),
    content: db.STRING(3000),
    title: db.STRING(100),
});