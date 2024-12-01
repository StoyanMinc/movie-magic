const movies = [
    {
        title: "The Jungle Book",
        genre: "Adventure",
        director: "Jon Favreau",
        year: "2010",
        imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbemAL4d72jYUTlCU80Dg8I5xbldepOtA8nDW4gAiNfXWL100go0C1qIrCQrwoqkS5LQIyqJdzE7-I3-Rje-3ROAf4qgVvi7AhQrDIakI",
        rating: 4,
        description: "After a threat from the tiger Shere Khan forces him to flee the jungle, a man-cub named Mowgli embarks on a journey of self discovery with the help of panther Bagheera and free-spirited bear Baloo.",
        _id: 1
    }
];

exports.createMovie = (movieData) => {
    movies.push(movieData);
};

exports.getAllMovies = () => {
    return movies.slice();
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