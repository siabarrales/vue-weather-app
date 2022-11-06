<script setup>
import { ref, watch } from "vue";
import moment from "moment";

const props = defineProps({
  forecastday: Array,
});

const isToday = (item) => {
  if (moment(item.date).format("dddd") === moment().format("dddd")) {
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
      <div
        :class="{
          'is-today': isToday(item),
          degrees: true,
        }"
      >
        {{ Math.round(item.day.mintemp_c) }}°c /
        {{ Math.round(item.day.maxtemp_c) }}°c
      </div>
      <div v-if="isToday(item)" class="day is-today">Today</div>
      <div v-else class="day">{{ moment(item.date).format("dddd") }}</div>
    </div>
  </div>
</template>

<style scoped>
.forecast-container {
  background-color: rgba(36, 36, 36, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
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
.is-today {
  color: #646cff;
}
</style>
