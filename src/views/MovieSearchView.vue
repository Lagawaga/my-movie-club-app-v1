<template>
  <h1>Search for a movie to add to the collection</h1>
  <MovieSearch />
</template>

<script>
import MovieSearch from "@/components/MovieSearch.vue";

export default {
  name: "App",
  components: {
    MovieSearch,
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

h1 {
  text-align: center;
}
</style>
