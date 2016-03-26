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

	if (!validator.isValidEmail(email)) {
		res.send('das nicht cool');
		return;
	};

	if (!userdb.isDBAvailable) {
		res.send('verbindung nicht mölich');
		return;
	};

	if (userdb.isUserAlreadyInDB(email)) {
		res.send('nutzer bereits in datenbank');
		return;
	};

	userdb.addUser(email, ciphertext);
	res.redirect('/')
});

module.exports = router;
