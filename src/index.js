import "./style.css";
import changeBody from "./display";

async function getData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e9e52e995ade7a3dae304cf614ceef7c`
  );
  const data = await response.json();
  return data;
}

// This includes weather information for the next 30 days or so. It is better
async function getMoreData() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Ljubljana&appid=e9e52e995ade7a3dae304cf614ceef7c`
  );
  const data = await response.json();
  return data;
}

const submit = document.querySelector("button");
submit.addEventListener("click", () => {
  const input = document.getElementById("city").value;
  const data = getData(input);
  data
    .then((weatherData) => {
      if (weatherData.cod === "404") {
        throw new Error("404: not found");
      } else if (weatherData.cod === "400") {
        throw new Error("400: nothing to search");
      }
      changeBody(weatherData);
    })
    .catch((err) => {
      alert(err);
    });
});
