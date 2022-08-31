const header = document.querySelector(".header");
const cards = document.querySelector(".cards");

export function createOneTimeDom(tempWeatherData) {
  const city = document.createElement("p");
  const countryCode = document.createElement("p");
  const timezone = document.createElement("p");
  city.textContent = tempWeatherData.City;
  countryCode.textContent = tempWeatherData.Country;
  timezone.textContent = tempWeatherData.Timezone;
  header.append(city, countryCode, timezone);

  const changeUnitBtn = document.querySelector(".changeUnit");
  const btn = document.querySelector(".back");
  changeUnitBtn.style.display = "flex";
  btn.style.display = "flex";
  /*
  const changeUnitBtn = document.createElement("button");
  changeUnitBtn.classList.add("changeUnit");
  changeUnitBtn.textContent = "Units";
  footer.appendChild(changeUnitBtn);

  const btn = document.createElement("button");
  btn.classList.add("back");
  btn.textContent = "Back";
  footer.appendChild(btn);  */
}

export function createDom(filteredWeatherData, i) {
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
}