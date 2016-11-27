var router = require('express').Router();
var oppressor = require('oppressor');
var bcrypt = require('bcrypt');
var User = require(__base + 'db').models.User;
var fs = require('fs');
var jwt = require('./jwt');


function mid(req, res, next) {
    var token;
    if(token = req.headers['x-access-token']) {
         jwt.verify(token).then(decoded => {
             if(decoded.email === 'ivan@abv.bg') next();
         });
         return;
    }
    res.status(401).end();
}

router.get('/index', mid, function(req, res) {
    var rs = fs.createReadStream('./data.txt')
    rs.on('err', function(err) {
        console.error(err);
        res.stats(500).send('Msg: ...').end();
    })
    rs.pipe(oppressor(req)).pipe(res);
});

router.get('/user/:id', function(req, res) {
    var id = req.params.id;
    res.status(200).end();
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email }, function(err, user) {
        if(err) return res.status(500).end();
        bcrypt.compare(password, user.password, function(err, match) {
            if(err) return res.status(500).end();
            if(!match) return req.status(200).send('Wrong email or password!').end();
            var token = jwt.sign({ _id: user._id });
            res.status(200).send({ token: token, success: true }).end();
        });
    });
});

router.post('/register', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = new User({ email: email, password: password });
    user.save(function(err) {
        if(err) return res.status(500).end();
        res.status(200).end();
    })
});

router.post('/index', mid, function(req, res) {
    console.log(req.body);
    res.status(200).end();
});

module.exports = router;
