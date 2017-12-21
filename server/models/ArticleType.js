const db = require('../db');

module.exports = db.defineModel('articleType', {
    id: db.ID,
    type: db.STRING(100),
});