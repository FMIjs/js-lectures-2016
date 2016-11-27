var jwt = require('jsonwebtoken');
var config = require(__base + 'config');

module.exports = {
    sign: payload => jwt.sign(payload, config.jwt.secret),
    verify: token => new Promise((resolve, reject) => 
        jwt.verify(token, secret, (err, decoded) => err ? reject(err) : resolve(decoded)))
};

