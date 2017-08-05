module.exports = {
	buildRequest: buildRequest
}

function buildRequest(method, url, req) {
	var request = {
		url: url,
		method: method,
		json: true,
		body: req.body,
		qs: req.query,
		headers: {
			'X-AUTH-TOKEN': req.get('X-AUTH-TOKEN')
		}
	}

	if(!req.get('X-AUTH-TOKEN'))
		delete request.headers

	return request;
}
