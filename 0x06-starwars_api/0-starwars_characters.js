#!/usr/bin/node
const axios = require('axios');

function getMovieCharacters(movieId) {
  const url = `https://swapi-api.alx-tools.com/api/films${movieId}/`;

  axios.get(url)
    .then(response => {
      const movieData = response.data;
      const characters = movieData.characters;

      characters.forEach(characterUrl => {
        axios.get(characterUrl)
          .then(characterResponse => {
            const characterData = characterResponse.data;
            const characterName = characterData.name;
            console.log(characterName);
          })
          .catch(error => {
            console.log(`Failed to fetch character data for URL: ${characterUrl}`);
          });
      });
    })
    .catch(error => {
      console.log(`Failed to fetch movie data for ID: ${movieId}`);
    });
}

if (process.argv.length !== 3) {
  console.log("Usage: node script.js <movie_id>");
  process.exit(1);
}

const movieId = parseInt(process.argv[2]);

if (isNaN(movieId)) {
  console.log("Movie ID must be a number");
  process.exit(1);
}

getMovieCharacters(movieId);
