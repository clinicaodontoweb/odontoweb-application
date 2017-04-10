module.exports	=	function(app){
	
	var request	= require('request');
	var service	= 'http://127.0.0.1:3334/agenda-service/cep';
	
	app.post('/cep', function (req, res) {
		request = request.defaults({
			headers: {
				'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
			}
		});
		
		request.post({url: service, json: req.body }, function(error, response, body){
			res.send(body);
		});
	});

	app.put('/cep', function (req, res) {
		request = request.defaults({
			headers: {
				'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
			}
		});
		
		request.put({url: service, json: req.body }, function(error, response, body){
			res.send(body);
		});
	});

	app.get('/cep', function (req, res) {
		request = request.defaults({
			headers: {
				'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
			}
		});
		
		request.get({url: service}, function(error, response, body){
			res.json(JSON.parse(body));
		});
	});

	app.get('/cep/:id', function (req, res) {
		request = request.defaults({
			headers: {
				'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
			}
		});
		
		request.get({url: service + '/' + req.params.id}, function(error, response, body){
			res.json(JSON.parse(body));
		});
	});

	app.delete('/cep/:id', function (req, res) {
		request = request.defaults({
			headers: {
				'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
			}
		});
		
		request.del({url: service + '/' + req.params.id}, function(error, response, body){
			res.json(body);
		});
	});
}