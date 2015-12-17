var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var request = require('request');
var db = require('./models');
var passport = require('passport');
var strategies = require('./config/strategies');
var app = express();

//Set view engine body parser and flash for notifications
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.use(flash());

app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));

//Passport local for auth
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);
passport.use(strategies.localStrategy);

//Set alerts for auth stuff
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

//Controllers
app.use('/', require('./controllers/main'));
app.use('/auth', require('./controllers/auth'));
app.use('/userhome', require('./controllers/userhome'));
app.use('/friends', require('./controllers/friends'));
app.use('/search', require('./controllers/search'));
app.use('/expandedResult', require('./controllers/expandedResult'));
app.use('/browse', require('./controllers/browse'));
app.use('/browseExpand', require('./controllers/browseExpand'));

app.listen(3000);

var genres = {
    "genres": [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 10769,
        "name": "Foreign"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]
}