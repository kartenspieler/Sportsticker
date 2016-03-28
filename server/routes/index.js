var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('welcome');
});

router.get('/login', function (req, res, next) {
	res.render('userLogin');
});

module.exports = router;
