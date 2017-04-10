module.exports	=	function(app){
	var path	=	require('path');
	
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../../../', 'client/index.html'));
	});
}