const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=08cc439438803ba04b0a77388069d43e&page=1';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=08cc439438803ba04b0a77388069d43e&query="';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main =  document.getElementById('main');

// Get initial movie
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data.results);
    showMovies(data.results);
} 

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview } = movie;
        
        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByVote(vote_average)}">${vote_average}<i class="fas fa-star"></i></span>
        </div>
        <div class="overview">
            <h3>Overview</h3>  
            ${overview}
        </div>`;

        main.appendChild(movieEl);
    }); 
}

function getClassByVote(vote) {
    if(vote >= 8) {
        return 'green';
    }
    else if(vote >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    // Check searchTerm is exist or not and not equal to null
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);

        // Clear the Search
        search.value = '';
    } else {
        window.location.reload();
    }
})