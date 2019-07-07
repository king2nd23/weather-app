import React from "react";
import ReactDOM from "react-dom";
import CurrentWeather from "./CurrentWeather";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiSleet, WiStrongWind, WiFog,
WiCloudy, WiDayCloudy, WiNightAltPartlyCloudy, WiUmbrella,WiRaindrops, WiWindy}
from 'weather-icons-react';

//setting up initial state
class App extends React.Component {
  state = {
    lat: null,
    long: null,
    errormsg: "",
    icon: null,
    currentTemp: null,
    high: null,
    low: null,
    wind: null,
    chanceOfRain: null,
    humidity: null,
    summary: null
  };

  componentDidMount() {
    //get the user's current location
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

    //adds the latitude and longitude to the api request URL
    let apiURL = () => {
      let apiCall = `https://api.darksky.net/forecast/c2f9808ca1a73ccc2367f463c969facc/${
        this.state.lat
      },${this.state.long}`;
      return apiCall;
    };

    //fetches response from DarkSky API and sets up state for app components
    let apiResponse = async url => {
      fetch(url)
        .then(res => res.json())
        .then(response => {
          let currentWeather = response.currently;

          //setting the icon for current weather, the name of icons in the library does not match icon names given by the api
          this.setState({ icon: currentWeather.icon });
            if (this.state.icon === "clear-day") {
              this.setState({ icon:  <WiDaySunny size={200} color='#fff917' />})
              };
            if (this.state.icon === "clear-night") {
              this.setState({ icon:  <WiNightClear size={200} color='#000' />})
              };
            if (this.state.icon === "rain") {
              this.setState({ icon:  <WiRain size={200} color='#000' />})
              };
            if (this.state.icon === "snow") {
              this.setState({ icon:  <WiSnow size={200} color='#000' />})
              };
            if (this.state.icon === "sleet") {
              this.setState({ icon:  <WiSleet size={200} color='#000' />})
              };
            if (this.state.icon === "wind") {
              this.setState({ icon:  <WiStrongWind size={200} color='#000' />})
              };
            if (this.state.icon === "fog") {
              this.setState({ icon:  <WiFog size={200} color='#000' />})
              };
            if (this.state.icon === "cloudy") {
              this.setState({ icon:  <WiCloudy size={200} color='#000' />})
              };
            if (this.state.icon === "partly-cloudy-day") {
              this.setState({ icon:  <WiDayCloudy size={200} color='#000' />})
            };
            if (this.state.icon === "partly-cloudy-night") {
              this.setState({ icon:  <WiNightAltPartlyCloudy size={200} color='#000' />})
            };
          this.setState({ currentWind: Math.round(currentWeather.windSpeed) });
          this.setState({ chanceOfRain: Math.round(currentWeather.precipProbability) * 100 });
          this.setState({ currentHumidity: currentWeather.humidity * 100});
          this.setState({ currentTemp: Math.round(currentWeather.temperature) });
          this.setState({ highTemp: Math.round(response.daily.data[0].temperatureHigh) });
          this.setState({ lowTemp: Math.round(response.daily.data[0].temperatureLow) });
          this.setState({ summary: currentWeather.summary });
          console.log(currentWeather);
          console.log(response);
        })
        .catch(error => console.log(error));
    };

    //runs the apiURL() and the apiResponse()
    const weatherComponents = async () => {
      apiURL();
      await apiResponse(apiURL());
    };

    //using setTimeout to wait for geolocation until I find a more efficient way
    function getWeather() {
      setTimeout(() => {
        weatherComponents();
      }, 7000);
    }
    getWeather();
  }

  render() {
    return (
      <div>
        <CurrentWeather
          icon={this.state.icon}
          currentTemp={this.state.currentTemp}
          high={this.state.highTemp}
          low={this.state.lowTemp}
          wind={this.state.currentWind}
          chanceOfRain={this.state.chanceOfRain}
          humidity={this.state.currentHumidity}
          summary={this.state.summary}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
