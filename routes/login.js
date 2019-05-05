var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var expressValidator= require('express-validator');

var url = 'mongodb://localhost:27017/registration';

router.get('/', function(req, res, next) {
  res.render('loginN',{title:"MINI NETFLIX",heading:"LOG IN"});
});

router.post('/login', function(req, res){
    email = req.body.email;
    password = req.body.password;
    mongo.connect(url, function(err, db){
        var dbo = db.db('registration');
        var query = {email: email, password: password}
        
        dbo.collection('details').findOne(query,function(err, user){
            if(err) throw new Error(err);
            
            if(!user) {
              console.log('Not found');
              res.render('loginN',{heading:"NOT FOUND",title:"MINI NETFLIX"});
              }
            else {
              console.log("found");
              res.render('loginN',{heading:"FOUND",title:"MINI NETFLIX"});
            }
        })
        db.close();
    });
   

});

module.exports = router;
    