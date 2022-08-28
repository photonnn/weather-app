import "./style.css";

fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=e9e52e995ade7a3dae304cf614ceef7c')
.then((response) => response.json())
.then((data) => {
  console.log(data);
})
.catch((e) => {
  console.log(e);
});