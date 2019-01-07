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
                    //add username and id to comment
                    addedComment.author.id = req.user._id;
                    addedComment.author.username = req.user.username;
                    //save comment
                    addedComment.save();
                    foundCampground.comments.push(addedComment);
                    foundCampground.save();
                    res.redirect('/campgrounds/'+ foundCampground._id);
                }
            })
        }
    });
});

//Comment Edit
router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
        } else{
            res.render('comments/edit', {campground_id:req.params.id, comment:foundComment});
        }
    });
    
});

//Comment Update

router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//Comment Delete

router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Comment Deleted");
            res.redirect("/campgrounds/"+ req.params.id);
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