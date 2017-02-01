var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    comment: {type:String, required:true},
    owner: {type:Schema.Types.ObjectId, ref:'User'},
    ownername: {type:String},
    gotten: {type:Boolean}
});

mongoose.model('Item', ItemSchema);