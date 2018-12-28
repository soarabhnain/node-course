var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");

var Campground = require('./models/campground');



var bodyParser = require('body-parser');

var seedDB = require('./seeds');



app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');



seedDB();

app.get("/", function(req, res){
    res.render('landing');
})

app.get("/campgrounds", function(req, res){
    //res.render("campgrounds", {campgrounds: campgrounds});
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    })

});

app.get("/campgrounds/new", function(req, res){
    res.render('new');
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
            res.render("show", {campground: foundCampground});
        }
    });
    
});

app.listen(3000, function(){
    console.log("Server has started");
});