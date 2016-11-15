var express = require('express');
var app = express();
var router = require('./routes');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./models');

var env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');

app.engine('html', nunjucks.render);

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));
app.use(router);


models.User.sync({/*force: true*/})
.then(function() {
  models.Page.sync({/*force: true*/})
})
.then(function() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
})
.catch(console.error);


