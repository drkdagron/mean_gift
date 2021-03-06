var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: String,
    ID: String,
    pin: String,
    owner: {type:Schema.Types.ObjectId, ref:'User'},
    items: [{type:Schema.Types.ObjectId, ref:'Item'}],
    members: [{type:Schema.Types.ObjectId, ref:'User'}]
});

mongoose.model("Event", EventSchema);