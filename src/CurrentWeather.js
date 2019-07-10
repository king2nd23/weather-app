import React from "react";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiSleet, WiStrongWind, WiFog,
WiCloudy, WiDayCloudy, WiNightAltPartlyCloudy, WiUmbrella,WiRaindrops, WiWindy }
from 'weather-icons-react';
import MainCSS from "./main.css";

const CurrentWeather = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="weatherApp">
          <div className="locationSummary">
            <div className="city">{props.city}</div>
            <div className="summary">{props.summary}</div>
          </div>
          <div className= "todaysDetails">
            <div className= "icon">
              {props.icon}
            </div>
            <div className="dailyTemp">
              <p className="currentTemp">{props.currentTemp}</p>
              <p className= "hiLoTemp">{props.high}° / {props.low}°</p>
            </div>
          </div>
          <div className= "currentWeatherDetails">
            <ul>
              <li className= "currentWindSpeed">
                <WiStrongWind size={40} />
                <span>{props.wind}mph</span>
              </li>
              <li className= "chanceOfPrecip">
                <WiUmbrella size={40} />
                <span>{props.chanceOfRain}%</span>
              </li>
              <li className= "currentHumidity">
                <WiRaindrops size={40} />
                <span>{props.humidity}%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </React.Fragment>

  );
};
export default CurrentWeather;
