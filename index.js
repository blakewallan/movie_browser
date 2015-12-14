var express = require('express');
var db = require('./models');
var session = require('express-session');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());

app.get('/', function(req, res){
    res.render('index');
});


app.listen(process.env.PORT || 3000)