var express = require('express');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res){
    res.redirect('/');
});

//Route for search in nav bar
router.post('/', function(req, res){
    var term = req.body.q;

    search.searchOMDB(term, function (results) {
        //console.log(results.results[0]);
        res.render('results', results);
    })
});

module.exports = router;