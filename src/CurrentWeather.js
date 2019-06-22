import React from "react";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiSleet, WiStrongWind, WiFog,
WiCloudy, WiDayCloudy, WiNightAltPartlyCloudy, WiUmbrella,WiRaindrops, WiWindy }
from 'weather-icons-react';
import MainCSS from "./main.css";


const CurrentWeather = props => {
  return (
    <React.Fragment>
    <div className= "todaysDetails" style={ {display: "inline-block"} }>
      <div className= "icon" style={ {display: "inline-block", verticalAlign: "middle"} }>
        <WiStrongWind size={200} color='#000' />
      </div>
      <div className="dailyTemp" style={ {display: "inline-block", verticalAlign: "middle"} }>
        <p className="currentTemp" style={ {fontSize: "9rem"} }>99°</p>
        <p className= "hiLo temp" style={ {fontSize: "1.5rem"} }>100° / 78°</p>
      </div>
    </div>
    <div className= "currentWeatherDetails" style={ {display: "inline-block", verticalAlign: "middle"} }>
      <ul style={ {listStyle: "none"} }>
        <li className= "currentWindSpeed" style= { {fontSize: "1.5rem", textAlign: "center"} }>
          <WiWindy size={40} color='#000' />
          <span>8 mph</span>
        </li>
        <li className= "chanceOfPrecip" style= { {fontSize: "1.5rem"} }>
          <WiUmbrella size={40} color='#000' />
          <span>0%</span>
        </li>
        <li className= "currentHumidity" style= { {fontSize: "1.5rem"} }>
          <WiRaindrops size={40} color='#000' />
          <span>30%</span>
        </li>
      </ul>
    </div>
  </React.Fragment>

  );
};
export default CurrentWeather;
