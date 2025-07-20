const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
console.log("Movie ID: ", movieId);
if (!movieId) {
    console.error("No movie ID found in URL.");
    document.getElementById("movie-details").textContent = "Movie not found.";
    throw new Error("Missing movie ID");
}
var apiKey = "6c5063636ac32748d49047cd5e906b42";
const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
fetch(movieURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const movieTitle = document.createElement("h1");
        movieTitle.textContent = data.title;
        document.getElementById("movie-details").appendChild(movieTitle);
        const movieImage = document.createElement("img");
        document.getElementById("movie-details").appendChild(movieImage);
        movieImage.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        const rating = document.createElement("p");
        rating.textContent = `Rating: ⭐${data.vote_average}.`;
        document.getElementById("movie-details").appendChild(rating);
        const movieOverview = document.createElement("p");
        movieOverview.textContent = data.overview;
        document.getElementById("movie-details").appendChild(movieOverview);
        const release = document.createElement("p");
        release.textContent = `Released: ${data.release_date}`;
        document.getElementById("movie-details").appendChild(release);
        const runTime = document.createElement("p");
        runTime.textContent = `Runtime: ${data.runtime} minutes.`;
        document.getElementById("movie-details").appendChild(runTime);
        const genreNames = data.genres.map(genre => genre.name).join(', ');
        const genres = document.createElement("p");
        genres.textContent = `Genres: ${genreNames}.`;
        document.getElementById("movie-details").appendChild(genres);
        if (data.homepage) {
            const homepageLink = document.createElement("a");
            homepageLink.href = data.homepage;
            homepageLink.textContent = "Official Website";
            homepageLink.className = "btn btn-primary me-2 mb-2";
            document.getElementById("movie-details").appendChild(homepageLink);

        }
        if (data.tagline) {
            const shortP = document.createElement("p");
            shortP.textContent = `"${data.tagline}"`;
            shortP.style.fontStyle = "italic";
            document.getElementById("movie-details").appendChild(shortP);
        }
        if(data.production_companies.length > 0) {
            const companies = document.createElement("p");
            const compNames = data.production_companies.map(company => company.name).join(", ");
            companies.textContent = `Production companies: ${compNames}.`;
            document.getElementById("movie-details").appendChild(companies);

        }
        if (data.spoken_languages.length > 0) {
            const langs = document.createElement("p");
            const langNames = data.spoken_languages.map(english => english.name).join(", ");
            langs.textContent = `Spoken languages: ${langNames}.`;
            document.getElementById("movie-details").appendChild(langs);
        }
        if (data.budget > 0) {
            const budget = document.createElement("p");
            const budgetStr = data.budget.toLocaleString();
            budget.textContent = `Budget: $${budgetStr}.`;
            document.getElementById("movie-details").appendChild(budget);
        }
        if (data.revenue > 0) {
            const rev = document.createElement("p");
            const revStr = data.revenue.toLocaleString();
            rev.textContent = `Revenue: $${revStr}.`;
            document.getElementById("movie-details").appendChild(rev);
        }
        if (data.imdb_id) {
            const imdbLink = document.createElement("a");
            imdbLink.href = `https://www.imdb.com/title/${data.imdb_id}`;
            imdbLink.target = "_blank";
            imdbLink.textContent = "view on IMDB.";
            imdbLink.className = "btn btn-secondary me-2 mb-2";
            document.getElementById("movie-details").appendChild(imdbLink);
        }
        const lineBreak = document.createElement("br");
        document.getElementById("movie-details").appendChild(lineBreak);
        const backHome = document.createElement("a");
        backHome.href = "movies.html";
        backHome.textContent = "← Back to movies.";
        backHome.className = "btn btn-outline-secondary mt-4";
        document.getElementById("movie-details").appendChild(backHome);



    })
    .catch(error => {
        console.error("Error fetching movie details:", error);
    });