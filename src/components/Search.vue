<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import IconWeather from "./icons/IconWeather.vue";
const emit = defineEmits(["searchWeather"]);
const city = ref();
const searchWeather = () => {
  emit("searchWeather", city.value);
};
</script>

<template>
  <div class="container">
    <div class="search-header">
      <h1>Weather App</h1>
      <IconWeather class="search-weather-icon" />
    </div>
    <div class="search-container">
      <input type="text" placeholder="Enter a city" v-model="city" />
      <button class="btn-search" @click="searchWeather">Search</button>
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
.search-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-weather-icon {
  margin-left: 10px;
}
</style>
