import React from "react";
import ReactDOM from "react-dom";
import CurrentWeather from "./CurrentWeather";
import WeatherIcons from 'react-weathericons';

class App extends React.Component {
  state = { lat: null, long: null, errormsg: "" };

  componentDidMount() {
    const getPosition = () => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude
          });
        },
        error => this.setState({ errormsg: error.message })
      );
    };
    getPosition();

    const getWeatherData = () => {
      let apiCall = `https://api.darksky.net/forecast/c2f9808ca1a73ccc2367f463c969facc/${
        this.state.lat
      },${this.state.long}`;
      fetch(apiCall)
        .then(res => res.json())
        .then(response => {
          //get weekly weather forecast
          let dailyString = response.daily.data;
          let iconArray = dailyString.map((item) => {
            return item.icon;
          });
          //get current weather conditions
          let currentWeather = response.currently;
          let currentWind = currentWeather.windSpeed;
          let chanceOfRain = currentWeather.precipProbability;
          let currentHumidity = currentWeather.humidity;
          let currentIcon = currentWeather.icon;
          let currentTemp = currentWeather.apparentTemperature;
          //get high and low //
          let highTemp = response.daily.data[0].temperatureHigh;
          let lowTemp = response.daily.data[0].temperatureLow;
          console.log(currentWeather);
        })
        .catch(error => console.log(error));
      console.log(apiCall);
    };
    function getWeather() {
      setTimeout(() => {
        getWeatherData();
      }, 4000);
    }
    getWeather();
  }


  render() {
    return (
      <div>
        <CurrentWeather icon={this.currentIcon} currentTemp={this.currentTemp}
           high={this.highTemp} low={this.lowTemp} wind={this.currentWind}
           chanceOfRain={this.chanceOfRain} humidity= "currentHumidity" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
