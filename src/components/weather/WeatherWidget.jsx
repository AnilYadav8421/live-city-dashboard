import { useEffect, useState } from "react";
import { getWeatherByCity } from "../../services/weatherService";
import Loader from "../common/Loader";

const WeatherWidget = () => {
    const [city, setCity] = useState("London"); // default city
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async (cityName) => {
        setLoading(true);
        setError("");
        try {
            const data = await getWeatherByCity(cityName);
            setWeather(data);
        } catch (err) {
            setError("Failed to load weather. Check city name.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // fetch default city on mount
    useEffect(() => {
        fetchWeather(city);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim() !== "") fetchWeather(city.trim());
    };

    if (loading) return <Loader />;
    if (error)
        return <p className="text-sm text-red-500 font-medium">{error}</p>;

    return (
        <div className="flex flex-col h-full">

            {/* Header */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Weather
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                    {weather?.name || city}
                </p>
            </div>

            {/* City Input */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </form>

            {weather && (
                <>
                    {/* Temperature */}
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            <p className="text-4xl font-bold text-gray-900 leading-none">
                                {Math.round(weather.main.temp)}°C
                            </p>
                            <p className="text-sm text-gray-500 capitalize mt-1">
                                {weather.weather[0].description}
                            </p>
                        </div>

                        <div className="text-right text-sm text-gray-500 space-y-1">
                            <p>
                                Feels like{" "}
                                <span className="font-medium text-gray-700">
                                    {Math.round(weather.main.feels_like)}°C
                                </span>
                            </p>
                            <p>
                                Humidity{" "}
                                <span className="font-medium text-gray-700">
                                    {weather.main.humidity}%
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-200"></div>

                    {/* Footer */}
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>
                            Min{" "}
                            <span className="font-medium text-gray-700">
                                {Math.round(weather.main.temp_min)}°C
                            </span>
                        </span>
                        <span>
                            Max{" "}
                            <span className="font-medium text-gray-700">
                                {Math.round(weather.main.temp_max)}°C
                            </span>
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherWidget;
