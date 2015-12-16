var express = require('express');
var searchThing = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res){
    res.redirect('/');
});

//Route for search in nav bar
//TODO: make sure all search requests route through here
router.post('/', function(req, res){
    var term = req.body.q;

    searchThing.searchOMDB(term, function (results) {
        res.render('results', results);
    })
});

module.exports = router;