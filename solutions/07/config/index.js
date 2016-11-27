module.exports = (function() {
    if(process.env.NODE_ENV === 'prod') return require(__base + 'config/config.prod.json');
    return require(__base + 'config/config.dev.json');
}());