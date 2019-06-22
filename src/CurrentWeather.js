import React from "react";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiSleet, WiStrongWind, WiFog,
   WiCloudy, WiDayCloudy, WiNightAltPartlyCloudy, WiUmbrella,
 WiRaindrops, WiWindy } from 'weather-icons-react';




const CurrentWeather = props => {
  return (
    <React.Fragment>
    <div className= "todaysDetails" style={ {display: "inline-block"} }>
      <div className= "icon">
        <WiStrongWind size={24} color='#000' />
      </div>
      <div className="dailyTemp">
        <p className="currentTemp">99°</p>
        <p className= "hiLo temp">100°/78°</p>
      </div>
    </div>
    <div className= "currentWeatherDetails" style={ {display: "inline-block"} }>
      <ul>
        <li className= "currentWindSpeed">
          <WiWindy size={24} color='#000' />
        </li>
        <li className= "chanceOfPrecip"></li>
        <li className= "currentHumidity"></li>
      </ul>
    </div>
  </React.Fragment>

  );
};
export default CurrentWeather;
