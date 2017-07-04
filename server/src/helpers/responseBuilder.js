module.exports = {
	buildResponse: buildResponse
}

function buildResponse(error, response, body, res) {
	if (!error && response.statusCode == 200) {
		res.json(body);
	}else{
		res.status((error.code === 'ECONNREFUSED') ? 500 : error.code);
		res.json({error: 'Não foi possível conectar com o serviço!!!'});
	}
}