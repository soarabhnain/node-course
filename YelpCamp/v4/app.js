var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");

var Campground = require('./models/campground');

var Comment = require('./models/comment');



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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
    
});

app.post("/campgrounds/:id/comments", function(req, res){
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
})

app.listen(3000, function(){
    console.log("Server has started");
});