var express = require('express');
var path = require('path');

function getAll(model, res) {
	//lean(true) is good because it produces faster responses
	var found = model.find().lean(true);
	found.exec(function(err, items) {
		if(err) {
			return res.json({
				error: "Could not retrieve from the database"
			});
		};
		//return as json
		return res.json(items);
	});
}

function getOne(model, cond, res) {
	//lean(true) is good because it produces faster responses
	var found = model.findOne(cond, function(err, item) {
		if(err) {
			return res.json({
				error: "Could not retrieve from the database"
			});
		};
		//return as json
		return res.json(item);
	});
}


module.exports = function(app, models) {

	var Order = models.Order;
	var router = express.Router();
	//routes
	router.get('/orders', function(req, res) {
		getAll(Order, res);
	});

	router.post('/orders', function(req, res) {

		var client = req.body.client;
		var format =  req.body.format;
		var time = new Date();


		Order.create({
			client: client,
			format: format,
			date: time
		}, function(err, item) {
			if(err) {
				return res.json({
					error: "Could not save to the database"
				});
			}

			//return only one
			//res.json(item);

			//return all
			getAll(Order, res);
		});

	});

	router.get('/orders/:id', function(req, res) {
		var id = req.params.id;
		
		getOne(Order, {
			_id: id
		}, res);

	});

	//TO UPDATE, YOU NEED PUT
	/*
	router.put('/orders/:id', function(req, res) {
		var id = req.body.id;
		var client = req.body.client
		
		function that uses findOneAndUpdate from mongoose

	});
	*/

	var base = '/api'
	app.use(base, router);

	//create route for static files
	app.use('/static', express.static(path.resolve('./client/dist/public'))); 


	//if you want to set up specific routes at server level
	/*
	app.get('/orders', function(req, res) {
		return res.sendFile(path.resolve('./client/dist/index.html'));
	});
	*/

	//IF OUTSIDE THE API, YOU WANT TO RETRIEVE FILES
	app.get('*', function(req, res) {
		return res.sendFile(path.resolve('./client/dist/index.html'));
	}); 

}