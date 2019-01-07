
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", isLoggedIn, function(req, res){
    //res.render("campgrounds", {campgrounds: campgrounds});

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })

});

router.get("/new", isLoggedIn, function(req, res){
    res.render('campgrounds/new');
})

router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, image:image, description: desc, author: author};
    //console.log(req.user);

    Campground.create(newCampground);
    res.redirect("/campgrounds");
});

router.get("/:id", function(req, res){

    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//Edit Route

router.get("/:id/edit", checkCampgroundOwnership, function(req, res){

        Campground.findById(req.params.id, function(err, foundCampground){
                    res.render("campgrounds/edit", {campground:foundCampground});
            });
    })
//Update campground

router.put("/:id", checkCampgroundOwnership,  function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

//Delete Campground

router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Deleted the campground");
            res.redirect("/campgrounds");
        }
    });
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login");
    }
}

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){

        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
            } else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
                
            }
        })
        
    } else {
        res.redirect("back");
    }
}

module.exports = router;