<template>
  <nav class="navbar">
    <div class="logo">
      <router-link :to="{ name: 'home' }">
        <!-- <img alt="logo-icon" src="../assets/movieslate.png" /> -->
        <img alt="logo-shorthand" src="../assets/movieclublogoshort.png" />
      </router-link>
    </div>

    <ul class="nav-links">
      <li><a href="/">Home</a></li>

      <li><a href="/movies">Movies</a></li>

      <li><a href="/search">Search</a></li>
      <!-- Add more navigation links as needed -->
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #102a44;
}

.logo {
  padding-left: 10px;
}

.logo img {
  padding-left: 10px;
  width: 50px;
}

.nav-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  display: inline-block;
  margin-right: 0px;
  border-right: 5px solid #0921386e;
  border-color: #0921386e;
  padding: 30px;
  margin: 1px;
}

.nav-links li:last-child {
  margin-right: 0;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}

.nav-links li a:hover {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
}
</style>
