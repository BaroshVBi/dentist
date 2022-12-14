'use strict';
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

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

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get('/', (req, res) => {
	var d = new Date();
	var dzisiaj = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 15:00:00";
	console.log(dzisiaj);

	var sql = "SELECT data FROM `wizyty` WHERE data > '" + dzisiaj + "'";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);

		var rez = "";
		for (var i = 0; i < result.length; i++) {
			var time = new Date(result[i].data);
			rez +=  time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ':00:00,';
		}
		console.log(rez);

		res.sendFile(__dirname + '/Public/Page1.html');
		res.cookie('rez', string);
	});
		
});

app.post('/rezerwacja', (req, res) => {
	res.sendFile(__dirname + '/Public/Page2.html');
	res.cookie('godzina', req.body.godzina);
});

app.post('/dane', (req, res) => {
	console.log(req.body);

	var sql = "INSERT INTO wizyty (data, imie, tel) VALUES ('" + req.body.godzina + "', '" + req.body.imie + " " + req.body.nazwisko + "', '" + req.body.tel + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	res.end("Dziêkujemy za rezerwacje");
});

http.listen(port, () => {

});