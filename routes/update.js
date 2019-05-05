var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var expressValidator= require('express-validator');

var url = 'mongodb://localhost:27017/registration';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('update',{title:"MINI NETFLIX",heading:"Update Data",headingg:"Delete Data"});
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('details').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('update', {items: resultArray,title:"MINI NETFLIX",heading:"Update Data",headingg:"Delete Data"});
    });
  });
});

router.post('/upddate', function(req, res, next) {
  var item = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('details').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      res.render('update',{title:"MINI NETFLIX",headingg:"Delete Data",heading:"Data Updated"});
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('details').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      res.render('update',{title:"MINI NETFLIX",heading:"Update Data",headingg:"Item Deleted"});
      db.close();
    });
  });
});

module.exports = router;
