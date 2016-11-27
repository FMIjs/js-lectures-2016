global.__base = __dirname + '/';
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    res.render('user/login', { title: 'Login' , teamViewer: 'm07-789-829' });
});
app.use('/api', router);

app.listen(3000, function() {
    console.log('Server listening on 3000');
});