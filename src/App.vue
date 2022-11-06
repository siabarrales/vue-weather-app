<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from "vue";
import Weather from "./components/Weather.vue";
import Search from "./components/Search.vue";
const city = ref();
const searchWeather = (data) => {
  city.value = data;
};
</script>

<template>
  <Search @searchWeather="searchWeather" />
  <Weather :city="city" />
</template>

<style scoped></style>
