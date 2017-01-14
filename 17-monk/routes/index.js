var url = '';

var express = require('express');
var router = express.Router();
var db = require('monk')(url);
var userData = db.get('user-data'); // get the user-data collection

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var data = userData.find(); // pass empty object to tell monk that we want all the entries for user-data
  // we set data as a promise by setting it equal to the db operation

  data.then(function(docs) { // asynchronous promise
    res.render('index', { items: docs });

    db.close();
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = userData.insert(item);

  data.then(function() { // asynchronous promise
    db.close();
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

  // userData.update({ '_id': db.id(id) }, item); // need to convert id string to id "object"
  // we can use this ^ one or this one:
  var data = userData.updateById(id, item); // doesn't require converting id string to id "object"

  data.then(function() { // asynchronous promise
    db.close();
  });

  res.redirect('/get-data');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  // userData.remove({ '_id': db.id(id) }); // same situation as /update
  var data = userData.removeById(id);

  data.then(function() { // asynchronous promise
    db.close();
  });

  res.redirect('/get-data');
});

module.exports = router;
