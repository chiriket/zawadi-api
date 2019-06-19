const mongoose = require('mongoose');
// var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    restName: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }]
});

module.exports = mongoose.model('Item', ItemSchema, "item");