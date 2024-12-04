const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true,
        lowercase: true
    },

    director: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },

    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2030
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    description: {
        type: String,
        required: true,
        maxLength: 1000
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;