var restify = require('restify');
var server = restify.createServer();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://' + 'user' + ':' + 'd3fau1t_us3r' + '@ds139619.mlab.com:39619/gifttrackandroid');
require('./app/models/comment.model.server.js');
require('./app/models/event.model.server.js');
require('./app/models/user.model.server.js');


server.use(restify.fullResponse()).use(restify.bodyParser());

var userCtrl = require('./app/controllers/user.controller.server.js');
var evtCtrl = require( './app/controllers/event.controller.server.js');
var comCtrl = require('./app/controllers/comment.controller.server.js');

server.post("/account/create", userCtrl.create);
server.post("/account/login", userCtrl.login);

server.post("/event/create", evtCtrl.create);
server.post("/event/join", evtCtrl.join);
server.post("/event/view", evtCtrl.view);
server.post("/event/get", evtCtrl.getEvents);
server.post("/event/delete", evtCtrl.delete);

server.get("/event/comment/get/:eventId", comCtrl.GetComments);
server.post("/event/comment/create", comCtrl.Create);

var port = process.env.PORT || 3000;
server.listen(port, function(err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port);
});