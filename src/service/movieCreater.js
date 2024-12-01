const movies = [
    {
        title: "The Jungle Book",
        genre: "Adventure",
        director: "Jon Favreau",
        year: "2010",
        imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbemAL4d72jYUTlCU80Dg8I5xbldepOtA8nDW4gAiNfXWL100go0C1qIrCQrwoqkS5LQIyqJdzE7-I3-Rje-3ROAf4qgVvi7AhQrDIakI",
        rating: 7.6,
        description: "After a threat from the tiger Shere Khan forces him to flee the jungle, a man-cub named Mowgli embarks on a journey of self discovery with the help of panther Bagheera and free-spirited bear Baloo."
    }
];

exports.createMovie = (movieData) => {
    movies.push(movieData);
};

exports.getAllMovies = () => {
    return movies.slice();
}