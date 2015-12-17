var express = require('express');
var search = require('../helpers/searchResults');
var router = express.Router();

router.get('/:id', function(req, res){
    var term = req.params.id;
    search.browseExpand(term, function (results) {
        fullResult = results.fullResults[0];
        res.render('browseExpand', fullResult);
    })
});

module.exports = router;