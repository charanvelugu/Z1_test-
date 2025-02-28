import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const API_URL = "https://api.openweathermap.org/data/2.5";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(`${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      setWeather(data);
      fetchForecast();
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await fetch(`${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      setForecast(data.list.slice(0, 5));
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={fetchWeather}>Search</Button>
      </div>

      {weather && (
        <Card className="mb-4">
          <CardContent>
            <h2 className="text-lg font-bold">{weather.name}, {weather.sys.country}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </CardContent>
        </Card>
      )}

      {forecast.length > 0 && (
        <div>
          <h3 className="text-xl font-bold">5-Day Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <Card key={index}>
                <CardContent>
                  <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                  <p>{day.weather[0].description}</p>
                  <p>Temp: {day.main.temp}°C</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
