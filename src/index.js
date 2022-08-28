import "./style.css";

// 3600 units represent 1 timezone
function fixTimezone(timezone) {
  if (timezone > 0) {
    return `GMT +${timezone/3600}`;
  }
  return `GMT ${timezone/3600}`;
}

// unit obtain by a switch on/off button or whatever is called so just C and F 
// is fine
function kelvinToUnit(temperature, unit) {
  if (unit === 'C') {
    return `${(temperature - 273.15).toFixed(2)  } C`;
  }
  return `${(1.8 * (temperature - 273.15)+32).toFixed(2)} F`;
}


function filterData(data) {
  const weather = {};
  weather.country = data.sys.country;
  weather.locationName = data.name;
  weather.temperature = kelvinToUnit(data.main.temp, 'C');
  weather.wind = `${data.wind.speed} km/h`;
  weather.main = data.weather[0].main;
  weather.description = data.weather[0].description;
  weather.timezone = fixTimezone(data.timezone);
  weather.feelsLike = kelvinToUnit(data.main.feels_like, 'C');
  weather.humidity = `${data.main.humidity}%`;
  weather.pressure = `${data.main.pressure} mb`;
  return weather;
}

async function getData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e9e52e995ade7a3dae304cf614ceef7c`
  );
  const data = await response.json();
  return filterData(data);
}

const location = prompt('Enter city name');
const data = getData(location);
data.then((weather) => {
  console.log(weather);
});
