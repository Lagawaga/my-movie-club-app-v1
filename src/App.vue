<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <router-view />
      <!-- <div>
        <HomeView />
      </div> -->
      <!-- <div>
        <MovieSearchView />
      </div> -->
    </div>
  </div>
</template>

<script>
import NavBar from "./Navigation/NavBar.vue";
// import MovieSearchView from "./views/MovieSearchView.vue";
//import HomeView from "./views/HomeView.vue";

export default {
  name: "App",
  components: {
    NavBar,
    // MovieSearchView,
    //HomeView,
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
.container {
  display: grid;
  align-items: center;
}
</style>
