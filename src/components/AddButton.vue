<template>
  <div v-if="watched">
    <button disabled class="add-btn">Watched</button>
  </div>
  <div v-if="!watched && isInList" @click="handleUpdateButtonClick">
    <button class="add-btn">Watch</button>
  </div>
  <div v-if="!isInList && !watched" @click="handleAddRemoveButtonClick">
    <button class="add-btn">Add</button>
  </div>
  <div
    v-if="isInList && !watched && !iswatched"
    @click="handleAddRemoveButtonClick"
  >
    <button class="remove-btn">Remove</button>
  </div>
</template>

<script>
import { deleteMovie } from "../firebase";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    caption: String,
    watched: Number,
    id: Number,
    movieObj: Object,
  },
  setup(props) {
    const store = useStore();

    const moviesList = computed(() => store.getters.getMovies);

    const isInList = computed(() => {
      const movies = moviesList.value;

      return movies.some((movie) => movie.id === props.id);
    });

    return {
      moviesList,
      isInList,
    };
  },
  data() {
    return {};
  },
  mounted() {
    //this.checkIfAlreadyInList();
  },
  methods: {
    handleAddRemoveButtonClick() {
      if (!this.isInList) {
        this.$emit("open-addmovie-modal", this.movieObj);
      }
      if (this.isInList) {
        this.removeMovie(this.movieObj);
      }
    },
    handleUpdateButtonClick() {
      if (!this.watched && this.isInList) {
        this.$emit("open-review-modal", this.movieObj);
      }
    },

    async removeMovie(movie) {
      await deleteMovie(movie.id);
      this.$store.commit("removeMovie", this.id);
      //this.$emit("movie-added");
    },
  },
};
</script>

<style scoped>
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

.modal-container {
  z-index: 999;
}
</style>
