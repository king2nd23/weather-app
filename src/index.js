import React from "react";
import ReactDOM from "react-dom";
import CurrentWeather from "./CurrentWeather";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiSleet, WiStrongWind, WiFog,
WiCloudy, WiDayCloudy, WiNightAltPartlyCloudy, WiUmbrella,WiRaindrops, WiWindy}
from 'weather-icons-react';
import LoadingScreen from "./LoadingScreen";

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
    summary: null,
    city: null
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
      let apiCall = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c2f9808ca1a73ccc2367f463c969facc/${
        this.state.lat
      },${this.state.long}`;
      return apiCall;
    };
    //googlemaps api key AIzaSyDBbNeVUJg3BVLIi7_lr7xGciYsh7MDNlc
    let geoCode = () => {
      let getGeoCode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=
      ${this.state.lat},${this.state.long}&key=AIzaSyDBbNeVUJg3BVLIi7_lr7xGciYsh7MDNlc`;
      return getGeoCode;
    }

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
          this.setState({ chanceOfRain: Math.round(currentWeather.precipProbability * 100) });
          this.setState({ currentHumidity: Math.round(currentWeather.humidity * 100)});
          this.setState({ currentTemp: Math.round(currentWeather.temperature) });
          this.setState({ highTemp: Math.round(response.daily.data[0].temperatureHigh) });
          this.setState({ lowTemp: Math.round(response.daily.data[0].temperatureLow) });
          this.setState({ summary: currentWeather.summary });
        })
        .catch(error => console.log(error));
    };

    //gets the user's city using reverse geocoding from Google Maps API
    let getCityState = async url => {
      fetch(url)
        .then(res => res.json())
        .then(response =>{
          this.setState({ city: response.results[5].address_components[1].long_name });
        })
    }

    //runs the apiURL(), apiResponse(), and getCityState()
    const weatherComponents = async () => {
      apiURL();
      await geoCode();
      await apiResponse(apiURL());
      // await console.log(getCityState(geoCode()));
      await getCityState(geoCode())
    };

    //using setTimeout to wait for geolocation until I find a more efficient way
    function getWeather() {
      setTimeout(() => {
        weatherComponents();
      }, 7000);
    }
    getWeather();
  }

  renderContent() {
    if (this.state.errormsg && !this.state.lat) {
      return <div>{this.state.errormsg}</div>
    }

    if (!this.state.error && this.state.city) {
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
            city={this.state.city}
          />
        </div>
      )
    }
    return <LoadingScreen />
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
