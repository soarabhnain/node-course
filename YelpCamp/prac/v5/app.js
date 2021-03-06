var express = require('express'),
passport = require('passport'),
LocalStrategy = require('passport-local'),
passportLocalMongoose = require('passport-local-mongoose');
var app = express();

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

//var commentRoutes = require("./routes/comments");

var mongoose = require('mongoose');

var User = require('./models/user');

mongoose.connect("mongodb://localhost/yelp_camp");

var Campground = require('./models/campground');

var Comment = require('./models/comment');



var bodyParser = require('body-parser');



var seedDB = require('./seeds');



app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
    secret:"I am in office",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});



app.set('view engine', 'ejs');

// seedDB();

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function(){
    console.log("Server has started");
});