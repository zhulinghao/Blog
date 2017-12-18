const db = require('../db');

module.exports = db.defineModel('types', {
    tid: db.ID,
    type: db.STRING(3000),
});