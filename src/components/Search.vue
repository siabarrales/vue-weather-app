<script setup></script>

<template>
  <div class="container">
    <h1>Weather App</h1>
    <div class="search-container">
      <input type="text" placeholder="Enter a city" />
      <button class="btn-search">Search</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px;
}
.search-container {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-search {
  margin-left: 10px;
}
</style>
