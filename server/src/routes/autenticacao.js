var request	= require('request');
var requestBuilder = require('../helpers/requestOptionsBuilder');
var responseBuilder = require('../helpers/responseBuilder');
var express = require('express');
var router = express.Router();

var url = require('../helpers/urlHelper').autenticacaoService;

router.post('/', function (req, res) {
	var options = requestBuilder.buildRequest('POST', url + 'auth', req);
	console.log(options);		
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}

});

router.get('/tenant/update/:id', function (req, res) {
	var idClinica = req.params.id;
	var options = requestBuilder.buildRequest('GET', url + 'auth' + '/' + idClinica, req);
		
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

router.get('/me', function (req, res) {
	var options = requestBuilder.buildRequest('GET', url + 'me', req);
		
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

module.exports = router;