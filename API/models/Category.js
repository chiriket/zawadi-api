const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    }
});

module.exports = mongoose.model('Category', CategorySchema, "category");