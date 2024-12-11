const mongoose = require('mongoose');

const castSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [5,'The name must be at least 5 characters long'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Invalid name']

    },

    age: {
        type: Number,
        required: true,
        min: [1, 'Age must be between 1 and 120 years'],
        max: [120, 'Age must be between 1 and 120 years']
    },

    born: {
        type: String,
        required: true,
        minLength: [10, 'Born must be at least 10 characters'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Invalid born'],

    },

    nameInMovie: {
        type: String,
        required: true
    },

    castImage: {
        type: String,
        required: true,
        mactch: /^https?:\/\//
    },


});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;