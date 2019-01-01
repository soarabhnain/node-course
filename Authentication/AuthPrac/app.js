var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
User = require("./models/user"),
passportLocalMongoose = require("passport-local-mongoose");

var app = express();

mongoose.connect("mongodb://localhost/auth_prac");

app.set('view engine', 'ejs');

app.use(require("express-session")({
    secret:"I am Iron Man",
    resave:false,
    saveUninitialized:false
}));



app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/////////////////////////////////////////////////////////////////////

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//Register Routes

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });            
        }
    });
});

// Login Routes

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect:"/login"
}), function(req, res){
});


// 

app.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/");
})

function isLoggedIn(req, res, next){
if(req.isAuthenticated()){
    return next();
} else{
    res.redirect("/login");
}
}



app.listen(3000, function(){
    console.log("Server has started!!");
})