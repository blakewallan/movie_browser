var express = require('express');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/', function(req, res){
    if(req.user) {
        res.redirect('/');
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }

});

//Route for search in nav bar
router.post('/', function(req, res){

    if(req.user) {
        var term = req.body.q;

        search.searchOMDB(term, function (results) {
            //console.log(results.results[0]);
            res.render('results', results);
        })
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }

});

module.exports = router;

