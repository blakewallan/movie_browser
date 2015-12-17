var express = require('express');
var request = require('request');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res) {

    res.render('index');
    search.searchTheMovieDB('Alien');

});


module.exports = router;