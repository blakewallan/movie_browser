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

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);

passport.use(strategies.localStrategy);

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.use('/', require('./controllers/main'));
app.use('/auth', require('./controllers/auth'));
app.use('/userhome', require('./controllers/userhome'));
app.use('/friends', require('./controllers/friends'));
app.use('/search', require('./controllers/search'));
app.use('/expandedResult', require('./controllers/expandedResult'));

app.listen(3000);