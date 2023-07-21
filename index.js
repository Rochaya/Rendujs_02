let allMovieData = [];
const apiKey = "e9f4e05c";

const searchMovies = movieName => {
    const apiUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
            const listElement = document.getElementById("movieList");
            listElement.innerHTML = "";
            allMovieData = data.Search;
                allMovieData.forEach(({ Poster, Title, Year, Plot }) => {
                    showAllMovie(listElement, Poster, Title, Year, Plot);
                });
            } 
            else {
            console.log("Aucune data de film trouvé.");
            }
        })
        .catch(error => {
            console.log(error);
        });
};
  
const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const movieName = formData.get("movieName");

    searchMovies(movieName);
});
  

const showAllMovie = (element, poster, title, year, plot) => {
    const card = document.createElement("div");
    card.classList.add('movie-card');
  
    card.innerHTML = `
      <img src="${poster}" alt="${title}" class="movie-poster" />
      <div class="movie-details">
        <h2 class="movie-title">Titre : ${title}</h2>
        <p class="movie-year">Annee de sortie: ${year}</p>
        <p class="movie-plot">Synopsis: ${plot}</p>
        <a href="#" class="read-more">Afficher plus</a>
      </div>
    `;
    
    const readMoreBtn = card.querySelector(".read-more");
    readMoreBtn.addEventListener("click", () => {
        showMoviePop(poster, title, year, plot);
    })
    element.appendChild(card);
};

const showMoviePop = (poster, title, year, plot) => {
    const popup = document.createElement("div");
    popup.classList.add("movie-popup");

    popup.innerHTML = `
        <img src="${poster}" alt="${title}" class="movie-poster" />
        <h2 class="popup-title">${title}</h2>
        <p class="popup-year">Annee de sortie: ${year}</p>
        <p class="popup-plot">Synopsis: ${plot}</p>
        <button class="close-popup">Fermer</button
    `;

    const removePopup = popup.querySelector(".close-popup");
    removePopup.addEventListener("click", () => {
        popup.remove();
    })

    document.body.appendChild(popup);
};

