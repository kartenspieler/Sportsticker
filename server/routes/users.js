var express = require('express');
var router = express.Router();
var validator = require('../validators.js');
var userdb = require('../userdb.js');
var CryptoJS = require("crypto-js");
var credentials = require('../credentials.js');
var userSchema = require('../model/user.js');
var assert = require('assert');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log('OPEN');
});

mongoose.connect('mongodb://localhost/movie');

var User = mongoose.model('User', userSchema.schema);

router.get('/create', function(req, res, next) {
	res.render('userCreate');
}); 

router.post('/create', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var ciphertext = CryptoJS.AES.encrypt(password, credentials.secret);
	password = ciphertext.toString();	

	if (!validator.isValidEmail(email)) {
		return res.send('Ungültige E-Mail');
	};
	
	var newUser = new User({
		email: email,
		password: password
	});

	User.findOne({ email: email }, function (err, user) {
		if (user == null) {
			userSchema.saveUser(res, err, newUser);
		} else {
			res.send('Nutzer bereits vorhanden');
		}
	});
});

module.exports = router;
