<template>
  <h1>Movies</h1>
  <div class="btn-container">
    <PrimaryButton
      :caption="caption"
      @click="
        () => {
          unwatchedMoviesShow = !unwatchedMoviesShow;
        }
      "
    />
  </div>

  <div v-if="unwatchedMoviesShow">
    <UnwatchedMovies :movies="movies" />
  </div>
  <div v-else>
    <WatchedMovies :movies="watchedMovies" />
  </div>

  <!-- <WatchedMovies /> -->
</template>

<script>
import { getAllMovies } from "../firebase";
import UnwatchedMovies from "@/components/UnwatchedMovies.vue";
import WatchedMovies from "@/components/WatchedMovies.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

export default {
  name: "App",
  components: {
    UnwatchedMovies,
    WatchedMovies,
    PrimaryButton,
  },
  data() {
    return {
      unwatchedMoviesShow: true,
      query: "",
      movies: [],
      watchedMovies: [],
    };
  },
  mounted() {
    this.searchMovies();
  },

  methods: {
    async searchMovies() {
      try {
        this.movies = await getAllMovies();
        this.sortWatchedMovies(this.movies);
        this.movies = this.movies.filter((movie) => movie.watched === 0);
      } catch (error) {
        console.error(error);
      }
    },
    sortWatchedMovies(movies) {
      this.watchedMovies = movies.filter((movie) => movie.watched === 1);
    },
  },
  computed: {
    caption() {
      return this.unwatchedMoviesShow ? "See History" : "See Collection";
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to right, #0a192f, #102a44);
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
}

.btn-container {
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;

  position: relative;
}
</style>
