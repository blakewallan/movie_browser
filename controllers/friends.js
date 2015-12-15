var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    if(req.user) {
        res.render('friends');
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }
});

module.exports = router;