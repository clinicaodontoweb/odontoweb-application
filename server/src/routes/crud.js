var request	= require('request');
var requestBuilder = require('../helpers/requestOptionsBuilder');
var express = require('express');
var router = express.Router();
var url = require('../helpers/urlHelper').agendaService;

router.use(require('../helpers/tokenValidation'));

router.use(require('./crud-get'));
router.use(require('./crud-post'));
router.use(require('./crud-put'));
router.use(require('./crud-delete'));

module.exports = router;