<template>
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
  <div class="review-section">
    <textarea
      class="review-text"
      rows="4"
      :placeholder="reviewer ? `Go ahead ${reviewer}...` : ''"
      v-model="allReviews[`${reviewer}Comments`]"
      :disabled="!reviewer"
    >
    </textarea>

    <!-- Rating
    <input
      type="number"
      class="score-input"
      placeholder="(0-10)"
      min="0"
      max="10"
      step="0.1"
      v-maska
      data-maska="#0.#0"
      v-model="allReviews[`${reviewer}Score`]"
      :disabled="!reviewer"
    /> -->
    <div
      class="star-rating"
      @mouseleave="resetHover"
      @mouseover="setActiveClass"
      v-if="reviewer"
    >
      <span
        class="star"
        v-for="index in 10"
        :key="index"
        @mouseenter="hoveredRating = index"
        @mouseleave="hoveredRating = 0"
        @click="setRating(index)"
        :class="{ active: index <= hoveredRating }"
      >
        &#9733;
      </span>
      <div>
        {{ allReviews[`${reviewer}Score`] }}
        <span v-if="allReviews[`${reviewer}Score`]">Stars</span>
      </div>
    </div>
  </div>
  <hr />
  <span v-if="averageScore > 0">{{ averageScore }} average</span>
  <br />
  <br />
  <PrimaryButton @click="submitReview" caption="Submit Review"></PrimaryButton>
</template>

<script>
//deprecated
// import { vMaska } from "maska";
import { markAsWatched } from "../firebase";
import PrimaryButton from "./PrimaryButton.vue";

export default {
  props: {
    movieObj: Object,
  },
  components: {
    PrimaryButton,
  },
  //directives: { maska: vMaska },
  data() {
    return {
      reviewer: "",
      allReviews: {
        kamronComments: "",
        kamronScore: "",
        aidanComments: "",
        aidanScore: "",
        joshComments: "",
        joshScore: "",
        ryanComments: "",
        ryanScore: "",
      },

      hoveredRating: 0,
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
    },
    async watchMovie(movie) {
      await markAsWatched(movie.id);
    },
    hoverRating(rating) {
      this.hoveredStars = rating;
    },
    resetHover() {
      this.hoveredStars = 0;
    },
    setRating(rating) {
      this.allReviews[`${this.reviewer}Score`] = rating;
    },
  },
  computed: {
    averageScore() {
      let totalScore = 0;
      let reviewerCount = 0;

      // Iterate over each reviewer's score and calculate the total score
      for (const key in this.allReviews) {
        if (key.includes("Score") && this.allReviews[key]) {
          totalScore += parseFloat(this.allReviews[key]);
          reviewerCount++;
        }
      }

      // Calculate the average score
      return reviewerCount > 0 ? (totalScore / reviewerCount).toFixed(2) : 0;
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

.review-text,
.score-input {
  width: calc(100% - 22px); /* Subtracting padding and border width */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: none; /* Prevent resizing */
}

.score-input {
  width: 80px; /* Adjust the width as needed */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.star-rating {
  position: relative;
  display: inline-block;
  font-size: 50px;
  color: gold;
  cursor: pointer;
}

.star-rating .star.active {
  color: rgba(255, 217, 0, 0.377); /* Color of the active star */
}
</style>
