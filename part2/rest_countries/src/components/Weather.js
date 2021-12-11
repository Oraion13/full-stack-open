import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);

  console.log("capital", capital);

  useEffect(() => {
    const first = "https://api.openweathermap.org/data/2.5/weather?q=";
    const last = "&APPID=";
    const api_key = process.env.REACT_APP_API_KEY;
    axios.get(`${first}${capital}${last}${api_key}`).then((response) => {
      console.log("fullfiled");
      setWeather(response.data);
    });
  }, [capital]);

  console.log("weather", weather);

  const temperature =
    weather.length !== 0 ? Math.floor(weather.main.temp - 273.15) : 0;
  const wind =
    weather.length !== 0 ? Math.floor(weather.wind.speed * 2.237) : 0;
  const direction = () => {
    const compassPoints = [
      "North",
      "North North East",
      "North East",
      "East North East",
      "East",
      "East South East",
      "South East",
      "South South East",
      "South",
      "South South West",
      "South West",
      "West South West",
      "West",
      "West North West",
      "North West",
      "North North West",
    ];
    const rawPosition =
      weather.length !== 0 ? Math.floor(weather.wind.deg / 22.5 + 0.5) : 0;
    const arrayPosition = rawPosition % 16;
    return compassPoints[arrayPosition];
  };

  return (
    <>
      <h2>Weather in {capital}</h2>

      <p>
        <b>Tempreature</b>: <b>{temperature}</b> Celcius
      </p>
      <p>
        <b>Wind</b>: <b>{wind}</b> mph in a <b>{direction()}</b> direction
      </p>
    </>
  );
};

export default Weather;
