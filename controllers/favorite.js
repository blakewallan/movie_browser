var express = require('express');
var db = require('./../models');
var router = express.Router();

router.post('/', function(req, res) {

    if(req.user) {
        db.favorite.findOrCreate({
            where: {
                imdbid: req.body.imdbid
            },
            defaults: {
                year: req.body.year,
                title: req.body.title,
                imagelink : req.body.imagelink,
                username : req.user.username
            }
        }).spread(function(favorite, created) {
            console.log(favorite.get());
            res.redirect('favorite');
        });
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }

});

router.get('/', function(req, res) {

    if(req.user) {
        db.favorite.findAll({
            where : {
                username : req.user.username
            },
            order: 'title ASC'
        }).then(function(favorites) {
            res.render('favorites', {favorites: favorites});
        });
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }


});

router.get('/:imdbID', function(req, res) {

    if(req.user) {
        db.favorite.destroy({
            where: {
                imdbid: req.params.imdbID
            }
        }).then(function() {
            res.redirect(req.get('referer'));
        }).catch(function(e) {
            res.send({'msg': 'error', 'error': e});
        });
    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }
});


module.exports = router;