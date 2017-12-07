var fn_hello = async (ctx, next) => {
    ctx.response.body = `demo1111111111111111`;
};

module.exports = {
    'GET /hello': fn_hello
};