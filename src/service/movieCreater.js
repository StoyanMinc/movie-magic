const Movie = require('../modules/Movie');

const movies = Movie.find();

exports.createMovie = (movieData) => {
    return Movie.create(movieData);
};

exports.getAllMovies = () => {
    console.log(movies);
    return movies;
};

exports.getMovieById = (id) => {
    const movie = movies.find(m => m._id == id);
    return movie;
};

exports.searchMovies = (title, genre, year) => {

    let result = movies.slice();

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