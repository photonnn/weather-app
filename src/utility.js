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
export function filterData(data, unit) {
  const weather = {};
  weather.Country = data.sys.country;
  weather.City = data.name;
  weather.Timezone = fixTimezone(data.timezone);
  weather.Temperature = kelvinToUnit(data.main.temp, unit);
  weather["Feels like"] = kelvinToUnit(data.main.feels_like, unit);
  weather.Weather = data.weather[0].main;
  weather.Description = data.weather[0].description;
  weather.Wind = `${data.wind.speed} km/h`;
  weather.Humidity = `${data.main.humidity}%`;
  weather.Pressure = `${data.main.pressure} mb`;
  return weather;
}