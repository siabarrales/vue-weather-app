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
      <p class="title">Weather App</p>
      <IconWeather class="search-weather-icon" />
    </div>
    <div class="search-container">
      <input
        type="text"
        placeholder="Enter a city"
        v-model="city"
        @keyup.enter="searchWeather"
      />
      <button class="btn-search" @click="searchWeather">Search</button>
    </div>
  </div>
</template>

<style scoped>
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
.title {
  font-size: 50px;
}
</style>
