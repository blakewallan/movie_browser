var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/restricted', function(req, res) {
  if (req.user) {
    res.render('restricted');
  } else {
    req.flash('danger','You do not have permission to see this page');
    res.redirect('/');
  }
});

router.get('/browse', function(req, res){
  if(req.user) {
    res.render('browse');
  }
  else {
    req.flash('danger', 'Please log in or sign up');
    res.redirect('/');
  }
});

module.exports = router;