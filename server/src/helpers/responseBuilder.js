module.exports = {
	buildResponse: buildResponse
}

function buildResponse(error, response, body, res) {
	if (!error && response.statusCode == 200) {
		res.json(body);
	}else{
		res.status(response.statusCode);
		res.json(body);
	}
}