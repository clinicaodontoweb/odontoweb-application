var request	= require('request');
var requestBuilder = require('../helpers/requestOptionsBuilder');
var responseBuilder = require('../helpers/responseBuilder');
var express = require('express');
var router = express.Router();

var url = require('../helpers/urlHelper').agendaService;

router.post('/:entidade', function (req, res) {
	var entidade = req.params.entidade;
	var options = requestBuilder.buildRequest('POST', url + entidade, req);
	
	request(options, response);

	function response(error, response, body) {
		responseBuilder.buildResponse(error, response, body, res);
	}
	
});


module.exports = router;