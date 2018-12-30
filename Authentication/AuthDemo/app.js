var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});



app.listen(3000, function(){
    console.log('Server has started!!');
});