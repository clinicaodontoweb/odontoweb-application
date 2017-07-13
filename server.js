var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;

//client-app
app.use(express.static('./dist/'));
app.use('/partials', express.static('./dist/app/'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//api
app.use('/api/v1/crud', require('./server/src/routes/crud'));
app.use('/api/v1/auth', require('./server/src/routes/autenticacao'));

app.listen(port, function () {
	console.log("Server up and runnig on port: ", port);
})