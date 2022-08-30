import "./style.css";
import changeBody from "./display";

async function getLessData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e9e52e995ade7a3dae304cf614ceef7c`
  );
  const data = await response.json();
  return data;
}

async function getData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=e9e52e995ade7a3dae304cf614ceef7c`
  );
  const data = await response.json();
  return data;
}

const submit = document.querySelector("button");
submit.addEventListener("click", () => {
  const input = document.getElementById("city").value;
  const data = getData(input);
  data.then((weatherData) => {
    console.log(weatherData);
      if (weatherData.cod === "404") {
        throw new Error("404: not found");
      } else if (weatherData.cod === "400") {
        throw new Error("400: nothing to search");
      } else if (weatherData.cod === "200") {
      changeBody(weatherData);
      } else {
        throw new Error("Error, please report on https://github.com/photonnn/weather-app")
      }
    })
    .catch((err) => {
      alert(err);
  });
});
