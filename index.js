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
            console.log("Aucun film trouvé.");
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
    const card = document.createElement('div');
    card.classList.add('movie-card');
  
    card.innerHTML = `
      <img src="${poster}" alt="${title}" class="movie-poster" />
      <div class="movie-details">
        <h2 class="movie-title">Titre : ${title}</h2>
        <p class="movie-year">Annee de sortie: ${year}</p>
        <p class="movie-plot">Synopsis: ${plot}</p>
        <a href="#" class="read-more">Read more</a>
      </div>
    `;
  
    element.appendChild(card);
};

