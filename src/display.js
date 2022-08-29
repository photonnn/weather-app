function getTh(value) {
  const th = document.createElement("th");
  th.textContent = value;
  return th;
}

export default function changeBody(weather) {
  const body = document.querySelector("body");
  const form = document.querySelector("form");
  form.style.display = "none";

  const table = document.createElement("table");

  Object.keys(weather).forEach((element) => {
    const tr = document.createElement("tr");
    tr.appendChild(getTh(element));
    tr.appendChild(getTh(weather[element]));
    table.appendChild(tr);
  });

  const btn = document.createElement("button");
  btn.classList.add("back");
  btn.textContent = "Back";
  btn.addEventListener("click", () => {
    form.style.display = "initial";
    body.removeChild(table);
    body.removeChild(btn);
  });

  body.appendChild(table);
  body.appendChild(btn);
}
