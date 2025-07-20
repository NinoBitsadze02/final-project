var apiKey = "6c5063636ac32748d49047cd5e906b42";
const params = new URLSearchParams(window.location.search);
const genreId = params.get("genre");
console.log("Genre ID:", genreId);
const searchTerm = params.get("search");
console.log(searchTerm);
const page = parseInt(params.get("page")) || 1;
let apiURL;
if (searchTerm) {
    apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${page}`;   
} else if (genreId) {
    apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;
} else {
    apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
}
console.log("using API URL:", apiURL);
fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);
        console.log("Results:", data.results);
        console.log("Number of results:", data.results.length);
        if (!data.results || data.results.length === 0) {
            const msg = document.createElement("p");
            msg.textContent = "No movies found for this genre";
            document.getElementById("movie-grid").appendChild(msg);
            return;
        }
        data.results.forEach(movie => {
            console.log(movie);
            console.log(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
            const cardWrapper = document.createElement("div");
            cardWrapper.className = "col-md-2";
            document.getElementById("movie-grid").appendChild(cardWrapper);
            cardWrapper.addEventListener ("click", () => {
                window.location.href = `movie.html?id=${movie.id}`;
            });
            const img = document.createElement("img");
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.className = "card-img-top";
            const imgWrapper = document.createElement("div");
            imgWrapper.className = "position-relative";
            imgWrapper.appendChild(img);
            const overlay = document.createElement("div");
            overlay.className = "position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75 text-white";
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.3s";
            const overlayTitle = document.createElement("h5");
            overlayTitle.textContent = movie.title;
            const overlayRating = document.createElement("p");
            overlayRating.textContent = `⭐${movie.vote_average}`;
            overlay.appendChild(overlayTitle);
            overlay.appendChild(overlayRating);
            imgWrapper.appendChild(overlay);
            imgWrapper.addEventListener("mouseenter", () => {
                overlay.style.opacity = "1";
            });
            imgWrapper.addEventListener("mouseleave", () => {
                overlay.style.opacity = "0";
            });
            const h5 = document.createElement("h5");
            h5.textContent = movie.title;
            h5.className = "card-title";
            const vote = document.createElement("p");
            vote.textContent = `⭐${movie.vote_average}`;
            const card = document.createElement("div");
            card.className = "card";
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            cardBody.appendChild(h5);
            cardBody.appendChild(vote);
            card.appendChild(imgWrapper);
            card.appendChild(cardBody);
            cardWrapper.appendChild(card);
            card.addEventListener("click", () => {
  let recent = JSON.parse(sessionStorage.getItem("recentMovies")) || [];
  recent.unshift(movie.id);
  recent = [...new Set(recent)];
  recent = recent.slice(0, 3);
  sessionStorage.setItem("recentMovies", JSON.stringify(recent));
  window.location.href = `movie.html?id=${movie.id}`;
});
        })
        document.getElementById("prevPage").addEventListener("click", () => {
            if(page > 1) {
                updatePage(page - 1);
            }
        });
        document.getElementById("nextPage").addEventListener("click", () => {
            updatePage(page + 1);
        });
        function updatePage(newPage) {
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("page", newPage);
            window.location.search = newParams.toString();
        }
        console.log(data.results);
    })
    .catch(error => {
        console.error("Error fetching movies:", error);
    })