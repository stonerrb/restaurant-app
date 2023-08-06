const mongoose = require('mongoose');

const restaurant_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
    },
    pictures:[{
        type: String,
        required: false,
        unique: true
    }],
    cuisines:[{
        food_item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'food_item'
            
        },
        price: {
            type: Number,
            required: true,
        },
        avaibility: { 
            type: Boolean,
        }
    }],
});

module.exports = mongoose.model('restaurant', restaurant_Schema);