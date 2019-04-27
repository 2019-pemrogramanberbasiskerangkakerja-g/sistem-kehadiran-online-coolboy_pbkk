var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var path = require("path");

//setting middleware
app.use('/css',express.static(__dirname +'/css'));
app.use('/static',express.static(path.join(__dirname + 'public'))); //Serves resources from public folder
var server = http.createServer(function (req, res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

server.listen(5000);
console.log('Server running on 5000...');