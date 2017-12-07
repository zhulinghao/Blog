const db = require('../db');

module.exports = db.defineModel('users', {
    id: db.ID,
    username: {
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(100),
    pic: db.STRING(100),
    gender: db.BOOLEAN,
});