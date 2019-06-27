import React from "react";
import ReactDOM from "react-dom";
import CurrentWeather from "./CurrentWeather";
import WeatherIcons from 'react-weathericons';

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

/////////////working on async function//////////////////////////////////////////
let async1 = ()=> {
  let apiCall = `https://api.darksky.net/forecast/c2f9808ca1a73ccc2367f463c969facc/${
    this.state.lat
  },${this.state.long}`;
  return apiCall;
}

let async2 = async(url) => {
  fetch(url)
  .then(res => res.json())
  .then(response => {
        //get current weather conditions
        // let currentWeather = response.currently;
        // let currentWind = currentWeather.windSpeed;
        // let chanceOfRain = currentWeather.precipProbability;
        // let currentHumidity = currentWeather.humidity;
        // let currentIcon = currentWeather.icon;
        // let currentTemp = currentWeather.apparentTemperature;
        // //get high and low //
        // let highTemp = response.daily.data[0].temperatureHigh;
        // let lowTemp = response.daily.data[0].temperatureLow;
        let currentWeather = response.currently;
        this.setState({currentWind: currentWeather.windSpeed});
        this.setState({chanceOfRain: currentWeather.precipProbability});
        this.setState({currentHumidity: currentWeather.humidity});
        this.setState({currentIcon: currentWeather.icon});
        this.setState({currentTemp: currentWeather.apparentTemperature});
        this.setState({highTemp: response.daily.data[0].temperatureHigh});
        this.setState({lowTemp: response.daily.data[0].temperatureLow});
        console.log(currentWeather);
        console.log(response);
      })
      .catch(error => console.log(error))
}




let async3 = async(response) => {
}
const doManyThings = async () => {
  async1();
  console.log(async1());
  await async2(async1());
  // await async3();
  console.log(this.state);
};


function getWeather() {
    setTimeout(() => {
      doManyThings();
    }, 4000)
  }
  getWeather();


////////////working on aync function//////////////////////////////////////////
    // const getWeatherData = () => {
    //   let apiCall = `https://api.darksky.net/forecast/c2f9808ca1a73ccc2367f463c969facc/${
    //     this.state.lat
    //   },${this.state.long}`;
    //   fetch(apiCall)
        // .then(res => res.json())
        // .then(response => this.setState({
        //   //get current weather conditions
        //   currentWeather: response.currently,
        //   currentWind: currentWeather.windSpeed,
        //   chanceOfRain: currentWeather.precipProbability,
        //   currentHumidity: currentWeather.humidity,
        //   currentIcon: currentWeather.icon,
        //   currentTemp: currentWeather.apparentTemperature,
        //   //get high and low //
        //   highTemp: response.daily.data[0].temperatureHigh,
        //   lowTemp: response.daily.data[0].temperatureLow
        // })
    //
    //     .then(response => {
    //       //get weekly weather forecast
    //       let dailyString = response.daily.data;
    //       let iconArray = dailyString.map((item) => {
    //         return item.icon;
    //       });
    //       //get current weather conditions
    //       let currentWeather = response.currently;
    //       let currentWind = currentWeather.windSpeed;
    //       let chanceOfRain = currentWeather.precipProbability;
    //       let currentHumidity = currentWeather.humidity;
    //       let currentIcon = currentWeather.icon;
    //       let currentTemp = currentWeather.apparentTemperature;
    //       //get high and low //
    //       let highTemp = response.daily.data[0].temperatureHigh;
    //       let lowTemp = response.daily.data[0].temperatureLow;
    //       console.log(currentWeather);
    //       console.log(response);
    //     })
    //     .catch(error => console.log(error))
    // };
  }


  render() {
    return (
      <div>
        <CurrentWeather icon={this.state.currentIcon} currentTemp={this.state.currentTemp}
           high={this.state.highTemp} low={this.state.lowTemp} wind={this.state.currentWind}
           chanceOfRain={this.state.chanceOfRain} humidity={this.state.currentHumidity} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
