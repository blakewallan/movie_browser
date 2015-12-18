var express = require('express');
var request = require('request');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res) {

    search.searchTheMovieDB('alien');
    res.render('index');

});


module.exports = router;