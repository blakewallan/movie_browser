var express = require('express');
var request = require('request');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res) {
    //res.render('index');
    search.getTopTorrents('Movie', function(topTorrents){
        res.render('index', topTorrents);
    })
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