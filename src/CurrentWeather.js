import React from "react";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiSleet, WiStrongWind, WiFog,
WiCloudy, WiDayCloudy, WiNightAltPartlyCloudy, WiUmbrella,WiRaindrops, WiWindy }
from 'weather-icons-react';
import MainCSS from "./main.css";


const CurrentWeather = (props) => {
  return (
    <React.Fragment>
    <div className= "todaysDetails" style={ {display: "inline-block"} }>
      <div className= "icon" style={ {display: "inline-block", verticalAlign: "middle"} }>
        {props.icon}
      </div>
      <div className="dailyTemp" style={ {display: "inline-block", verticalAlign: "middle"} }>
        <p className="currentTemp" style={ {fontSize: "9rem"} }>{props.currentTemp}</p>
        <p className= "hiLo temp" style={ {fontSize: "1.5rem"} }>{props.high} / {props.low}</p>
      </div>
    </div>
    <div className= "currentWeatherDetails" style={ {display: "inline-block", verticalAlign: "middle"} }>
      <ul style={ {listStyle: "none"} }>
        <li className= "currentWindSpeed" style= { {fontSize: "1.5rem", textAlign: "center"} }>
          <WiStrongWind size={40} color='#000' />
          <span>{props.wind}</span>
        </li>
        <li className= "chanceOfPrecip" style= { {fontSize: "1.5rem"} }>
          <WiUmbrella size={40} color='#000' />
          <span>{props.chanceOfRain}</span>
        </li>
        <li className= "currentHumidity" style= { {fontSize: "1.5rem"} }>
          <WiRaindrops size={40} color='#000' />
          <span>{props.humidity}</span>
        </li>
      </ul>
    </div>
  </React.Fragment>

  );
};
export default CurrentWeather;
