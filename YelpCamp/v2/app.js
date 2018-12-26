var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");



var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//Schema Setup

var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({name:'Khardung La', image:"https://static.toiimg.com/thumb/51137677/167052835.jpg?width=748&height=499", description:"Highest pass in the world"},
//  function(err, campground){
//      if(err){
//          console.log(err);
//      } else{
//          console.log("Newly created campground");
//          console.log(campground);
//      }
//  });


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

    Campground.findById(req.params.id, function(err, foundCampground){
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