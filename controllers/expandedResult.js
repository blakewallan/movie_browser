var express = require('express');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/:id', function(req, res){
    var imdbID = req.params.id;

    search.getAllInfo(imdbID, function(fullResults){
        console.log(fullResults.fullResults.torrents);
        res.render('expandedResult', fullResults);
    });
});

module.exports = router;