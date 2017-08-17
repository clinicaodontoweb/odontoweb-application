module.exports = {
	buildResponse: buildResponse
}

function buildResponse(error, response, body, res) {
	if (!error && response.statusCode) {
		res.status(response.statusCode);
		res.json(body);
	}else{
		if(error && error.code === 'ECONNREFUSED') {
			res.status(500);
			res.json({error: 'Não foi possível conectar com o serviço!!!'});
		}else {
			res.status(error.code);
		}
	}
}