var request = require('request');
var async = require('async');
var strike = require('strike-api');

//TODO: make node module for kat search following the kat.cr/json.php?= format

module.exports = {

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

        async.series([
            function (callback) {

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
            },
            function (callback) {
                console.log(fullResultsArray[0].Type);
                if(fullResultsArray[0].Type === 'movie'){
                    strike.search(fullResultsArray[0].Title + ' ' + fullResultsArray[0].Year + ' &category=Movies').then(function(res){
                        console.log(fullResultsArray[0].Title + ' ' + fullResultsArray[0].Year + '&category=Movies');
                        torrentArray.push(res.torrents[0]);
                        callback(null, torrentArray)
                    });
                }
                else {
                    strike.search(fullResultsArray[0].Title + ' ' + fullResultsArray[0].Year).then(function (res) {
                        torrentArray.push(res.torrents[0]);
                        callback(null, torrentArray)
                    });
                }
            }
        ], function() {
            callback({fullResults : {omdbResults: fullResultsArray, torrents : torrentArray}});

        }
        )
    },

    //TODO: regex rough draft .+?(?=2015)


    getTopTorrents : function(category, callback){
        if(category === 'TV'){
            request('https://kat.cr/json.php?q=category:TV', function(err, res, body){
                console.log('****************************************************');
                var topTorrents = JSON.parse(res.body);
                callback({topTorrents : topTorrents});
            });
        }
        else {
            request('https://kat.cr/json.php?q=category:Movies', function(err, res, body){
                console.log('****************************************************');
                var topTorrents = JSON.parse(res.body);
                callback({topTorrents : topTorrents});
            });
        }
    }
}












