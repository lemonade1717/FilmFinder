const movieForm = document.querySelector(".movieForm");
const movieInput = document.querySelector(".movieInput");
const card = document.querySelector(".card");
const apiKey = "ffcde258";

movieForm.addEventListener("submit", async event => {

    event.preventDefault();

    const movie = movieInput.value;

    if(movie) {
        try {
            const movieData = await getMovieData(movie);
            displayMovieInfo(movieData);
            console.log(movieData);
        } catch(error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a movie name");
    }
});

async function getMovieData(name) {

    const apiUrl = `http://www.omdbapi.com/?t=${name}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error(`Could not fetch weather data`);
    }

    console.log(response);

    return await response.json();

}

function displayMovieInfo(data) {
    
    const {Title, Metascore, Genre, Year, Plot, Poster} = data;

    card.textContent = "";
    card.style.display = "flex";
    
    const movieDiv = document.createElement("div");
    const movieInfo = document.createElement("div");
    movieDiv.classList.add("movie");
    movieInfo.classList.add("movieInfo");
    card.appendChild(movieDiv);
    
    const movieDisplay = document.createElement("h2");
    const ratingDisplay = document.createElement("p");
    const genreDisplay = document.createElement("p");
    const yearDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const posterDisplay = document.createElement("img");
    
    movieDisplay.textContent = Title;
    ratingDisplay.textContent = `Metacritic: ${Metascore}`;
    genreDisplay.textContent = `Genre: ${Genre}`;
    yearDisplay.textContent = `Year: ${Year}`;
    descDisplay.textContent = Plot;
    posterDisplay.src = Poster;
    
    posterDisplay.classList.add("poster");
    
    movieDiv.appendChild(posterDisplay);
    movieDiv.appendChild(movieInfo);
    movieInfo.appendChild(movieDisplay);
    movieInfo.appendChild(ratingDisplay);
    movieInfo.appendChild(genreDisplay);
    movieInfo.appendChild(yearDisplay);
    movieInfo.appendChild(descDisplay);
}

function displayError(message) {
    
    card.textContent = ""
    card.style.display = "flex";


    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    
    
    card.appendChild(errorDisplay);
}