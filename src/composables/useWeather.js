// fetch.js
import { ref } from "vue";

const useWeather = () => {
  const weather = ref(null);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "62c88d74e7msh65bd326ef714f05p1ff34djsn92c0dad0dd27",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const getRealTimeWeather = async (city = "santiago") => {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
      options
    );

    if (!response.ok) {
      return "cityNotExist";
    }
    const weather = await response.json();
    return weather;
  };

  return { getRealTimeWeather, weather };
};

export default useWeather;
