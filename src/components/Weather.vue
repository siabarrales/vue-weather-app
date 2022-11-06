<script setup>
import { ref, onMounted, watch, computed } from "vue";
import moment from "moment";
import IconWeather from "./icons/IconWeather.vue";
import useWeather from "./../composables/useWeather";
import ForecastWeather from "./ForecastWeather.vue";

const props = defineProps({
  city: String,
});

const { getRealTimeWeather } = useWeather();
const weather = ref(null);
const loading = ref(true);
const loadingWeather = async () => {
  loading.value = true;
  weather.value = await getRealTimeWeather(props.city);
  console.log(weather.value.forecast.forecastday);
  loading.value = false;
};

watch(
  () => props.city,
  async () => {
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
        {{ weather.location.country }},
        {{ moment(weather.location.localtime).format("LL") }}
      </p>
      <p class="degrees">{{ Math.round(weather.current.temp_c) }}°c</p>
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
    <ForecastWeather
      v-if="weather && !loading"
      :forecastday="weather.forecast.forecastday"
    />
  </div>
</template>

<style scoped>
.city {
  font-size: 35px;
  font-weight: 800;
  margin-top: 0px;
  margin-bottom: 0px;
  letter-spacing: 1px;
  line-height: 100%;
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
</style>
