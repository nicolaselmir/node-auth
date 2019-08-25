const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ItemSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }
    
});

ItemSchema.plugin(mongoosePaginate);

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item