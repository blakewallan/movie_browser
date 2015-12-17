var express = require('express');
var request = require('request');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res) {

    //TODO: add show functionality
    search.getTopTorrents('Movie', function(topTorrents){
        var titles = search.getTopTorrentTitles(topTorrents.topTorrents);
        res.render('browse', {results : {topTorrents: topTorrents, titles : titles}});
    })
});

module.exports = router;