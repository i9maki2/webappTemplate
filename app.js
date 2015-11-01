//start express server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//allows for form data 
app.use(bodyParser.urlencoded({'extended': 'true'}));
//allows for json parsing
app.use(bodyParser.json());

//configure the routes
var db = require('./config/db');
db.initialize(function() {
	console.log('connection successful');
});

var models = require('./config/models');
//configure the routes
require('./config/routes')(app, models);


//listen on port 3000/
var port = 3000;
app.listen(port);
console.log('app listening on port '+port)
