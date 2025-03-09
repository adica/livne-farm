"use client";

import { useEffect, useState } from "react";
import { Cloud, Droplets, Sun, Thermometer, Wind } from "lucide-react";

interface WeatherWidgetProps {
  location: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
}

export function WeatherWidget({ location }: WeatherWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    setIsLoading(true);
    setError(null);

    const API_KEY = process.env.NEXT_PUBLIC_TOMORROW_IO_API_KEY;
    
    // Format location properly - API expects coordinates or properly formatted location
    // Coordinates for Kfar Bilu, Israel
    const latitude = 31.8741;  // Kfar Bilu latitude
    const longitude = 34.7959; // Kfar Bilu longitude
    
    console.log("Fetching weather with API Key:", API_KEY?.substring(0, 5) + "..." || "No API key");
    
    // Use coordinates instead of location string for more reliable results
    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${API_KEY}`)
      .then(response => {
        console.log("API response status:", response.status);
        if (!response.ok) {
          return response.text().then(text => {
            console.error("API error response:", text);
            throw new Error(`Weather API error (${response.status}): ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Weather data received:", data);
        
        // Check if the response has the expected structure
        if (!data.data || !data.data.values) {
          throw new Error("Unexpected API response format");
        }
        
        // Extract relevant weather information
        const weatherData: WeatherData = {
          temperature: data.data.values.temperature || 0,
          humidity: data.data.values.humidity || 0,
          windSpeed: data.data.values.windSpeed || 0,
          weatherCode: data.data.values.weatherCode || 1000,
          description: getWeatherDescription(data.data.values.weatherCode || 1000)
        };
        
        setWeatherData(weatherData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching weather:", err);
        setError(`Error: ${err.message || "Failed to load weather data"}`);
        setIsLoading(false);
      });
  }, [location, isMounted]);

  // Helper function to get weather description from code
  const getWeatherDescription = (code: number): string => {
    const descriptions: Record<number, string> = {
      1000: "Clear, Sunny",
      1100: "Mostly Clear",
      1101: "Partly Cloudy",
      1102: "Mostly Cloudy",
      1001: "Cloudy",
      2000: "Fog",
      4000: "Drizzle",
      4001: "Rain",
      4200: "Light Rain",
      4201: "Heavy Rain",
      5000: "Snow",
      5001: "Flurries",
      5100: "Light Snow",
      5101: "Heavy Snow",
      6000: "Freezing Drizzle",
      6001: "Freezing Rain",
      6200: "Light Freezing Rain",
      6201: "Heavy Freezing Rain",
      7000: "Ice Pellets",
      7101: "Heavy Ice Pellets",
      7102: "Light Ice Pellets",
      8000: "Thunderstorm"
    };
    
    return descriptions[code] || "Unknown";
  };

  // Return a placeholder during server-side rendering or loading
  if (!isMounted || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[250px] bg-black/20 rounded-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
        <div className="text-white text-center">
          Loading weather data...
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[250px] bg-black/20 rounded-md">
        <div className="text-red-400 text-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-medium">{error}</p>
          <p className="mt-2 text-sm">Please check your API key and try again.</p>
        </div>
      </div>
    );
  }

  // Show weather data
  if (weatherData) {
    return (
      <div className="text-white min-h-[250px] rounded-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-1">Kfar Bilu, Israel</h3>
            <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-lg">{weatherData.description}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-400" />
              <span>{weatherData.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-400" />
              <span>{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-gray-300" />
              <span>{weatherData.windSpeed} m/s</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-300 mt-4 border-t border-white/10 pt-2">
          Powered by Tomorrow.io • Updated just now
        </div>
      </div>
    );
  }

  return null;
} 