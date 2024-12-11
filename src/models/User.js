const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minLength: [10, 'Email is too short!'],
        match: [/@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/, 'Invalid email']

    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters'],
        match: [/^[a-zA-Z0-9]$/, 'Invalid password'],

    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.virtual('repass')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Passwords don\'t match!');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;