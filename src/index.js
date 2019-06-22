import React from "react";
import ReactDOM from "react-dom";
import CurrentWeather from "./CurrentWeather";

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
          let string = JSON.stringify(response.daily.data);
          let parsed = JSON.parse(string);
          let iconArray = parsed.map((item) => {
            return item.icon;
          });
          console.log(iconArray);
          console.log(parsed);
          console.log(response);
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
        <CurrentWeather />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
