var express = require('express');
var request = require('request');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res) {

    request('http://api.themoviedb.org/3/movie/popular?api_key=36d4951c7e63c2fae40cb79cbd457168', function(err, response, body){
        //console.log(JSON.parse(response.body).results);
        res.render('index', {top : JSON.parse(response.body).results});
    });
});


module.exports = router;