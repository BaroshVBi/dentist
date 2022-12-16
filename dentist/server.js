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
		res.cookie('rez', rez);
	});	
});

app.post('/rezerwacja', (req, res) => {
	res.sendFile(__dirname + '/Public/Page2.html');
	res.cookie('godzina', req.body.godzina);
});

app.post('/dane', (req, res) => {
	console.log(req.body);

	var sql = "INSERT INTO wizyty (data, imie, tel, cel) VALUES ('" + req.body.godzina + "', '" + req.body.imie + " " + req.body.nazwisko + "', '" + req.body.tel + "','" + req.body.cel + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	res.end("Dziękujemy za rezerwacje");
});

app.get('/admin', (req, res) => {
	var d = new Date();
	var dzisiaj = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 8:00:00";
	var sql = "SELECT * FROM `wizyty`"; // WHERE data > '" + dzisiaj + "'";

	var page = '<!DOCTYPE html>									' +
		'<html>												' +
		'	<head>											' +
		'		<link rel="stylesheet" href="styles.css">	' +
		'		<meta charset="utf-8" />					' +
		'		<title>Admin</title>						' +
		'	</head>											' +
		'	<body>											' +
		'		<div class="center"><h1>Admin</h1></div>	' +
		'		<table>										' +
		'			<tr>									' +
		'				<th>ID</th>							' +
		'				<th>Pacjent</th>					' +
		'				<th>NR Tel.</th>					' +
		'				<th>Data</th>						' +
		'				<th>Cel Wizyty</th>					' +
		'				<th>Przenieś</th>					' +
		'				<th>Usuń</th>						' +
		'			</tr>									';
				
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);

		for (var i = 0; i < result.length; i++) {
			var d = new Date(result[i].data);
			var data = d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate() + " " + d.getHours()+ ":00";
			page += "<tr>" +
				"<td>" + result[i].id + "</td>" +
				"<td> " + result[i].imie + "</td >" +
				"<td>" + result[i].tel + "</td>" +
				"<td>" + data + "</td>" +
				"<td>" + result[i].cel + "</td>" +
				"<td><form action='przenies' method='post'><button type='submit' class='wtabeli' name='id' value ='" + result[i].id + "'>Przenieś</button></form></td>" +
				"<td><form action='usun' method='post'><button type='submit' class='wtabeli' name='id' value ='" + result[i].id + "'>Usuń</button></form></td>" +
				"</tr> ";
		}

		page += '		<script src="Page3.js"></script>			' +
				'	</body>											' +
				'</html>											';
		res.send(page);
	});
});

app.post('/usun', (req, res) => {
	var sql = "DELETE FROM wizyty WHERE `wizyty`.`id` =" + req.body.id;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record deleted");
		res.redirect('/admin');
	});
});

app.post('/przenies', (req, res) => {
	res.sendFile(__dirname + '/Public/Page3.html');
	res.cookie('przenies', req.body.id);
});

app.post('/przenies2', (req, res) => {
	//console.log(req.body.data);
	var sql = "UPDATE`wizyty` SET `data` = '" +req.body.data + " " + req.body.godzina  + "' WHERE`wizyty`.`id` =" + req.body.id; 
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record changed");
		res.redirect('/admin');
	});
});

http.listen(port, () => {
	
});