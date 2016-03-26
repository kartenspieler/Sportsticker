var express = require('express');
var router = express.Router();
var validator = require('../validators.js');

router.get('/create', function(req, res, next) {
  res.render('userCreate');
});

router.post('/create', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	if (validator.isValidEmail(email) && password.length > 6) {
		res.send('good');
	} else {
		
	}
});

module.exports = router;
