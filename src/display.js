import { filterData } from "./utility";

const form = document.querySelector("form");
const container = document.querySelector(".display");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const cards = document.querySelector(".cards");
const date = document.getElementById("date");

const utilityObj = {
  listeners: false,
};

function getDate() {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
}

date.setAttribute("value", getDate());
date.setAttribute("min", getDate());

function resetTable() {
  form.style.display = "initial";
  const changeUnitBtn = document.querySelector(".changeUnit");
  const btn = document.querySelector(".back");
  const ps = [...document.querySelectorAll(".display p:not(.left):not(.right)")];
  ps.forEach((element) => {
    element.remove();
  });
  const card = [...document.querySelectorAll(".card")];
  card.forEach((element) => {
    element.remove();
  });
  container.style.display = "none";
  btn.remove();
  changeUnitBtn.remove();
}

export default function changeBody(weather, unit = "C") {
  const tempWeatherData = filterData(weather, unit, 0);
  form.style.display = "none";
  container.style.display = "flex";
  utilityObj.time = date.value;

  const city = document.createElement("p");
  const countryCode = document.createElement("p");
  const timezone = document.createElement("p");
  city.textContent = tempWeatherData.City;
  countryCode.textContent = tempWeatherData.Country;
  timezone.textContent = tempWeatherData.Timezone;
  header.append(city, countryCode, timezone);

  for (let i = 0; i < 40; i += 1) {
    const filteredWeatherData = filterData(weather, unit, i);

    if (filteredWeatherData.Time.substring(0, 10) === utilityObj.time) {
      const temp = document.createElement("p");
      const wind = document.createElement("p");
      const main = document.createElement("p");
      const description = document.createElement("p");
      const humidity = document.createElement("p");
      const pressure = document.createElement("p");
      const time = document.createElement("p");

      temp.textContent = `Temp: ${filteredWeatherData.Temperature}`;
      wind.textContent = `Wind: ${filteredWeatherData.Wind}`;
      main.textContent = `${filteredWeatherData.Weather}`;
      description.textContent = `${filteredWeatherData.Description}`;
      humidity.textContent = `Hu: ${filteredWeatherData.Humidity}`;
      pressure.textContent = `Pr: ${filteredWeatherData.Pressure}`;
      time.textContent = `${filteredWeatherData.Time}`;

      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("id", i);

      const cardRow1 = document.createElement("div");
      const cardRow2 = document.createElement("div");
      const cardRow3 = document.createElement("div");
      const cardRow4 = document.createElement("div");
      cardRow1.classList.add("cardRow1");
      cardRow2.classList.add("cardRow2");
      cardRow3.classList.add("cardRow3");
      cardRow4.classList.add("cardRow4");

      card.append(cardRow1, cardRow2, cardRow3, cardRow4);

      cardRow1.appendChild(time);
      cardRow2.append(temp, wind);
      cardRow3.append(main, description);
      cardRow4.append(humidity, pressure);

      cards.appendChild(card);

      // for table
      /*
  Object.keys(filteredWeatherData).forEach((element) => {
    const tr = document.createElement("tr");
    tr.appendChild(getTh(element));
    temp += filteredWeatherData.Temperature;
  }); */
    }
  } 

  const changeUnitBtn = document.createElement("button");
  changeUnitBtn.classList.add("changeUnit");
  changeUnitBtn.textContent = "C/F";
  footer.appendChild(changeUnitBtn);

  const btn = document.createElement("button");
  btn.classList.add("back");
  btn.textContent = "Back";
  footer.appendChild(btn);

  btn.addEventListener("click", () => {
    resetTable();
  });

  changeUnitBtn.addEventListener("click", function listener() {
    resetTable();
    if (unit === "C") {
      changeBody(weather, "F");
    } else {
      changeBody(weather, "C");
    }
    this.removeEventListener("click", listener);
  });

  if (!utilityObj.listeners) {
    setupListeners(weather, unit);
  }
  utilityObj.listeners = true;

}

function setupListeners(weather, unit) {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  left.addEventListener("click", () => {
    date.stepDown();
    resetTable();
    changeBody(weather, unit);
  });
  right.addEventListener("click", () => {
    date.stepUp();
    resetTable();
    changeBody(weather, unit);
  });
  // date is picked manually from the calander, click doesn't work
  date.addEventListener("change", (e) => {
    e.preventDefault();
  });
}
