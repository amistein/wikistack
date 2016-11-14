var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
	res.redirect("/");

});

router.post('/', function(req,res,next){
	console.log(req.body);
	
	res.json(req.body);
});

router.get('/add', function(req,res,next){
	res.render("addpage");
	// res.send("returning 'add a wiki' form");
});




module.exports = router;