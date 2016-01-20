var express = require('express');
var request = require('request');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.user) {
        search.getTopTorrents('Movie', function(topTorrents){
            var titles = search.getTopTorrentTitles(topTorrents.topTorrents);
            res.render('browse', {results : {topTorrents: topTorrents, titles : titles}});
        })
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }


});

module.exports = router;