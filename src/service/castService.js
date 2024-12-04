const Cast = require('../models/Cast');

exports.createCast = (castData) => {
    return Cast.create(castData);
};

exports.getCasts = () => {
    return Cast.find();
};

exports.getCastById = (id) => {
    return Cast.findById(id);
}