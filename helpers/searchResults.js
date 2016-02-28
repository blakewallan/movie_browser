var request = require('request');
var async = require('async');
var moviedb = require('moviedb')('36d4951c7e63c2fae40cb79cbd457168');
var strike = require('strike-api');
var kat = require("kat-api-json");

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
        var onNetflix;

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
                request('https://kat.cr/json.php?q='+ fullResultsArray[0].Title + ' ' + fullResultsArray[0].Year +'&category=Movies', function(err, res, body){
                    if (err){
                        console.log(err);
                    }
                    else {
                        torrentArray = JSON.parse(body).list;
                        //console.log(torrentArray);
                        callback(null, torrentArray);
                    }
                })
            },

            function(callback) {

                if(fullResultsArray.length > 0) {
                    request('http://netflixroulette.net/api/api.php?title=' + fullResultsArray[0].Title, function (err, res, body) {
                        if(JSON.parse(body).errorcode === 404){
                            onNetflix = false;
                            callback(null, onNetflix);
                        }
                        else {
                            onNetflix = JSON.parse(body);
                            callback(null, onNetflix);
                        }
                    });
                }
                else {
                    callback(null,null);
                }
            }

        ], function() {
            callback({fullResults : {omdbResults: fullResultsArray, torrents : torrentArray, onNetflix : onNetflix}});

        })
    },

    browseExpand : function(term, callback) {
        var imdbInfo = [];
        var fullResultsArray = [];
        var torrentArray = [];
        var onNetflix;


        async.series([
            function (callback) {

                request('http://www.omdbapi.com/?s=' + term + '&plot=full&r=json', function(err, res, body){

                    if (!JSON.parse(body).Response) {
                        return callback(null, null);
                    }
                    else {
                        imdbInfo.push(JSON.parse(body).Search);
                        callback(null, imdbInfo[0][0]);
                    }
                })
            },
            function (callback) {

                if (imdbInfo.length > 0) {
                    var imdbID = imdbInfo[0][0].imdbID;

                    request('http://www.omdbapi.com/?i=' + imdbID + '&plot=full&r=json', function(err, res, body){
                        if(err) {
                            console.log(err);
                        }
                        else {
                            fullResultsArray.push(JSON.parse(body));
                            callback(null, fullResultsArray);
                        }
                    });
                }
                else {
                    callback(null, null);
                }
            },
            function (callback) {
                if(imdbInfo.length > 0) {

                    request('https://kat.cr/json.php?q='+ fullResultsArray[0].Title + ' ' + fullResultsArray[0].Year +'&category=Movies', function(err, res, body){
                        if (err){
                            console.log(err);
                        }
                        else {
                            torrentArray = JSON.parse(body).list;
                            //console.log(torrentArray);
                            callback(null, torrentArray);
                        }
                    })
                }
                else {
                    callback(null, null);
                }
            },

            function(callback) {

                if(imdbInfo.length > 0) {
                    request('http://netflixroulette.net/api/api.php?title=' + fullResultsArray[0].Title, function (err, res, body) {
                        if(JSON.parse(body).errorcode === 404){
                            onNetflix = false;
                            callback(null, onNetflix);
                        }
                        else {
                            onNetflix = JSON.parse(body);
                            callback(null, onNetflix);
                        }
                    });
                }
                else {
                    callback(null,null);
                }
            }

        ], function() {
            callback({fullResults : {omdbResults : fullResultsArray, torrents : torrentArray, onNetflix : onNetflix}});

        })
    },

    getTopTorrents : function(category, callback){

        kat.mostPopular({
            category: "Movies",
            order: "seeders",
            page: 1
        },function(err,data){
            if ( err ) {
                throw err;
            }
            callback({topTorrents : data.list});
            console.log(data.list);

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

    getSimilar : function(imdbid, callback){

        var suggestions = [];

        async.series([

            function (callback) {
                request('http://api.themoviedb.org/3/movie/' + imdbid[0] + '/similar?api_key=36d4951c7e63c2fae40cb79cbd457168', function(err, res, body){
                    var similar = JSON.parse(res.body);
                    suggestions.push(similar);
                    callback(null, suggestions);
                });
            },

            function (callback) {
                request('http://api.themoviedb.org/3/movie/' + imdbid[1] + '/similar?api_key=36d4951c7e63c2fae40cb79cbd457168', function(err, res, body){
                    var similar = JSON.parse(res.body);
                    suggestions.push(similar);
                    callback(null, suggestions);
                });
            },

            function (callback) {
                request('http://api.themoviedb.org/3/movie/' + imdbid[2] + '/similar?api_key=36d4951c7e63c2fae40cb79cbd457168', function(err, res, body){
                    var similar = JSON.parse(res.body);
                    suggestions.push(similar);
                    callback(null, suggestions);
                });
            }

        ], function() {
            callback({suggestions : suggestions});

        })
    },

}












