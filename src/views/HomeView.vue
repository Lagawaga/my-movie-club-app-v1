<template>
  <div class="home">
    <img alt="logo" src="../assets/movieclublogo.png" />
    <div class="poster-pic-container">
      <img class="poster-pic" src="../assets/movieclubposter.jpg" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
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
</style>
