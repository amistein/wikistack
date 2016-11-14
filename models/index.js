var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});


var Page = db.define('page',{
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: null
  },

}, 
  {
    getterMethods: { 
      route:  function() { 
        return "/wiki/" + this.urlTitle; 
      }
    }
});

Page.hook('beforeValidate', function(page) {
  page.urlTitle = page.title.replace(/[^a-zA-Z\d]/g, '_');
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = {Page, User};
