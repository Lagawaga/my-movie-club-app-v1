import { createStore } from "vuex";
import { getAllMovies } from "./firebase";

export default createStore({
  state() {
    return {
      movies: [],
    };
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    removeMovie(state, movieId) {
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
    },
    addMovie(state, movie) {
      state.movies.push(movie);
    },
  },
  actions: {
    async fetchMovies({ commit }) {
      try {
        const movies = await getAllMovies();

        commit("setMovies", movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
  getters: {
    getMovies(state) {
      return state.movies;
    },
  },
});
