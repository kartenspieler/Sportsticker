var express = require('express');
var router = express.Router();
var validator = require('../validators.js');
var userdb = require('../userdb.js');
var CryptoJS = require("crypto-js");
var credentials = require('../credentials.js');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

router.get('/create', function(req, res, next) {
  res.render('userCreate');
});

router.post('/create', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var ciphertext = CryptoJS.AES.encrypt(password, credentials.secret);

	if (validator.isValidEmail(email) && password.length > 6) {

	} else {
		
	}
});

module.exports = router;
