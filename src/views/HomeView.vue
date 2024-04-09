<template>
  <div class="home">
    <img alt="logo" src="../assets/movieclublogo.png" />
    <div class="poster-pic-container">
      <img class="poster-pic" src="../assets/movieclubposter.jpg" />
    </div>
    <h1>What's Next?</h1>
    <MovieCard
      v-if="moviePicked"
      :key="movieObj.id"
      :id="movieObj.id"
      :title="movieObj.title"
      :genres="movieObj.genres"
      :overview="movieObj.overview"
      :releaseDate="movieObj.releaseDate"
      :rating="movieObj.rating"
      :imgSrc="`https://image.tmdb.org/t/p/w200${movieObj.imgSrc}`"
      :imgBckgrdSrc="`https://image.tmdb.org/t/p/original${movieObj.imgBckgrdSrc}`"
      :watched="movieObj.watched"
    />
    <br />
    <PrimaryButton
      caption="Pick another movie"
      @click="confirmMovieWatched"
    ></PrimaryButton>
    <div class="modal-container">
      <div v-if="confirmModalVisible">
        <p>Are you sure?</p>
        <p>Have you watched and reviewed this one?</p>
        <button class="add-btn spaced" @click="searchMovies">Yes</button>
        <button class="remove-btn spaced" @click="confirmModalVisible = false">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import MovieCard from "@/components/MovieCard.vue";

import { getCurrentMovie, getMovie, getAllMovies } from "../firebase";

// @ is an alias to /src

export default {
  name: "HomeView",
  components: { PrimaryButton, MovieCard },
  data() {
    return {
      currentMovie: "",
      moviePicked: false,
      confirmModalVisible: false,
      confirmed: false,
    };
  },
  mounted() {
    this.fetchCurrentMovie()
      .then(() => {
        this.fetchMovieCard(this.currentMovie.movieId);
      })
      .catch((error) => {
        console.error("Error fetching current movie:", error);
      });
  },
  methods: {
    async fetchCurrentMovie() {
      try {
        this.currentMovie = await getCurrentMovie();
      } catch (error) {
        console.error("Error fetching current movie:", error);
      }
    },
    async fetchMovieCard(movieId) {
      try {
        this.movieObj = await getMovie(movieId);
        console.log(this.movieObj);
        this.moviePicked = true;
      } catch (error) {
        console.error("Error fetching current movie:", error);
      }
    },
    confirmMovieWatched() {
      this.confirmModalVisible = true;
    },
    async searchMovies() {
      try {
        this.movies = await getAllMovies();
        this.movies = this.movies.filter((movie) => movie.watched === 0);
        console.log(this.movies);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  align-items: center;
  padding-top: 50px;
}
.poster-pic-container {
  padding-top: 25px;
}

.poster-pic {
  border-style: solid;
  border-radius: 10%;
  overflow: hidden;
}

.poster-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.modal-container {
  z-index: 999;
}

.add-btn {
  padding: 10px 20px;
  border: none;
  background-image: linear-gradient(to right, #56ab2f 0%, #a8e063 100%);
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  user-select: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
}

.add-btn:hover {
  background-image: linear-gradient(to left, #56ab2f 0%, #a8e063 100%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.add-btn:active {
  transform: translateY(2px);
}

.add-btn .icon {
  margin-right: 5px;
  font-size: 20px;
  line-height: 1;
}

.remove-btn {
  padding: 10px 20px;
  border: none;
  background-image: linear-gradient(to right, #ab3e2f 0%, #e07c63 100%);
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  user-select: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
}

.remove-btn:hover {
  background-image: linear-gradient(to left, #ab3e2f 0%, #e07c63 100%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.remove-btn:active {
  transform: translateY(2px);
}

.remove-btn .icon {
  margin-right: 5px;
  font-size: 20px;
  line-height: 1;
}
.spaced {
  margin: 10px;
}
</style>
