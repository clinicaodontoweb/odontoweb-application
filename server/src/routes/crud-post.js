var config = require('config');
var request	= require('request');
var requestBuilder = require('../helpers/requestOptionsBuilder');
var responseBuilder = require('../helpers/responseBuilder');
var express = require('express');
var router = express.Router();

var url = config.get('servicos.agenda');

router.post('/:entidade', function (req, res) {
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('POST', url + entidade, req);
	
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
	
});

router.post('/:entidade/:hash', function (req, res) {
	var id = req.params.hash;
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('POST', url + entidade + '/' + id, req);
	
	console.log("Request", options);
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
	
});


module.exports = router;