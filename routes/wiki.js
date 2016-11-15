var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req,res,next){
	res.redirect("/");

});


router.post('/', function(req,res,next){
  // res.json(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
  });

  User.findOrCreate({  
    where: {
      name: req.body["author-name"],
      email: req.body["author-email"]
    }
  })
  .then(function(instance) {
    page.setAuthor(instance[0]);
  })
  
  
  page.save()
  .then(function(entry) {
    res.redirect(entry.route);
  });

});

router.get('/add', function(req,res,next){
  res.render('addpage');
});

router.get('/:url', function(req, res, next) {
  var entryPromise = Page.findOne({
    where: {
      urlTitle: req.params.url
    }
  });

  var authorPromise = entryPromise.then(entry => entry.getAuthor())
  
  Promise.all([entryPromise, authorPromise])
  .then(function(values) {
    // console.log('id:', values[1].id);
    res.render('wikipage', {page: values[0], author: values[1]});
  });

  // .then(function(entry) {
  //   console.log('entry:', entry);
  //   res.render('wikipage', {page: entry});
  // });
});





module.exports = router;