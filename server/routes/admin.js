var express = require('express');
var router = express.Router();

// nutzer abrufen
var userSchema = require('../model/user.js');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log('OPEN');
});
mongoose.connect('mongodb://localhost/movie');
var User = mongoose.model('User', userSchema.schema);

router.get('/listusers', function (req, res, next) {
	User.find({} ,{} ,function (err, docs) {
		res.render('adminListUser', {
			user: docs
  		});
    });

  
});

module.exports = router;