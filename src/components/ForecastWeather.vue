<script setup>
import { ref, watch } from "vue";
import moment from "moment";

const props = defineProps({
  forecastday: Array,
});

const isToday = (item) => {
  if (moment(item.date).format("dddd") == moment().format("dddd")) {
    return true;
  }
  return false;
};
</script>

<template>
  <div class="forecast-container">
    <div class="forecastday" v-for="item in forecastday" :key="item">
      <img
        class="forecastday-img"
        :src="item.day.condition.icon"
        alt="weather condition image"
      />
      <div class="degrees">
        {{ Math.round(item.day.mintemp_c) }}°c /
        {{ Math.round(item.day.maxtemp_c) }}°c
      </div>
      <div v-if="isToday(item)" class="day">Today</div>
      <div v-else class="day">{{ moment(item.date).format("dddd") }}</div>
    </div>
  </div>
</template>

<style scoped>
.forecast-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
}
.forecastday-img {
  width: 40px;
}
.day {
  font-weight: bolder;
  font-size: 14px;
}
.degrees {
  font-size: 13px;
}
</style>
