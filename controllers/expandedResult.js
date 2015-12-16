var express = require('express');
var searchThing = require('../helpers/searchResults');
var router = express.Router();

router.get('/:id', function(req, res){
    var imdbID = req.params.id;
    var omdbResult = [];

    searchThing.getFullInfo(imdbID, function (result) {
        console.log(result);

        if(req.user) {
            res.render('expandedResult', result);
        }
        else {
            req.flash('danger', 'Please log in or sign up');
            res.redirect('/');
        }
    })


});

module.exports = router;