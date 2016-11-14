var express = require('express');
var router = express.Router();
var wiki = require('./wiki');
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

    // "route": "/wiki/Border_Collies",
    // "id": 1,
    // "title": "Border Collies",
    // "urlTitle": "Border_Collies",
    // "content": "My dog is a border collie.",

router.use('/wiki', wiki);


module.exports = router;