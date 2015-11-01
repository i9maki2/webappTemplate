$(function() {
	var orders = $("#orders");
	$.getJSON('http://localhost:3000/api/orders', function(response) {
		var html = "";
		response.forEach(function(order) {
			html += "<p id='"+order._id+"'>Client: "+order.client+", Format: "+order.format+", Date: "+order.date+"</p>";
		});
		orders.html(html);
	});
});