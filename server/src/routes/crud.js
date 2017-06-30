var request	= require('request');
var requestBuilder = require('../helpers/requestOptionsBuilder');
var express = require('express');
var router = express.Router();

var url = require('../helpers/urlHelper').agendaService;

router.use(function (req, res, next) {
	if (req.get('X-AUTH-TOKEN') != undefined) {
		next();
	} else {
		res.status(401);
		res.json({erro: 'Acesso Negado!!! Token não encontrado'})
	}
})

router.get('/:entidade', function (req, res) {
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('GET', url + entidade, req);
	
	request(options, response);

	function response(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}else{
			res.status(response.statusCode);
			res.json(body);
		}
	}
	
});

router.get('/:entidade/:id', function (req, res) {
	var id = req.params.id;
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('GET', url + entidade + '/' + id, req);
	
	request(options, response);

	function response(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}else{
			res.status(response.statusCode);
			res.json(body);
		}
	}
	
});

router.post('/:entidade', function (req, res) {
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('POST', url + entidade, req);
	
	request(options, response);

	function response(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}else{
			res.status(response.statusCode);
			res.json(body);
		}
	}
	
});

router.put('/:entidade/:id', function (req, res) {
	var id = req.params.id;
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('POST', url + entidade + '/' + id, req);
	
	request(options, response);

	function response(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}else{
			res.status(response.statusCode);
			res.json(body);
		}
	}
	
});


module.exports = router;