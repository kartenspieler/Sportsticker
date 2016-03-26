var express = require('express');
var router = express.Router();

router.get('/accounts', function(req, res, next) {
  res.send('accounts');
});

module.exports = router;