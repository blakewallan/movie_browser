var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
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