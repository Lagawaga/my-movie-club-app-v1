<template>
  <h3>{{ movieObj["title"] }}</h3>
  <br />
  <div class="reviewers">
    <button
      data-reviewer="kamron"
      class="reviewer"
      @click="setReviewer('kamron')"
    >
      K
    </button>
    <button
      data-reviewer="aidan"
      class="reviewer"
      @click="setReviewer('aidan')"
    >
      A
    </button>
    <button data-reviewer="ryan" class="reviewer" @click="setReviewer('ryan')">
      R
    </button>
    <button data-reviewer="josh" class="reviewer" @click="setReviewer('josh')">
      J
    </button>
  </div>
  <br />

  <button class="add-btn" @click="postMovie(movieObj)" v-if="reviewer">
    Add Movie
  </button>
</template>

<script>
import { createMovie } from "../firebase";

export default {
  props: {
    movieObj: Object,
  },

  data() {
    return {
      reviewer: "",
    };
  },
  mounted() {},
  methods: {
    setReviewer(reviewer) {
      document.querySelectorAll(".reviewer").forEach((button) => {
        button.classList.remove("active");
      });

      const activeButton = document.querySelector(
        `.reviewer[data-reviewer="${reviewer}"]`
      );
      if (activeButton) {
        activeButton.classList.add("active");
      }
      this.reviewer = reviewer;
      this.$emit("picked-by-update", reviewer);
    },
    async postMovie(movie) {
      await createMovie(movie);

      this.$store.commit("addMovie", this.movieObj.id);
      this.$emit("movie-added");
      this.$emit("close-addmovie-modal", this.movieObj);
    },
  },
};
</script>

<style scoped>
.reviewers {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f0f0f0; /* Light grey background for the container */
  padding: 20px;
  border-radius: 10px; /* Adds rounded corners to the container */
  z-index: 999;
}

.reviewer {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Makes the button circular */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* White text color */
  font-weight: bold; /* Bold letter */
  font-size: 20px;
  border: none; /* Removes the default button border */
  cursor: pointer; /* Pointer cursor on hover */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition for transform and shadow */
  background-color: #757575; /* Initial background color, updated to a sleek grey */
}

/* Removing the default button highlight on click */
.reviewer:focus {
  outline: none;
}

/* Specific modern and sleek background colors for each reviewer button */
.reviewer:nth-child(1) {
  background-color: #607d8b;
} /* Blue Grey */
.reviewer:nth-child(2) {
  background-color: #4caf50;
} /* Green */
.reviewer:nth-child(3) {
  background-color: #ffc107;
} /* Amber */
.reviewer:nth-child(4) {
  background-color: #03a9f4;
} /* Light Blue */

/* Hover effects: scale for float effect and shadow for depth */
.reviewer:hover {
  transform: scale(1.1); /* Slightly enlarges the button */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect for depth */
}

.reviewer.active {
  transform: scale(1.5);
  box-shadow: 0px 0px 10px rgba(75, 134, 189, 0.623); /* Adjust shadow as needed */
}

.review-section {
  margin-top: 20px;
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
</style>
