var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;

//client-app
app.use('/public', express.static('./client/public/'));
app.use('/fonts', express.static('./client/public/fonts/'));
app.use('/partials', express.static('./client/partials/'));
app.use(require('./server/src/routes'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//api
app.use('/api/v1/crud', require('./server/src/routes/crud'));
app.use('/api/v1/auth', require('./server/src/routes/autenticacao'));

app.listen(port, function () {
	console.log("Server up and runnig on port: ", port);
})