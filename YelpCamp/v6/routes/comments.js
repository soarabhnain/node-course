var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
    
});

router.post("/", isLoggedIn, function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login");
    }
}

module.exports = router;