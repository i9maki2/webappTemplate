var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	client: String,
	format: String,
	date: Date
});

module.exports = {
	Order: mongoose.model('Order', orderSchema)
};