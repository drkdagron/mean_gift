var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Events = mongoose.model('Event');

exports.create = function(req, res, next) {

    console.log(req.body.username);

    var user = new User(req.body);

    console.log("USER COMING IN: " + user);
    User.find({username:user.username}).exec(function(err, data) {
        if (err)
        {
            res.status(400);
            res.json({
                        status:"Error",
                        message:"System Error",
                        data:err
                    });
        }
        else if (data.length == 0)
        {
            console.log("NO USER");
            user.save(function(err, saved) {
                if (err)
                {
                    res.status(400);
                    res.json({
                        status:"Error",
                        message:"System Error",
                        data:err
                    });
                }
                else
                {
                    console.log("SAVING");
                    res.json(
                        {
                            status:"Success",
                            message:"Account created",
                            data:saved 
                        });
                }
            });
        }
        else
        {
            res.status(400);
            res.json({
                status:"Error",
                message:"Username already exists",
                data: null
            })
        }
    });
};

exports.login = function(req, res, next)
{
    var user = new User(req.body);
    User.find({username:user.username, password:user.password}).exec(function (err, data) {
        if (err)
        {
            res.status(400);
            res.json({
                        status:"Error",
                        message:"System Error",
                        data:err
                    });
        }
        else if (data.length > 0)
        {
            Events.find({members: data[0]._id}, function(err, foundEvents) {
                res.json({
                status:"Success",
                message:"Successful login",
                data: data,
                events: foundEvents
                });
                
            });
            
        }
        else 
        {
            res.status(400);
            res.json({
                        status:"Error",
                        message:"Unable to login",
                        data:err
                    });
        }

    });
};
