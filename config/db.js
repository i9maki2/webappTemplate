var mongoose = require('mongoose');

exports.initialize = function(cb) {
	var db = mongoose.connection;
	db.on('error', console.error);
	db.once('open', function() {
		console.log('connecting to mongo');
		if(cb) cb();
	});

	//name of the database
	mongoose.connect('mongodb://localhost/webappDB');
} 