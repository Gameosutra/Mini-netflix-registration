var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var expressValidator= require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var url = 'mongodb://localhost:27017/registration';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register',{title:"MINI NETFLIX"});
});

router.post('/insert', function(req, res, next) {

    req.checkBody("name","Name must not be empty.").notEmpty();
    req.checkBody("email","Email is invalid, please try again!!").isEmail();
    req.checkBody("password","Must use as many characters as you like");
    req.checkBody("passwordmatch","Confirmed password didnt match").equals(req.body.password);
  
    var errors= req.validationErrors();
  
    if(errors){
     //console.log(`errors: ${JSON.stringfy(errors)}`);
  
      res.render("register",{title:"Registration error", errors: errors});
    }else{

    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var item = {
        name: req.body.name,
        email: req.body.email,
        password: hash
    };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('details').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      res.render('register', {
        title: 'Registration Completed'
      });
      db.close();
    });
  });
}
 
});

module.exports = router;
