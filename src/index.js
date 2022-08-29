import "./style.css";
import changeBody from "./display";

// 3600 units represent 1 timezone
function fixTimezone(timezone) {
  if (timezone > 0) {
    return `GMT +${timezone / 3600}`;
  }
  return `GMT ${timezone / 3600}`;
}

// unit obtain by a switch on/off button or whatever is called so just C and F
// is fine
function kelvinToUnit(temperature, unit) {
  if (unit === "C") {
    return `${(temperature - 273.15).toFixed(2)} C`;
  }
  return `${(1.8 * (temperature - 273.15) + 32).toFixed(2)} F`;
}

function filterData(data) {
  const weather = {};
  weather.Country = data.sys.country;
  weather.City = data.name;
  weather.Timezone = fixTimezone(data.timezone);
  weather.Temperature = kelvinToUnit(data.main.temp, "C");
  weather["Feels like"] = kelvinToUnit(data.main.feels_like, "C");
  weather.Weather = data.weather[0].main;
  weather.Description = data.weather[0].description;
  weather.Wind = `${data.wind.speed} km/h`;
  weather.Humidity = `${data.main.humidity}%`;
  weather.Pressure = `${data.main.pressure} mb`;
  return weather;
}

async function getData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e9e52e995ade7a3dae304cf614ceef7c`
  );
  const data = await response.json();
  return filterData(data);
}

async function getMoreData() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Ljubljana&appid=e9e52e995ade7a3dae304cf614ceef7c`
  );
  const data = await response.json();
  return data;
}

/* const location = prompt('Enter city name');
const data = getData(location);
data.then((weather) => {
  console.log(weather);
}); */
const submit = document.querySelector("button");
submit.addEventListener("click", () => {
  let input = document.getElementById("city").value;
  try {
    const data = getData(input);
    data.then((weather) => {
      input = "";
      changeBody(weather);
    });
  } catch (e) {
    alert("ERROR", e);
  }
});

console.log(getMoreData());