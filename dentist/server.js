'use strict';
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '/Public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var port = process.env.PORT || 8080;

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "dentist"
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/Public/Page1.html');
});

app.post('/rezerwacja', (req, res) => {
	res.sendFile(__dirname + '/Public/Page2.html');
	res.cookie('godzina', req.body.godzina);
	console.log("submit");
	console.log(req.body);
});

app.post('/dane', (req, res) => {
	console.log(req.body);

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = "INSERT INTO wizyty (data, imie, tel) VALUES ('" + req.body.godzina + "', '" + req.body.imie + " " + req.body.nazwisko + "', '" + req.body.tel + "')";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
	});

	res.end("dziekujemy za rezerwacje");
});

http.listen(port, () => {

});