const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user_rating_id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    ratings: {
        type: [Number],
        required: true,
        validate: arr => Array.isArray(arr) && arr.length > 0
    },
    average: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Review', reviewSchema);