const path = require('path');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// controller = require('./controller');
var multer = require('multer');


app.set('view engine', 'ejs');
app.set('views', 'views');

// var app = express();

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(upload.array());

//Require the Router we defined in "file".js
var routes = require('./routes/routesAPI.js');

//Use the Router on the sub route
app.use('/', routes);

app.listen(3000);
console.log('Server running...');