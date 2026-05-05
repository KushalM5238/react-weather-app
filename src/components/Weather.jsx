import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import { useRef } from "react";
// import key from "./env.VITE_WEATHER_API";

function Weather() {
  const ipRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (location) => {
    if (location === "") {
      alert("please enter the city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`;

      const res = await fetch(url);
      const data = await res.json();
      //   const icon_url=` https://openweathermap.org/payload/api/media/file/10d@01d.png`
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      console.log(data);

      if (!res.ok) {
        alert("enter valid city name");
        return;
      }
      setWeatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        windspeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("somthing went worng");
      alert("somthing went worng");
    }
  };

  useEffect(() => {
    search("Gujrat");
  }, []);

  return (
    <div className="weather">
      {/* Main container */}
      <div className="search-bar">
        {" "}
        {/* /Search Bar */}
        <input ref={ipRef} type="text" placeholder="search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(ipRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <div className="temp">
            {/* /temp & img */}
            <img src={weatherData.icon} alt="" className="weather-icon" />
            <p>{weatherData.temp}°c</p>
            <p>{weatherData.location}</p>
          </div>
          <div className="other-detail">
            {/* /Humidity & Wind Speed */}
            <div className="od1">
              <img src={humidity_icon} alt="" />
              <div className="data1">
                <h3>{weatherData.humidity}%</h3>
                <h3>Humidity</h3>
              </div>
            </div>
            <div className="od2">
              <img src={wind_icon} alt="" />
              <div className="data2">
                <h3>{weatherData.windspeed} Km/h</h3>
                <h3>Wind Speed</h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
