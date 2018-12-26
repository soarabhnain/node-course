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
    image:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({name:'Pangong Lake', image:"https://res.cloudinary.com/dxqin8fbx/image/fetch/f_auto,q_auto:eco/http://d2847ql9t214mi.cloudfront.net/wp-content/uploads/2016/10/Pangong-Tso-14.jpg"},
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
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    })

});

app.get("/campgrounds/new", function(req, res){
    res.render('new');
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    Campground.create(newCampground);
    res.redirect("/campgrounds");
})

app.listen(3000, function(){
    console.log("Server has started");
});