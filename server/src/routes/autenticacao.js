var config = require('config');
var request	= require('request');
var requestBuilder = require('../helpers/requestOptionsBuilder');
var responseBuilder = require('../helpers/responseBuilder');
var express = require('express');
var router = express.Router();

var url = config.get('servicos.autenticacao');

router.post('/', function (req, res) {
	var options = requestBuilder.buildRequest('POST', url + 'auth', req);

	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}

});

router.get('/tenant/update/:id', function (req, res) {
	var idClinica = req.params.id;
	var options = requestBuilder.buildRequest('GET', url + 'auth' + '/' + idClinica, req);
		
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

router.get('/me', function (req, res) {
	var options = requestBuilder.buildRequest('GET', url + 'me', req);
		
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

router.get('/clinicas', function (req, res) {
	var options = requestBuilder.buildRequest('GET', url + 'usuario/clinica/dentista', req);
		
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

router.get('/dentista/:cnpj', function (req, res) {
	var cnpj = req.params.cnpj;
	var options = requestBuilder.buildRequest('GET', url + 'dentista/clinica/' + cnpj, req);
		
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

router.get('/dentista/detalhe/:id', function (req, res) {
	var id = req.params.id;
	var options = requestBuilder.buildRequest('GET', url + 'dentista/' + id, req);
		
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

router.get('/recepcionista/detalhe/:id', function (req, res) {
	var id = req.params.id;
	var options = requestBuilder.buildRequest('GET', url + 'recepcionista/' + id, req);
		
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

router.post('/dentista', function (req, res) {
	var options = requestBuilder.buildRequest('POST', url + 'dentista', req);

	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}

});

router.post('/recepcionista', function (req, res) {
	var options = requestBuilder.buildRequest('POST', url + 'recepcionista', req);

	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}

});

router.get('/recepcionista/clinica/:cnpj', function (req, res) {
	var cnpj = req.params.cnpj;
	var options = requestBuilder.buildRequest('GET', url + 'recepcionista/clinica/' + cnpj, req);

	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}

});

module.exports = router;