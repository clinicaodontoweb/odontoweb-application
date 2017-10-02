var config = require('config');
var request	= require('request');
var requestBuilder = require('../helpers/requestOptionsBuilder');
var responseBuilder = require('../helpers/responseBuilder');
var express = require('express');
var router = express.Router();

var url = config.get('servicos.agenda');

router.get('/:entidade', function (req, res) {
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('GET', url + entidade, req);

	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
	
});

router.get('/:entidade/:hash', function (req, res) {
	var id = req.params.hash;
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('GET', url + entidade + '/' + id, req);
	
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
	
});

router.get('/:entidade/:entidade2/:hash', function (req, res) {
	var id = req.params.hash;
	var entidade = req.params.entidade;
	var entidade2 = req.params.entidade2;
	var options = requestBuilder.buildRequest('GET', url + entidade + '/' + entidade2 + '/' + id, req);
	
	// LOG REQUEST URL
	console.log(options);

	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
});

module.exports = router;