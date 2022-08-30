function kelvinToUnit(temperature, unit) {
  if (unit === "C") {
    return `${(temperature - 273.15).toFixed(2)} C`;
  }
  return `${(1.8 * (temperature - 273.15) + 32).toFixed(2)} F`;
}

function fixTimezone(timezone) {
  if (timezone > 0) {
    return `GMT +${timezone / 3600}`;
  }
  return `GMT ${timezone / 3600}`;
}

// eslint-disable-next-line import/prefer-default-export
export function filterData(data, unit, i = 0) {
  const weather = {};
  weather.Country = data.city.country;
  weather.City = data.city.name;
  weather.Timezone = fixTimezone(data.city.timezone);
  weather.Temperature = kelvinToUnit(data.list[i].main.temp, unit);
  weather["Feels like"] = kelvinToUnit(data.list[i].main.feels_like, unit);
  weather.Weather = data.list[i].weather[0].main;
  weather.Description = data.list[i].weather[0].description;
  weather.Wind = `${data.list[i].wind.speed} km/h`;
  weather.Humidity = `${data.list[i].main.humidity}%`;
  weather.Pressure = `${data.list[i].main.pressure} mb`;
  weather.Time = `${data.list[i].dt_txt}`;
  return weather;
}