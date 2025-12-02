import {
    useQuery
} from '@tanstack/react-query';
import type { WeatherResponse } from './WeatherWidget.types';

export function WeatherWidget() {

    const { data, error, isLoading } = useWeatherData();

    return (
        <div>
            <h2>Current Weather</h2>
            {isLoading && <p>Loading weather data...</p>}
            {error && <p>Error loading weather data.</p>}
            {data && (
                <div>
                    <p>Temperature: {data.current_weather.temperature}°C</p>
                    <p>Windspeed: {data.current_weather.windspeed} km/h</p>
                    <p>Wind Direction: {data.current_weather.winddirection}°</p>
                    <p>Weather Code: {data.current_weather.weathercode}</p>
                </div>
            )}
        </div>
    );
}


function useWeatherData() {
  return useQuery({
    queryKey: ['weather'],
    queryFn: async (): Promise<WeatherResponse> => {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true&hourly=temperature_2m')
      return await response.json()
    },
  })
}