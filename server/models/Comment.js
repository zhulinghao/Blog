const db = require('../db');

module.exports = db.defineModel('comments', {
    id: db.ID,
    uid: db.STRING(100),
    aid: db.STRING(100),
    comment: db.STRING(1000)
});