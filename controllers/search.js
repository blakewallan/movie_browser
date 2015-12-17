var express = require('express');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res){
    res.redirect('/');
});

//Route for search in nav bar
router.post('/', function(req, res){
    var term = req.body.q;

    console.log(search.searchTheMovieDB(term));
});

module.exports = router;