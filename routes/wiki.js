var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req,res,next){
	res.redirect("/");
  
});


router.post('/', function(req,res,next){
	// console.log(req.body);
	var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  
  page.save()
  .then(function(entry) {
    // console.log(entry);
    res.redirect(entry.route);
  });

});

router.get('/add', function(req,res,next){
  res.render('addpage');
});

router.get('/:url', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.url
    }
  })
  .then(function(entry) {
    // console.log(entry);
    res.render('wikipage', {page: entry});
  });
});





module.exports = router;