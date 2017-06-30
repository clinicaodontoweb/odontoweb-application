var TOKEN = 'X-AUTH-TOKEN';

module.exports = validateToken

function validateToken(req, res, next){
	if (req.get(TOKEN) != undefined) {
		next();
	} else {
		res.status(401);
		res.json({erro: 'Acesso Negado!!! Token não encontrado'})
	}
}
