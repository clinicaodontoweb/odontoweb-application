module.exports	=	function(app){
	
	var request	= require('request');
	var service	= 'http://127.0.0.1:8001/autenticacao-service';
	
	app.post('/login', function (req, res) {
		request.post({
			url: service + '/auth', 
			json: req.body
		},function(error, response, body){
			if (!error && response.statusCode == 200) {
				res.json(body);
			}else{
				res.status(401).send('usuário ou senha inválidos');
			}
		});

	});

	app.get('/change/tenant/:id', function (req, res) {
		request = request.defaults({
			headers: {
				'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
			}
		});
		
		request.get({url: service + '/auth/' + req.params.id}, function(error, response, body){
			res.json(JSON.parse(body));
		});
	});

	app.get('/me', function (req, res) {
		request = request.defaults({
			headers: {
				'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
			}
		});
		
		request.get({url: service + '/me'}, function(error, response, body){
			res.json(JSON.parse(body));
		});
	});
}