<template>
  <div class="pillars-container">
    <div class="pillars">
      <div class="pillar" v-for="(reviewer, index) in reviewers" :key="index">
        <h3>{{ capitalizeFirstLetter(reviewer) }}</h3>
        <hr />
        <br />
        <p class="score">
          <span class="score-border">{{ review[`${reviewer}Score`] }}</span>
        </p>
        <br />
        <p>{{ review[`${reviewer}Comments`] }}</p>
      </div>
    </div>
    <div class="average">
      <h3>Average Score</h3>
      <p class="score">{{ review.averageScore }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object,
  },
  data() {
    return {
      reviewers: ["kamron", "aidan", "josh", "ryan"],
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>

<style scoped>
.pillars-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px; /* Add space between pillars and average score */
}

.pillars {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%; /* Take 100% of the container width */
}

.pillar {
  flex: 1;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1); /* Transparent border */
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 5px; /* Rounded corners */
}

.pillar h3 {
  color: #333; /* Dark text color */
}

.pillar p {
  color: #666; /* Medium text color */
}

.score {
  font-size: 21px; /* Larger font size for the score */
  font-weight: bold; /* Bold font weight */
  color: #ffd000 !important; /* Flashy orange color for the score */
  text-align: center; /* Center align the score */
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000; /* Outline effect */
}
.score-border {
  border: 1px solid black; /* Adjust border style and color as needed */
  padding: 20px 20px; /* Adjust padding as needed */
  border-radius: 5px; /* Add border radius for rounded corners */
  background-color: rgb(91, 106, 136);
}

.average {
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1); /* Transparent border */
  width: 100%; /* Take 100% of the container width */
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 5px; /* Rounded corners */
}

.average h3 {
  color: #333; /* Dark text color */
}

.average p {
  color: #666; /* Medium text color */
}
</style>
