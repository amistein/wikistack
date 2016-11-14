var express = require('express');
var router = express.Router();
var wiki = require('./wiki');

router.get('/', function(req, res, next) {
  res.render('index');
});


router.use('/wiki', wiki);


module.exports = router;