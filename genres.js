var apiKey = "6c5063636ac32748d49047cd5e906b42";
const genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
fetch(genreURL) 
    .then(response => response.json())
    .then(data => {
        console.log(data.genres);
        const menu = document.getElementById("dropdown-menu");
        if (!menu) {
            console.warn("Dropdown menu not found.");
            return;
        }
        data.genres.forEach(genre => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.className = "dropdown-item";
            link.href = "#";
            link.textContent = genre.name;
            link.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = `movies.html?genre=${genre.id}`;
            });
            li.appendChild(link);
            menu.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error loading movie genres", error);
    });