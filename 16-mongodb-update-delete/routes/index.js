var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) { // this block runs asynchronously
    assert.equal(null, err);
    var cursor = db.collection('user-data').find(); // get all entries
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() { // called after all iterations are done
      db.close();
      res.render('index', { items: resultArray });
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({ '_id': objectId(id) }, { $set: item }, function(err, result) { // first parameter identifies data, second parameter specifies what the new data should be
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });

  res.redirect('/get-data');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({ '_id': objectId(id) }, function(err, result) { // first parameter identifies data, no second parameter because we're not adding new data
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });

  res.redirect('/get-data');
});

module.exports = router;
