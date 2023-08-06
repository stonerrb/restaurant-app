const mongoose = require('mongoose')

const food_item_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    Type: { //main-course, etc..
        type: String,
        required: true,
        trim: true
    },
    pic: [{
        type: String,
        required: false,
        trim: true,
        default: null
    }],
    ingredient: [{
        type:String,
        required: false,
        trim: true,
        default: null
    }]
});

module.exports = mongoose.model('food_item', food_item_Schema);