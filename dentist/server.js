'use strict';
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var fs = require('fs');
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/Public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/Public/Page1.html');
});

http.listen(port, () => {
});


