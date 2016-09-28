var express = require('express');
var app = express();


var politicos = require('./politicos');
var doadores = require('./doadores');

app.use('/api', politicos);
app.use('/api', doadores);

module.exports = app;

	



