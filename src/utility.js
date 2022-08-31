function kelvinToUnit(temperature, unit) {
  if (unit === "C") {
    return `${(temperature - 273.15).toFixed(2)} C`;
  }
  return `${(1.8 * (temperature - 273.15) + 32).toFixed(2)} F`;
}

function kphToMph(speed, unit) {
  if (unit === "C") {
    return `${(speed * 0.62137119223733).toFixed(2)} KM/H`;
  }
  return `${(speed).toFixed(2)} MPH`;
}

function fixTimezone(timezone) {
  if (timezone > 0) {
    return `GMT +${timezone / 3600}`;
  }
  return `GMT ${timezone / 3600}`;
}

export function filterData(data, unit, i = 0) {
  const weather = {};
  weather.Country = data.city.country;
  weather.City = data.city.name;
  weather.Timezone = fixTimezone(data.city.timezone);
  weather.Temperature = kelvinToUnit(data.list[i].main.temp, unit);
  weather["Feels like"] = kelvinToUnit(data.list[i].main.feels_like, unit);
  weather.Weather = data.list[i].weather[0].main;
  weather.Description = data.list[i].weather[0].description;
  weather.Wind = kphToMph(data.list[i].wind.speed, unit);
  weather.Humidity = `${data.list[i].main.humidity}%`;
  weather.Pressure = `${data.list[i].main.pressure} mb`;
  weather.Time = `${data.list[i].dt_txt}`;
  return weather;
}

export function resetTable() {
  const form = document.querySelector("form");
  form.style.display = "initial";
  const ps = [
    ...document.querySelectorAll(".display p:not(.left):not(.right)"),
  ];
  ps.forEach((element) => {
    element.remove();
  });
  const card = [...document.querySelectorAll(".card")];
  card.forEach((element) => {
    element.remove();
  });
  const container = document.querySelector(".display");
  container.style.display = "none";
}

export function getDate() {
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