var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var md5 = require('md5');

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
//const apiHost = 'https://pbkk-online-absen-api.herokuapp.com'
module.exports = router;

//VIEW WEB
//login
router.get('/login', function(req, res,) {
    res.render('login', {});
});

//SignUP
router.get('/signup', function(req, res) {
    res.render('signup',{});
});

//index
router.get('/', function(req, res) {
    res.render('index',{});
});