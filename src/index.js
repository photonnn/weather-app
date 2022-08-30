import "./style.css";
import changeBody from "./display";
import { filterData } from "./utility";

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
  try {
    const data = getData(input);
    data.then((weatherData) => {
      changeBody(weatherData);
    });
  } catch (e) {
    alert("ERROR", e);
  }
});
