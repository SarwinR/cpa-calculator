//<input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
//<label class="btn btn-outline-primary" for="btnradio1">year 1</label>

function buildYearNavItem(year) {
  var radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("class", "btn-check");
  radio.setAttribute("name", "btnradio");
  radio.setAttribute("id", "year-nav-" + year);
  radio.setAttribute("autocomplete", "off");

  if (year == selectedYear) {
    radio.setAttribute("checked", "checked");
  }

  radio.addEventListener("click", function (event) {
    setSelectedYear(year);
  });

  year_navigation.appendChild(radio);

  var label = document.createElement("label");
  label.setAttribute("class", "btn btn-outline-primary");
  label.setAttribute("for", "year-nav-" + year);
  label.innerHTML = dict[year]["name"];
  year_navigation.appendChild(label);
}
