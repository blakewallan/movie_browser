var request = require('request');
var async = require('async');
var theMovieDb = require('./themoviedb.js');
var strike = require('strike-api');

//TODO: make node module for kat search following the kat.cr/json.php?= format

module.exports = {

    searchSingle : function(term, callback){
        request('http://www.omdbapi.com/?s=' + term + '&r=json', function (err, res, body) {
            var topResult = JSON.parse(body).Search[0];
            callback(null, topResult);
        })
    },

    searchOMDB : function(term, callback) {

        var resultsArray = [];

        async.series([
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&r=json', function (err, res, body) {
                    resultsArray.push(JSON.parse(body).Search);
                    console.log(JSON.parse(body).Search[0]);
                    callback(null, resultsArray);
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 2 +'&r=json', function (err, res, body) {
                    if (JSON.parse(body).Response) {
                        callback(null, resultsArray);
                    } else {
                        resultsArray.push(JSON.parse(body).Search);
                        callback(null, resultsArray);
                    }
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 3 +'&r=json', function (err, res, body) {
                    if (JSON.parse(body).Response) {
                        callback(null, resultsArray);
                    } else {
                        resultsArray.push(JSON.parse(body).Search);
                        callback(null, resultsArray);
                    }
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 4 +'&r=json', function (err, res, body) {
                    if (JSON.parse(body).Response) {
                        callback(null, resultsArray);
                    } else {
                        resultsArray.push(JSON.parse(body).Search);
                        callback(null, resultsArray);
                    }
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 5 +'&r=json', function (err, res, body) {
                    if (JSON.parse(body).Response) {
                        callback(null, resultsArray);
                    } else {
                        resultsArray.push(JSON.parse(body).Search);
                        callback(null, resultsArray);
                    }
                })
            },
            function(callback) {
                request('http://www.omdbapi.com/?s=' + term + '&page=' + 6 +'&r=json', function (err, res, body) {
                    if (JSON.parse(body).Response) {
                        callback(null, resultsArray);
                    } else {
                        resultsArray.push(JSON.parse(body).Search);
                        callback(null, resultsArray);
                    }
                })
            }

        ], function() {
                var flattened = resultsArray.reduce(function(a, b) {
                    return a.concat(b);
                }, []);

            callback({results : flattened});
        })
    },

    getAllInfo : function(imdbID, callback) {
        var fullResultsArray = [];
        var torrentArray = [];

        async.series([
            function (callback) {

                request('http://www.omdbapi.com/?i=' + imdbID + '&plot=full&r=json', function(err, res, body){
                    if(err) {
                        console.log(err);
                    }
                    else {
                        fullResultsArray.push(JSON.parse(body));
                        callback(null, fullResultsArray);
                    }
                })
            },
            function (callback) {
                strike.search(fullResultsArray[0].Title + ' ' + fullResultsArray[0].Year + ' &category=Movies').then(function(res){
                    torrentArray.push(res.torrents[0]);
                    callback(null, torrentArray)
                });
            }
        ], function() {
            callback({fullResults : {omdbResults: fullResultsArray, torrents : torrentArray}});

        })
    },

    browseExpand : function(term, callback) {
        var imdbInfo = [];
        var fullResultsArray = [];
        var torrentArray = [];


        async.series([
            function (callback) {

                request('http://www.omdbapi.com/?s=' + term + '&plot=full&r=json', function(err, res, body){
                    if (JSON.parse(body).Response) {
                        console.log(JSON.parse(body).Response);
                        return callback(null, null);
                    }
                    else {
                        imdbInfo.push(JSON.parse(body).Search);
                        //console.log(imdbInfo[0][0]);
                        callback(null, imdbInfo[0][0]);
                    }
                })
            },
            function (callback) {
                console.log(imdbInfo[0]);

                if (imdbInfo[0]) {
                    var imdbID = imdbInfo[0][0].imdbID;

                    request('http://www.omdbapi.com/?i=' + imdbID + '&plot=full&r=json', function(err, res, body){
                        if(err) {
                            console.log(err);
                        }
                        else {
                            fullResultsArray.push(JSON.parse(body));
                            console.log(fullResultsArray);
                            callback(null, fullResultsArray);
                        }
                    })
                } else {
                    callback(null, null);
                }
            },
            function (callback) {
                strike.search(fullResultsArray[0].Title + ' ' + fullResultsArray[0].Year + ' &category=Movies').then(function(res){
                    torrentArray.push(res.torrents[0]);
                    callback(null, torrentArray)
                });
            }

        ], function() {
            callback({fullResults : {omdbResults : fullResultsArray, torrents : torrentArray}});

        })
    },

    getTopTorrents : function(category, callback){

        request('https://kat.cr/json.php?q=category:Movies', function(err, res, body){
            var topTorrents = JSON.parse(res.body).list;
            callback({topTorrents : topTorrents});
        });

    },

    getTopTorrentTitles : function(torrentArray) {

        var titleArray = [];
        for (var i = 0; i < torrentArray.length; i ++){
            var stripped = torrentArray[i].title.replace(/[^\w\s]/gi, '').replace(/\d{4}(.*)/igm, '');
            titleArray.push(stripped);
        }
        return titleArray;
    },

    searchTheMovieDB : function(term){
        var resultsArray = [];
        theMovieDb.search.getMovie({query : term}, function(data) {
            resultsArray.push(JSON.parse(data.body).results);
            //console.log(resultsArray);
            return resultsArray;
        }, function(data){});
    }
}












