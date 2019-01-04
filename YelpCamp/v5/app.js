var express = require('express'),
passport = require('passport'),
LocalStrategy = require('passport-local'),
passportLocalMongoose = require('passport-local-mongoose');
var app = express();

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



seedDB();

app.get("/", function(req, res){
    res.render('landing');
})

app.get("/campgrounds", function(req, res){
    //res.render("campgrounds", {campgrounds: campgrounds});

    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })

});

app.get("/campgrounds/new", function(req, res){
    res.render('campgrounds/new');
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description: desc};
    Campground.create(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", function(req, res){

    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//=========================Comments Routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
    
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, addedComment){
                if(err){
                    console.log(err);
                } else{
                    foundCampground.comments.push(addedComment);
                    foundCampground.save();
                    res.redirect('/campgrounds/'+ foundCampground._id);
                }
            })
        }
    });
});


// ======================================

//Auth Routes

app.get("/register", function(req, res){
    res.render("register");
});


app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});


app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect:"/campgrounds",
    failureRedirect: "/login"
}), function(req, res){

});


//Logout Route

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login");
    }
}

app.listen(3000, function(){
    console.log("Server has started");
});