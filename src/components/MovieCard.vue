<template>
  <div
    class="movie-card"
    :style="{ backgroundImage: 'url(' + imgBckgrdSrc + ')' }"
  >
    <div class="poster-pic">
      <img :src="imgSrc" alt="Movie Poster" />
    </div>
    <div class="btn-container">
      <PrimaryButton
        caption="See Reviews"
        @click="showOverview()"
        v-if="watched == 1 && isAlreadyInList"
      />
      <PrimaryButton caption="Overview" @click="showOverview()" v-else />

      <AddButton
        :watched="watched"
        :id="id"
        caption="Add Movie"
        :movieObj="movieObj"
      />
    </div>
    <div class="modal-container">
      <OverviewModal v-model="isModalVisible">
        <p>{{ overview }}</p>
        <p>{{ genres }}</p>
        <p>Release Date: {{ releaseDate }}</p>
      </OverviewModal>
    </div>

    <div class="movie-info">
      <h1>{{ title }}</h1>
      <StarRating :rating="rating.toFixed(1)" />
    </div>
  </div>
</template>

<script>
import StarRating from "./StarRating.vue";
import PrimaryButton from "./PrimaryButton.vue";
import AddButton from "./AddButton.vue";
import OverviewModal from "./OverviewModal.vue";
import { getAllMovies } from "../firebase";

export default {
  props: {
    title: String,
    overview: String,
    releaseDate: String,
    imgSrc: String,
    imgBckgrdSrc: String,
    rating: String,
    id: Number,
    genres: Array,
    watched: Number,
  },
  components: {
    StarRating,
    PrimaryButton,
    OverviewModal,
    AddButton,
  },
  data() {
    return {
      isModalVisible: false,
      isAlreadyInList: false,
      movieObj: {
        id: this.id,
        title: this.title,
        genres: this.genres,
        overview: this.overview,
        rating: this.rating,
        releaseDate: this.releaseDate,
        imgSrc: this.imgSrc,
        imgBckgrdSrc: this.imgBckgrdSrc,
        watched: 0,
      },
    };
  },
  mounted() {
    this.checkIfAlreadyInList();
  },
  methods: {
    async checkIfAlreadyInList() {
      try {
        const movies = await getAllMovies();
        this.isAlreadyInList = movies.some((movie) => movie.id === this.id);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    showOverview() {
      this.isModalVisible = true;
      console.log(this.overview);
    },
    // addMovie() {
    //   this.movieObj = {
    //     id: this.id,
    //     title: this.title,
    //     genres: this.genres,
    //     overview: this.overview,
    //     rating: this.rating,
    //     releaseDate: this.releaseDate,
    //     imgSrc: this.imgSrc,
    //     imgBckgrdSrc: this.imgBckgrdSrc,
    //     watched: 0,
    //   };
    //   this.postMovie(this.movieObj);
    // },
    // async postMovie(movie) {
    //   await createMovie(movie);
    // },
  },
};
</script>

<style scoped>
.movie-card {
  width: 100%;
  min-height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  clear: both;
  border-radius: 10% 0 0 10%;
  display: flex;
  align-items: flex-start;
  transition: box-shadow 0.3s ease;
  position: relative;
}
.movie-card:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Adjust values as needed */
}
.movie-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  transition: background-color 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

.poster-pic {
  width: 225px;
  height: 325px;
  float: left;
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

.movie-info::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  pointer-events: none;
}
.movie-info {
  flex-grow: 1;
  flex-basis: 33.333%;
  text-align: right;
  padding-right: 20px;
  z-index: 2;
  font-weight: bold;
  color: white;
  text-shadow: black 1px;
}

.btn-container {
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;
  top: 250px;
  left: 50px;
  position: relative;
}
.modal-container {
  z-index: 999;
}

.movie-card {
  margin: 10px auto; /* Center movie cards horizontally */
  text-align: center;
}

@media (min-width: 1080px) {
  .movie-card {
    max-width: 1500px; /* Increase max-width for wide screens */
  }
}
</style>
