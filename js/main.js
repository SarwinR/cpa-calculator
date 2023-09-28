dict = {
  year1: {
    name: "year_ID",
    modules: {
      module_ID: {
        name: "module_NAME",
        tests: {
          test_ID: {
            name: "test_NAME",
            max_marks: 100,
            marks: 90,
            percentage_accounted_for: 10,
          },
        },
      },
      COMS: {},
    },
  },

  year2: {
    name: "year 2",
    modules: {
      DSA: {},
      OOSD: {},
    },
  },
};

var modules = document.getElementById("module-cards");
var selectedYear = Object.keys(dict)[0];

year_navigation = document.getElementById("year-nav");

const addYearForm = document.getElementById("add-year-form");
addYearForm.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent default form submission behavior
  addYear(); // call your function to handle form submission

  var modal = bootstrap.Modal.getInstance(
    document.getElementById("input-year-modal")
  );
  modal.hide();
});

const addModuleForm = document.getElementById("add-module-form");
addModuleForm.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent default form submission behavior
  addModule(); // call your function to handle form submission

  var modal = bootstrap.Modal.getInstance(
    document.getElementById("input-module-modal")
  );
  modal.hide();
});

// YEAR NAVIGATION

function updateYearNavUI() {
  year_navigation.innerHTML = "";

  for (const year in dict) {
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
}

function addYear() {
  var yearName = document.getElementById("year-new-name-field").value;
  dict[generateID(yearName)] = {
    name: yearName,
    modules: {},
  };

  updateYearNavUI();

  document.getElementById("year-new-name-field").value = "";
  document.getElementById("year-new-name-field").focus();
}

function setSelectedYear(year) {
  selectedYear = year;
  updateModulesUI();
}

function generateID(name) {
  var id = name.replace(/ /g, "-").toLowerCase();
  if (id in dict) {
    id = id + "-o";
  }

  while (id in dict) {
    id = id + "o";
  }

  return id;
}

// MODULES UI
function updateModulesUI() {
  var modules = document.getElementById("module-cards");
  modules.innerHTML = "";

  for (const module in dict[selectedYear]["modules"]) {
    var card = document.createElement("div");
    card.setAttribute("class", "card text-center");
    card.setAttribute("id", module);

    var cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");

    var cardHeaderPills = document.createElement("ul");
    cardHeaderPills.setAttribute(
      "class",
      "nav nav-pills card-header-pills d-flex justify-content-between align-middle"
    );

    var cardHeaderPillsItem1 = document.createElement("li");
    cardHeaderPillsItem1.setAttribute("class", "nav-item m-1");

    var cardHeaderPillsItem1Button = document.createElement("button");
    cardHeaderPillsItem1Button.setAttribute("type", "button");
    cardHeaderPillsItem1Button.setAttribute("class", "btn btn-outline-primary");
    cardHeaderPillsItem1Button.innerHTML = module;

    cardHeaderPillsItem1.appendChild(cardHeaderPillsItem1Button);

    var cardHeaderPillsItem2 = document.createElement("li");
    cardHeaderPillsItem2.setAttribute("class", "nav-item m-1");

    var cardHeaderPillsItem2Button = document.createElement("button");
    cardHeaderPillsItem2Button.setAttribute("type", "button");
    cardHeaderPillsItem2Button.setAttribute("class", "btn btn-outline-primary");
    cardHeaderPillsItem2Button.innerHTML = "+";

    cardHeaderPillsItem2.appendChild(cardHeaderPillsItem2Button);

    cardHeaderPills.appendChild(cardHeaderPillsItem1);
    cardHeaderPills.appendChild(cardHeaderPillsItem2);

    cardHeader.appendChild(cardHeaderPills);

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var accordion = document.createElement("div");
    accordion.setAttribute("class", "accordion");
    accordion.setAttribute("id", module + "-accordion");

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardBody.appendChild(accordion);

    modules.appendChild(card);

    var br = document.createElement("br");
    modules.appendChild(br);
  }

  // if dict[selectedYear]["modules"] is empty then show a message
  if (Object.keys(dict[selectedYear]["modules"]).length === 0) {
    var card = document.createElement("div");
    card.setAttribute("class", "card text-center");
    card.setAttribute("id", "no-modules");

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var cardBodyText = document.createElement("p");
    cardBodyText.setAttribute("class", "card-text");
    cardBodyText.innerHTML = "No modules yet. Add a module to get started.";

    cardBody.appendChild(cardBodyText);

    card.appendChild(cardBody);

    modules.appendChild(card);
  }
}

function addModule() {
  var moduleName = document.getElementById("module-new-name-field").value;
  dict[selectedYear]["modules"][generateID(moduleName)] = {
    name: moduleName,
  };

  console.log(dict);

  updateModulesUI();
  updateTestUI();

  document.getElementById("module-new-name-field").value = "";
  document.getElementById("module-new-name-field").focus();
}

function updateTestUI() {
  for (const module in dict[selectedYear]["modules"]) {
    var accordion = document.getElementById(module + "-accordion");

    for (const test in dict[selectedYear]["modules"][module]["tests"]) {
      console.log(test);

      var accordionItem = document.createElement("div");
      accordionItem.setAttribute("class", "accordion-item");
      accordion.appendChild(accordionItem);

      var accordionHeader = document.createElement("h2");
      accordionHeader.setAttribute("class", "accordion-header");
      accordionItem.appendChild(accordionHeader);

      var accordionButton = document.createElement("button");
      accordionButton.setAttribute("class", "accordion-button collapsed");
      accordionButton.setAttribute("type", "button");
      accordionButton.setAttribute("data-bs-toggle", "collapse");
      accordionButton.setAttribute(
        "data-bs-target",
        "#" + module + "-" + test + "-collapse"
      );
      accordionButton.setAttribute("aria-expanded", "false");
      accordionButton.setAttribute(
        "aria-controls",
        module + "-" + test + "-collapse"
      );
      accordionButton.innerHTML =
        dict[selectedYear]["modules"][module]["tests"][test]["name"];
      accordionHeader.appendChild(accordionButton);

      var percentage =
        dict[selectedYear]["modules"][module]["tests"][test]["marks"] /
        dict[selectedYear]["modules"][module]["tests"][test]["max_marks"];

      var span = document.createElement("span");
      span.setAttribute(
        "class",
        "badge text-bg-" + getColorFromMark(percentage) + " ms-2"
      );
      span.innerHTML =
        percentage *
          dict[selectedYear]["modules"][module]["tests"][test][
            "percentage_accounted_for"
          ] +
        "/" +
        dict[selectedYear]["modules"][module]["tests"][test][
          "percentage_accounted_for"
        ];
      accordionButton.appendChild(span);

      var accordionCollapse = document.createElement("div");
      accordionCollapse.setAttribute("id", module + "-" + test + "-collapse");
      accordionCollapse.setAttribute("class", "accordion-collapse collapse");
      accordionCollapse.setAttribute(
        "data-bs-parent",
        "#" + module + "-accordion"
      );
      accordionItem.appendChild(accordionCollapse);

      var accordionBody = document.createElement("div");
      accordionBody.setAttribute("class", "accordion-body");
      accordionCollapse.appendChild(accordionBody);

      var form = document.createElement("form");
      accordionBody.appendChild(form);

      var dFlex = document.createElement("div");
      dFlex.setAttribute("class", "d-flex p-2");
      form.appendChild(dFlex);

      var inputGroup1 = document.createElement("div");
      inputGroup1.setAttribute("class", "input-group mb-3");
      dFlex.appendChild(inputGroup1);

      var inputGroupText1 = document.createElement("span");
      inputGroupText1.setAttribute("class", "input-group-text");
      inputGroupText1.innerHTML = "Mark";
      inputGroup1.appendChild(inputGroupText1);

      var input1 = document.createElement("input");
      input1.setAttribute("id", module + "-" + test + "-actual-mark-input");
      input1.setAttribute("type", "number");
      input1.setAttribute(
        "value",
        dict[selectedYear]["modules"][module]["tests"][test]["marks"]
      );
      input1.setAttribute("class", "form-control");
      inputGroup1.appendChild(input1);

      var span1 = document.createElement("span");
      span1.setAttribute(
        "class",
        "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary z-1"
      );
      span1.innerHTML = percentage * 100 + "%";
      inputGroup1.appendChild(span1);

      var inputGroupText2 = document.createElement("span");
      inputGroupText2.setAttribute("class", "input-group-text");
      inputGroupText2.innerHTML = "/";
      inputGroup1.appendChild(inputGroupText2);

      var input2 = document.createElement("input");
      input2.setAttribute("id", module + "-" + test + "-max-mark-input");
      input2.setAttribute("type", "number");
      input2.setAttribute(
        "value",
        dict[selectedYear]["modules"][module]["tests"][test]["max_marks"]
      );
      input2.setAttribute("class", "form-control");
      inputGroup1.appendChild(input2);

      var inputGroup2 = document.createElement("div");
      inputGroup2.setAttribute("class", "input-group mb-3 ps-4");
      dFlex.appendChild(inputGroup2);

      var inputGroupText3 = document.createElement("span");
      inputGroupText3.setAttribute("class", "input-group-text");
      inputGroupText3.innerHTML = "Percentage";
      inputGroup2.appendChild(inputGroupText3);

      var input3 = document.createElement("input");
      input3.setAttribute("id", module + "-" + test + "-percentage-input");
      input3.setAttribute("type", "number");
      input3.setAttribute(
        "value",
        dict[selectedYear]["modules"][module]["tests"][test][
          "percentage_accounted_for"
        ]
      );
      input3.setAttribute("class", "form-control");
      inputGroup2.appendChild(input3);

      var span2 = document.createElement("span");
      span2.setAttribute("class", "input-group-text");
      span2.innerHTML = "%";
      inputGroup2.appendChild(span2);

      var form2 = document.createElement("form");
      accordionBody.appendChild(form2);

      var inputGroup3 = document.createElement("div");
      inputGroup3.setAttribute("class", "input-group p-2");
      form2.appendChild(inputGroup3);

      var inputGroupText4 = document.createElement("span");
      inputGroupText4.setAttribute("class", "input-group-text");
      inputGroupText4.innerHTML = "Title";
      inputGroup3.appendChild(inputGroupText4);

      var input4 = document.createElement("input");
      input4.setAttribute("type", "text");
      input4.setAttribute("class", "form-control");
      input4.setAttribute(
        "value",
        dict[selectedYear]["modules"][module]["tests"][test]["name"]
      );
      inputGroup3.appendChild(input4);

      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-outline-danger m-3");
      button.innerHTML =
        "Delete " +
        dict[selectedYear]["modules"][module]["tests"][test]["name"];
      accordionBody.appendChild(button);
    }
  }
}

function getColorFromMark(mark) {
  console.log(mark);

  if (mark < 0.4) {
    return "danger";
  }

  if (mark < 0.7) {
    return "warning";
  }

  return "success";
}

updateYearNavUI();
updateModulesUI();
updateTestUI();
