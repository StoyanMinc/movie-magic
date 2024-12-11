const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minLength: 10,
        match: /@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/
        
    },
    password: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]{6,}$/

    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.virtual('repass')
    .set(function(value){
        if(value !== this.password) {
            throw new mongoose.MongooseError('Passwords don\'t match!');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;