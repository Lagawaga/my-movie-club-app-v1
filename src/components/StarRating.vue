<template>
  <div class="star-rating" :title="`Rating: ${rating}`">
    <span class="star">&#9733;</span>
    <!-- Star character -->
    <span class="rating-value">{{ rating }}</span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.star-rating {
  position: relative;
  display: inline-block;
  font-size: 125px; /* Adjust size of the star */
  color: gold; /* Color of the star */
}

.rating-value {
  position: absolute;
  top: 57.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black,
    -1px 1px 2px white;
}
</style>
