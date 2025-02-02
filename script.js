
//API from omdbapi.com-usage-send all data requests (enter s at the end of the api, which stands for SEARCH)
//http://www.omdbapi.com/?apikey=eeb0f580&s=mummy

    //Waiting for the Page to Load
document.addEventListener("DOMContentLoaded", () => {

    //Getting References to HTML Elements
    const movieForm = document.getElementById("movieForm");
    const movieResults = document.getElementById("movieResults");

        //Listening for form submission
    movieForm.addEventListener("submit", (e) => {
        const movieName = document.getElementById("movieInput").value;

        //prevent browser default reloading
        e.preventDefault();
        searchMovies(movieName);
    });

        //search for movies
    async function searchMovies(movieName) {
        try {
            //loading
            movieResults.innerHTML = '<div class="loading">Searching movies...</div>';
            const response = await fetch(`https://www.omdbapi.com/?apikey=eeb0f580&s=${movieName}`);
            const data = await response.json(); // json parsing
            
            if (data.Response === "False") { //response check
                throw new Error("This movie was not found");
            }
            displayMovies(data.Search);
        } catch (error) {
            movieResults.innerHTML = `<div class="error-message">${error.message}</div>`;
        }
    }

         //display all the movie
    function displayMovies(movies) {
        movieResults.innerHTML = `
            <div class="movies-grid">
                ${movies.map(movie => `
                    <div class="movie-card">
                        <img
                            src="${movie.Poster}"
                            alt="${movie.Title}"
                            class="movie-poster"
                        />
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.Title}</h3>
                            <p class="movie-year">${movie.Year}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
});
