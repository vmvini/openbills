var express = require('express');
var app = express();

var anos = require('./anos');
var meses = require('./meses');
var cidades = require('./cidades');
var estados = require('./estados');
var variaveis = require('./variaveis');
var vardetails = require('./vardetails');
var tabulado = require('./tabulado');
var politicos = require('./politicos');

app.use('/api', anos );
app.use('/api', meses);
app.use('/api', cidades);
app.use('/api', estados);
app.use('/api', variaveis);
app.use('/api', vardetails);
app.use('/api', tabulado);

app.use('/api', politicos);

module.exports = app;

	



