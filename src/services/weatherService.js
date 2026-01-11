import api from "./api";


const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";


export const getWeatherByCity = async (city) => {
    const response = await api.get(`${WEATHER_BASE_URL}/weather`, {
        params: {
            q: city,
            units: "metric",
            appid: import.meta.env.VITE_WEATHER_API_KEY,
        },
    });


    return response.data;
};