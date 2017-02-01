var mongoose = require('mongoose'),
    User = mongoose.model("User"),
    Events = mongoose.model("Event");

exports.create = function(req, res, next)
{
    console.log("Create Event");
    var event = new Events();
    event.name = req.body.name;
    event.pin = req.body.pin;
    event.owner = req.body.owner;
    event.members.push(req.body.owner);
    event.ID = getID();

    console.log("EVENT AFTER: " + event);

    Events.findOne({name: event.name, pin: event.pin}, function(err, data) {
        console.log(data);
        if (err)
        {
            res.status(400);
            res.json({
                        status:"Error",
                        message:"System Error",
                        data:err
                    });
        }
        if (data == null)
        {
            event.save(function (err, save)
            {
                if (err)
                {
                    res.status(400);
                    res.json({
                                status:"Error", 
                                message:"System Error",
                                data:err
                            });
                }
                if (save)
                {
                   res.status(200);
                   res.json({
                       status:"Success",
                       message:"Event created",
                       data: save
                   })
                }
                else
                {
                    res.status(400);
                    res.json({
                                status:"Error",
                                message:"Unable to save event",
                                data:null
                            });
                }
            })
        }
        else
        {
            res.status(400);
            res.json({
                        status:"Error",
                        message:"Event name/pin combo already exists",
                        data:null
                    });
        }
    });
    
    
    
}

exports.join = function(req, res, next)
{
    Events.findOne({ID: req.body.code, pin: req.body.pin}, function(err, found) {
        console.log(found);
        if (err)
        {
            res.status(400);
            res.json({
                status:"Error",
                message:"System Error",
                data:err
            })
        }
        if (found)
        {
                found.members.push(req.body.user);
                found.save(function (err, newUser)
                {
                    res.status(200);
                    res.json({
                        status:"Success",
                        message:"Event joined",
                        data:newUser
                    })
                });
        }
    });
}

exports.view = function(req, res, next)
{
    console.log("viewing event");
    Events.findOne({_id: req.body.id}).populate('owner').populate('items').exec( function(err, event)
    {
        if (err)
        {
            res.status(400);
            res.json({
                status:"Error",
                message:"System Error",
                data:err
            })
        }

        if (event)
        {
            res.status(200);
            res.json({
                status:"Success",
                message:"Event loaded",
                data:event
            })
        }
    });
}

exports.getEvents = function(req, res, next)
{
    Events.find({members: req.body.userID}, function(err, data) {
        if (err)
        {
            res.status(400);
            res.json({
                status:"Error",
                message:"System Error",
                data: err
            })
        }

        res.status(200);
        res.json({
            status:"Success",
            message:"Updated Event List",
            data:data
        })

    });
}

exports.delete = function(req, res, next)
{
    console.log("beginning delete");

    Events.findOneAndRemove({_id: req.body._id}).exec( function(err, data) {
        console.log(data);
        if (err)
        {
            res.status(400);
            res.json({
                status:"Error",
                message:"System Error",
                data:data
            })
        }
        if (data)
        {
            console.log("responding");
            res.status(200);
            res.json({
                status:"Success",
                message:"Event deleted",
                data:null
            });
        }
    });
}

function getID()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}