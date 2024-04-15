<template>
  <div class="container">
    <div class="user-input-container">
      <input
        class="user-input"
        v-model="query"
        @keyup.enter="updateQuery"
        placeholder="..."
      />
    </div>

    <div class="movies-container">
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <MovieCard
          v-if="movie.vote_average"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :genres="movie.genre_ids"
          :overview="movie.overview"
          :releaseDate="movie.release_date"
          :rating="movie.vote_average"
          :imgSrc="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
          :imgBckgrdSrc="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
          :watched="checkWatchedMovies(movie.id)"
          :isAlreadyInList="checkExistingMovies(movie.id)"
          :existingMovies="existingMovies"
          @movie-added="handleMovieAdded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "./MovieCard.vue";
import { TMDB_API_KEY } from "../API_KEY.js";
import { getAllMovies } from "../firebase";

export default {
  components: {
    MovieCard,
  },

  data() {
    return {
      query: "",
      movies: [],
      existingMovies: [],
    };
  },
  mounted() {
    const savedQuery = sessionStorage.getItem("query");
    if (savedQuery) {
      this.query = savedQuery;

      this.searchMovies();
    }
  },

  methods: {
    async searchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${this.query}`
        );
        this.movies = response.data.results;
        await this.getExistingMovies();
      } catch (error) {
        console.error(error);
      }
    },
    handleMovieAdded() {
      sessionStorage.setItem("query", this.query);
      window.location.reload();
    },

    updateQuery() {
      sessionStorage.setItem("query", this.query);
      this.searchMovies();
    },
    async getExistingMovies() {
      this.existingMovies = await getAllMovies();
    },
    checkExistingMovies(movieId) {
      this.isAlreadyInList = this.existingMovies.some(
        (movie) => movie.id === movieId
      );

      return this.isAlreadyInList;
    },
    checkWatchedMovies(movieId) {
      const watchedMovie = this.existingMovies.find(
        (movie) => movie.id === movieId
      );

      return watchedMovie ? watchedMovie.watched : 0;
    },
  },
};
</script>

<style>
.container {
  display: grid;
}
.movies-container {
  display: grid;
  grid-template-columns: 1fr;
}

.movie {
  margin: 10px;
  text-align: center;
}

.movie img {
  width: 200px; /* Match the width specified in the image URL */
  height: auto;
  margin-bottom: 5px;
}

.user-input-container {
  width: 50%;
  margin: 20px auto; /* Center the container vertically and horizontally */
  text-align: center; /* Center the input horizontally */
  padding-top: 10px;
}

.user-input {
  width: 100%;
  border: 3px solid #555;
  padding: 10px 35px 10px 10px;
  padding-left: 40px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 40px;
  background-image: url("~@/assets/searchicon.png");
  background-repeat: no-repeat;
  background-position: 10px 10px;
  background-size: 20px;
  font-size: 20px;
}
</style>
