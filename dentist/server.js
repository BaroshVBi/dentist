'use strict';
var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8080;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //res.end('Hello Worldbeeeeee\n');
    fs.readFile('Page1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(port);
