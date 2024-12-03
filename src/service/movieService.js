const Movie = require('../models/Movie');


exports.createMovie = (movieData) => {
    return Movie.create(movieData);
};

exports.getAllMovies = () => {
    const movies = Movie.find();
    return movies;
};

exports.getMovieById = (id) => {
    const movie = Movie.findById(id);
    return movie;
};

exports.searchMovies = async (title, genre, year) => {

    let result = await Movie.find().lean();
    
    if (title) {
        result = result.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (genre) {
        result = result.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
    }

    if (year) {
        result = result.filter(m => m.year == year);
    }

    return result;
};