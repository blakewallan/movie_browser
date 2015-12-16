var request = require('request');
var async = require('async');

module.exports = {

    searchOMDB : function(term, callback) {
        var resultsObj;

        var resultsArray = [];
        var otherarray = [];

        async.series([
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&r=json', function (err, res, body) {
                    resultsArray.push(JSON.parse(body).Search);
                    callback(null, resultsArray);
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 2 +'&r=json', function (err, res, body) {
                    resultsArray.push(JSON.parse(body).Search);
                    callback(null, resultsArray);
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 3 +'&r=json', function (err, res, body) {
                    resultsArray.push(JSON.parse(body).Search);
                    callback(null, resultsArray);
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 4 +'&r=json', function (err, res, body) {
                    resultsArray.push(JSON.parse(body).Search);
                    callback(null, resultsArray);
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 5 +'&r=json', function (err, res, body) {
                    resultsArray.push(JSON.parse(body).Search);
                    callback(null, resultsArray);
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 6 +'&r=json', function (err, res, body) {
                    resultsArray.push(JSON.parse(body).Search);
                    callback(null, resultsArray);
                })
            }

        ], function() {
                var flattened = resultsArray.reduce(function(a, b) {
                    return a.concat(b);
                }, []);

            callback({results : flattened});
        })
    },

    getFullInfo : function(imdbID, callback) {
        var fullResultsObj;

        request('http://www.omdbapi.com/?i=' + imdbID + '&plot=full&r=json', function(err, res, body){
            if(err) {
                console.log(err);
            }
            else {
                fullResultsObj = JSON.parse(body);
                console.log(fullResultsObj);
                callback({fullResult: fullResultsObj});
            }
        });
    },

    getTorrents : function(){

    }
}