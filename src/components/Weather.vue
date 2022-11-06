<script setup>
import { ref, onMounted, watch, computed } from "vue";
import moment from "moment";
import IconWeather from "./icons/IconWeather.vue";
import useWeather from "./../composables/useWeather";

const props = defineProps({
  city: String,
});

const { getRealTimeWeather } = useWeather();
const weather = ref(null);
const loading = ref(true);
const loadingWeather = async () => {
  loading.value = true;
  weather.value = await getRealTimeWeather(props.city);
  loading.value = false;
};

watch(
  () => props.city,
  async (data) => {
    loadingWeather();
  }
);
onMounted(async () => {
  loadingWeather();
});
</script>

<template>
  <div class="card">
    <div v-if="loading" class="loading-container">
      <span class="loader"></span>
    </div>
    <div v-else-if="weather === 'cityNotExist'">
      La ciudad no existe, intente nuevamente.
    </div>
    <div v-else>
      <p class="city">{{ weather.location.name }}</p>
      <p class="date">
        {{ moment(weather.location.localtime).format("LL") }}.
        {{ weather.location.country }}
      </p>
      <p class="degrees">{{ weather.current.temp_c }}°c</p>
      <span>--------------</span>
      <div class="weather">
        <img
          :src="weather.current.condition.icon"
          alt="weather condition image"
        />
        <h3 class="weather-description">
          {{ weather.current.condition.text }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 50px;
  height: 500px;
  border-radius: 8px;
}
.city {
  font-size: 35px;
  font-weight: 800;
  margin-top: 0px;
  margin-bottom: 0px;
  letter-spacing: 1px;
}
.date {
  margin-top: 15px;
  font-size: 15px;
  font-weight: lighter;
  opacity: 0.5;
}
.degrees {
  font-size: 90px;
  font-weight: bolder;
  margin-top: 80px;
  margin-bottom: 50px;
}
.weather {
  margin-top: 20px;
}
.weather-description {
  margin-top: 0px;
  letter-spacing: 1px;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0px;
}
</style>
