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
          //info for weekly weather forecase
          let dailyString = JSON.stringify(response.daily.data);
          let dailyParsed = JSON.parse(dailyString);
          let iconArray = dailyParsed.map((item) => {
            return item.icon;
          });
          //info for current weather conditions
          let currentString = JSON.stringify(response.currently);
          let currentParsed = JSON.parse(currentString);
          // let currentIcon = currentParsed.map((item) => {
          //   return item.icon;
          // })
          console.log(iconArray);
          console.log(response);
          console.log(currentParsed);
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
        <CurrentWeather icon=""/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
