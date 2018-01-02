var express = require('express'),
  _ = require('lodash'),
  config = require('../config'),
  jwt = require('jsonwebtoken');
mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', jwtCheck ,function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});



