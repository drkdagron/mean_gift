var restify = require('restify');
var server = restify.createServer();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/mygiftapp');
require('./app/models/user.model.server.js');

server.use(restify.fullResponse()).use(restify.bodyParser());

var userCtrl = require('./app/controllers/user.controller.server.js');

server.post("/account/create", userCtrl.create);
server.post("/account/login", userCtrl.login);

var port = process.env.PORT || 3000;
server.listen(port, function(err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port);
});