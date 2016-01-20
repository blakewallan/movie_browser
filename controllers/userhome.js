var express = require('express');
var search = require('../helpers/searchResults');
var db = require('./../models');
var router = express.Router();


router.get('/', function(req, res){
    var userFavorites = [];
    var imdbidArray = [];


    if(req.user) {
        db.favorite.count().then(function (count) {
            console.log(count);
            //TODO: count should be > 1, have to fix my find similar function to not have a 3 movie hardcoded limit
            //TODO: count returns all users favorites so this doesnt even fucking work
            if(count > 3) {
                db.favorite.findAll({
                    where : {
                        username : req.user.username
                    },
                    order: 'title ASC'
                }).then(function(favorites) {
                    userFavorites.push(favorites);
                }).then(function(){
                    userFavorites = userFavorites[0].slice(0, 3);
                    imdbidArray.push(userFavorites[0].dataValues.imdbid);
                    imdbidArray.push(userFavorites[1].dataValues.imdbid);
                    imdbidArray.push(userFavorites[2].dataValues.imdbid);
                }).then(function(){
                    search.getSimilar(imdbidArray, function(userSuggestions){
                        res.render('userhome', {userSuggestions : userSuggestions});
                    });
                });
            }

            else {
                req.flash('danger', 'Add at least 3 favorites to view suggestions');
                res.redirect('/');
            }
        });

    }
    else {
        req.flash('danger', 'Please log in or sign up');
        res.redirect('/');
    }
});

module.exports = router;