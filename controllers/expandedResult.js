var express = require('express');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/:id', function(req, res){
    if(req.user) {
        var imdbID = req.params.id;

        search.getAllInfo(imdbID, function(fullResults){
            res.render('expandedResult', fullResults);
        });
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }
});

module.exports = router;