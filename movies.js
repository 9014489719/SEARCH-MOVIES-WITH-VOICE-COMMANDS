
let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
  let searchText = e.target.value;
  console.log(searchText);
  SearchMovies(searchText);
  // when key press hide form text and H1
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");
});

//speech Recognition api
let speechSearch = document.getElementById("speechIcon");
speechSearch.addEventListener("click", () => {
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement("p");
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    search.value = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement("p");
      p.innerHTML = transcript;
      let searchText = transcript;
      SearchMovies(searchText);
    }
  });

  recognition.start();
});

function SearchMovies(searchText) {
  const imdbAPi = `http://www.omdbapi.com/?s=${searchText}&apikey=f056e2f7`;
  window
    .fetch(imdbAPi)
    .then((data) => {
      data
        .json()
        .then((movieData) => {
          let movies = movieData.Search;
          let output = [];
          for (let movie of movies) {
            let defaultImg =
              movie.Poster === "N/A"
                ? "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg"
                : movie.Poster;
            output += `
            <div>
              <img src="${defaultImg}" />
              <h1>${movie.Title}</h1>
              <p>${movie.Year}
              <a href="http://www.imdb.com/title/${movie.imdbID}/" target="_blank">Movie Details</a>
            </div> 
            `;
          }

          document.getElementById("template").innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}