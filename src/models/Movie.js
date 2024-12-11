const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]{5,}$/
    },

    genre: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[a-zA-Z0-9\s]{5,}$/

    },

    director: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]{5,}$/

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
        max: 2024
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
        match: /^[a-zA-Z0-9\s]{20,}$/

    },

    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'

    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;