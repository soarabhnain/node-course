var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");

var Post = require('./models/post');

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});

var User = mongoose.model("User", userSchema);



var Post = mongoose.model("Post", postSchema);

// var newUser = new User({
//     email:"ajay@any.du",
//     name: "Ajay Singh"
// });

// newUser.posts.push({
//     title:"How to be a manager?",
//     content:"Just kidding i dont know how to be one"
// })

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on apples",
//     content: "They are delicious!!"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(post);
//     }
// });

User.findOne({name: "Ajay Singh"}, function(err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title:"Three things i really hate",
            content:"Sutta. Sutta. Sutta"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});