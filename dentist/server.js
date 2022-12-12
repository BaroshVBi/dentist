'use strict';
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var fs = require('fs');
var cookie = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/Public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/Public/Page1.html');
});

app.post('/rezerwacja', (req, res) => {
	res.sendFile(__dirname + '/Public/Page1.html');
	console.log("submit");
	console.log(req.body.godzina);
});


http.listen(port, () => {

});