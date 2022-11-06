<script setup>
import { ref, onMounted, watch, computed } from "vue";
import moment from "moment";
import IconLocation from "./icons/IconLocation.vue";
import IconWind from "./icons/IconWind.vue";
import IconHumidity from "./icons/IconHumidity.vue";
import IconUV from "./icons/IconUV.vue";
import IconNotFound from "./icons/IconNotFound.vue";
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
      <IconNotFound class="notfound-icon" />
      <h2>Hmmm!</h2>
      <p>No encontramos la ciudad que buscabas.</p>
      <p></p>
    </div>
    <div v-else>
      <p class="city">
        <IconLocation class="city-location-icon" />{{ weather.location.name }}
      </p>
      <p class="date">
        {{ weather.location.country }},
        {{ moment(weather.location.localtime).format("LL") }}
      </p>
      <p class="degrees">
        {{ Math.round(weather.current.temp_c) }}°<span class="celsius">c</span>
      </p>
      <div class="container-current-weather-info">
        <div class="current-weather-info">
          <IconWind />
          <p>{{ weather.current.wind_kph }} kph</p>
        </div>
        <div class="current-weather-info">
          <IconHumidity />
          <p>{{ weather.current.humidity }} %</p>
        </div>
        <div class="current-weather-info">
          <IconUV />
          <p>{{ weather.current.uv }}</p>
        </div>
      </div>
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
      <ForecastWeather
        v-if="weather && !loading"
        :forecastday="weather.forecast.forecastday"
      />
    </div>
  </div>
</template>

<style scoped>
.city {
  font-size: 40px;
  font-weight: 800;
  margin-top: 0px;
  margin-bottom: 0px;
  letter-spacing: 1px;
  line-height: 100%;
}

.date {
  margin-top: 15px;
  font-size: 18px;
  font-weight: lighter;
  opacity: 0.5;
}
.degrees {
  font-size: 100px;
  font-weight: bolder;
  margin-top: 80px;
  margin-bottom: 35px;
}
.weather {
  margin-top: 20px;
}
.weather-description {
  margin-top: 0px;
  letter-spacing: 1px;
  font-size: 22px;
}
img {
  width: 80px;
}
.celsius {
  font-size: 85px;
  font-weight: 600;
}
.city-location-icon {
  color: #646cff;
}
.container-current-weather-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0px auto;
}
.current-weather-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.current-weather-info p {
  margin-left: 5px;
}

.notfound-icon {
  font-size: 80px;
  color: #646cff;
}
</style>
