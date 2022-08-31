import { filterData, resetTable, getDate } from "./utility";
import { createDom, createOneTimeDom } from "./dom";

const form = document.querySelector("form");
const container = document.querySelector(".display");
const date = document.getElementById("date");
const utilityObj = {};

date.setAttribute("value", getDate());
date.setAttribute("min", getDate());

export default function changeBody(weather, unit = "C") {
  // initial setup
  const tempWeatherData = filterData(weather, unit, 0);
  form.style.display = "none";
  container.style.display = "flex";
  utilityObj.time = date.value;
  utilityObj.weather = weather;
  utilityObj.unit = unit;

  // necessary DOM
  createOneTimeDom(tempWeatherData);

  // only 40, 3 hour periods available;
  // filtered via utility object
  for (let i = 0; i < 40; i += 1) {
    const filteredWeatherData = filterData(weather, unit, i);
    if (filteredWeatherData.Time.substring(0, 10) === utilityObj.time) {
      createDom(filteredWeatherData, i);
    }
  }
}

// C - superior system
// F - inferiror system heh
const changeUnitBtn = document.querySelector(".changeUnit");
const btn = document.querySelector(".back");
changeUnitBtn.addEventListener("click", () => {
  resetTable();
  if (utilityObj.unit === "C") {
    changeBody(utilityObj.weather, "F");
  } else {
    changeBody(utilityObj.weather, "C");
  }
});
btn.addEventListener("click", () => {
  resetTable();
  changeUnitBtn.style.display = "none";
  btn.style.display = "none";
});

const left = document.querySelector(".left");
const right = document.querySelector(".right");
left.addEventListener("click", () => {
  date.stepDown();
  resetTable();
  changeBody(utilityObj.weather, utilityObj.unit);
});
right.addEventListener("click", () => {
  date.stepUp();
  resetTable();
  changeBody(utilityObj.weather, utilityObj.unit);
});
// date is picked manually from the calander, click doesn't work
date.addEventListener("click", (e) => {
  e.preventDefault();
});
