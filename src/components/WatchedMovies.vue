<template>
  <div class="container">
    <h1>Seen it.</h1>
    <div v-if="movies" class="movies-container">
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <MovieCard
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :genres="movie.genres"
          :overview="movie.overview"
          :releaseDate="movie.releaseDate"
          :rating="movie.rating"
          :imgSrc="`https://image.tmdb.org/t/p/w200${movie.imgSrc}`"
          :imgBckgrdSrc="`https://image.tmdb.org/t/p/original${movie.imgBckgrdSrc}`"
          :watched="movie.watched"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "./MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  props: {
    movies: Array,
  },
  data() {
    return {
      query: "",
    };
  },
};
</script>

<style scoped>
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
  width: 200px;
  height: auto;
  margin-bottom: 5px;
}
</style>
