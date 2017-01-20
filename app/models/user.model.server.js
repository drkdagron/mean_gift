var mongoose = require('mongoose'),
    Events = require('./event.model.server.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    fullname: String
});

mongoose.model("User", UserSchema);