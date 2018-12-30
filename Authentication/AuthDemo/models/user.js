var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

mongoose.model = mongoose.model("User", UserSchema);