var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  Page.findAll({})
  .then(function(pages) {
    // console.log(entries);

    res.render('index.html',{pages});
  });

});

router.use('/wiki', wikiRouter);

router.use('/users', userRouter);


module.exports = router;