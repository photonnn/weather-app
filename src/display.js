import { filterData } from "./utility";

const form = document.querySelector("form");
const body = document.querySelector("body");

function getTh(value) {
  const th = document.createElement("th");
  th.textContent = value;
  return th;
}

function resetTable() {
  form.style.display = "initial";
  const changeUnitBtn = document.querySelector(".changeUnit");
  const btn = document.querySelector(".back");
  const table = document.querySelector("table");
  table.remove();
  btn.remove();
  changeUnitBtn.remove();
}

export default function changeBody(weather, unit = "C") {
  const table = document.createElement("table");
  form.style.display = "none";

  const filteredWeatherData = filterData(weather, unit);

  // for table
  Object.keys(filteredWeatherData).forEach((element) => {
    const tr = document.createElement("tr");
    tr.appendChild(getTh(element));
    tr.appendChild(getTh(filteredWeatherData[element]));
    table.appendChild(tr);
  });

  const btn = document.createElement("button");
  btn.classList.add("back");
  btn.textContent = "Back";
  body.appendChild(table);
  body.appendChild(btn);

  const changeUnitBtn = document.createElement("button");
  changeUnitBtn.classList.add("changeUnit");
  changeUnitBtn.textContent = "C/F";
  body.appendChild(changeUnitBtn);

  btn.addEventListener("click", () => {
    resetTable();
  });
  
  // for switching temperature, probably should include mph as well -_-
  changeUnitBtn.addEventListener("click", function listener() {
    resetTable();
    if (unit === "C") {
      changeBody(weather, "F");
    } else {
      changeBody(weather, "C");
    }
    changeUnitBtn.removeEventListener("click", listener);
  });
}
