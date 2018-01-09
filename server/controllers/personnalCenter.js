const model = require('../model');
let {User} = model.AllModels;

module.exports = {
    'GET /api/updateDescription': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let reg = await User.update(
            {description: 'fucku11111111111'},
            {
                'where': {
                     username: 'zlh'
                }
        })
        ctx.response.body = reg;
    },
}