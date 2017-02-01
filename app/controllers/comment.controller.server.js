var mongoose = require('mongoose'),
    User = mongoose.model("User"),
    Events = mongoose.model("Event"),
    Items = mongoose.model("Item");

exports.GetComments = function(req, res, next)
{
    Events.findOne({_id: req.params.eventId}).populate('members').populate('items').populate('owner').exec(function(err, found) {
        console.log("FOUND: " + found);
        if (found)
        {
            res.json({
                data:found
            })
        }
        else
        {
            res.json({
                data:"NOTHING"
            })
        }
    });
}

exports.Create = function(req, res, next)
{
    var item = new Items();
    item.owner = req.body.OwnerId;
    item.ownername = req.body.OwnerName;
    item.comment = req.body.Comment;

    item.save(function(err, itemSave) {

        Events.findOne({_id: req.body.EventId}).populate('items').exec( function(err, found) {
        if (err)
        {
            res.status(400);
            res.json({
                status:"Error",
                message:"System Error",
                data:err
            });
        }

        if (found != null)
        {
            found.items.push(item);
            found.save(function(err, data2)
            {
                console.log(data2);
                if (err)
                {
                    res.status(400);
                    res.json({
                        status:"Error",
                        message:"System Error",
                        data:err
                    });
                }

                if (data2)
                {
                    res.status(200);
                    res.json({
                        status:"Error",
                        message:"Comment Added",
                        data:data2
                    });
                }
            });
        }
    })});
}