const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        match: /^[\w\s]+$/
    },

    genre: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
        match: /^[a-zA-Z0-9\s]+$/

    },

    director: {
        type: String,
        required: true,
        minLength: 5,
        match: /^[a-zA-Z0-9\s]+$/

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
        minLength: 20,
        match: /^[a-zA-Z0-9\s]+$/

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