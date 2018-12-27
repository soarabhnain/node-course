var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2");



var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Post
    }]
});

var User = mongoose.model("User", userSchema);





// User.create({
//     email:"bob@gmail.com",
//     name:"Bob the builder"
// });

// Post.create({
//     title:"How to cook a burger Pt.2",
//     content: "blah blah blah blah"
// }, function(err, post){
//     console.log(post);
// });