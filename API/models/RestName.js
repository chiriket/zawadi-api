const mongoose = require('mongoose');

const RestNameSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RestName', RestNameSchema, "retsName");