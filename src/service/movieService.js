const Movie = require('../models/Movie');


exports.createMovie = (movieData) => {
    return Movie.create(movieData);
};

exports.getAllMovies = () => {
    const movies = Movie.find();
    return movies;
};

exports.getMovieById = (id) => {
    const movie = Movie.findById(id).populate('casts');
    return movie;
};

exports.searchMovies = (title, genre, year) => {

    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }

    if (genre) {
        query.genre = genre.toLowerCase();
    }

    if (year) {
        query.year = year
    }

    return Movie.find(query);
};

exports.attach = (movieId, castId) => {
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};


exports.editMovie = (movieId, movieData) => {
    return Movie.findByIdAndUpdate(movieId, movieData);
};

exports.deleteMovie = (movieId) => {
    return Movie.findByIdAndDelete(movieId);
}