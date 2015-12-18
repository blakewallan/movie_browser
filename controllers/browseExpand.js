var express = require('express');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/:id', function(req, res){
    if(req.user) {
        var term = req.params.id;
        search.browseExpand(term, function (results) {
            fullResult = results;
            res.render('browseExpand', fullResult);
        })
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }
});

module.exports = router;