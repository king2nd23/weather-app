import React from "react";
import ReactDOM from "react-dom";
import CurrentWeather from "./CurrentWeather";
import WeatherIcons from "react-weathericons";

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
    humidity: null
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
          this.setState({ currentWind: currentWeather.windSpeed });
          this.setState({ chanceOfRain: currentWeather.precipProbability });
          this.setState({ currentHumidity: currentWeather.humidity });
          this.setState({ currentIcon: currentWeather.icon });
          this.setState({ currentTemp: currentWeather.apparentTemperature });
          this.setState({ highTemp: response.daily.data[0].temperatureHigh });
          this.setState({ lowTemp: response.daily.data[0].temperatureLow });
          console.log(currentWeather);
          console.log(response);
        })
        .catch(error => console.log(error));
    };

    const weatherComponents = async () => {
      apiURL();
      await apiResponse(apiURL());
    };

    function getWeather() {
      setTimeout(() => {
        weatherComponents();
      }, 4000);
    }
    getWeather();
  }

  render() {
    return (
      <div>
        <CurrentWeather
          icon={this.state.currentIcon}
          currentTemp={this.state.currentTemp}
          high={this.state.highTemp}
          low={this.state.lowTemp}
          wind={this.state.currentWind}
          chanceOfRain={this.state.chanceOfRain}
          humidity={this.state.currentHumidity}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
