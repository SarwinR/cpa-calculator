dict = {
  "year-1": {
    name: "Year 1",
    modules: {},
  },
};

if (localStorage.getItem("data") !== null) {
  dict = JSON.parse(localStorage.getItem("data"));
}

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

function buildYearNavUI() {
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
  dict[generateYearID(yearName)] = {
    name: yearName,
    modules: {},
  };

  buildYearNavUI();

  document.getElementById("year-new-name-field").value = "";
  document.getElementById("year-new-name-field").focus();
}

function setSelectedYear(year) {
  selectedYear = year;
  buildModulesUI();
  buildTableViewUI();
}

function generateYearID(name) {
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
function buildModulesUI() {
  var modules = document.getElementById("module-cards");
  modules.innerHTML = "";

  console.log(dict);

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
    cardHeaderPillsItem1Button.innerHTML =
      dict[selectedYear]["modules"][module]["name"];

    cardHeaderPillsItem1.appendChild(cardHeaderPillsItem1Button);

    var cardHeaderPillsItem2 = document.createElement("li");
    cardHeaderPillsItem2.setAttribute("class", "nav-item m-1");

    var cardHeaderPillsItem2Button = document.createElement("button");
    cardHeaderPillsItem2Button.setAttribute("type", "button");
    cardHeaderPillsItem2Button.setAttribute("class", "btn btn-outline-primary");
    cardHeaderPillsItem2Button.innerHTML = "+";
    cardHeaderPillsItem2Button.addEventListener("click", function (event) {
      addTest(module);
    });

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

    var br = document.createElement("br");
    modules.appendChild(br);
  }

  buildTestUI();
}

function addModule() {
  var moduleName = document.getElementById("module-new-name-field").value;
  dict[selectedYear]["modules"][generateYearID(moduleName)] = {
    name: moduleName,
    tests: {},
  };

  console.log(dict);

  buildModulesUI();
  buildTestUI();

  document.getElementById("module-new-name-field").value = "";
  document.getElementById("module-new-name-field").focus();
}

function buildTestUI() {
  for (const module in dict[selectedYear]["modules"]) {
    var accordion = document.getElementById(module + "-accordion");
    accordion.innerHTML = "";

    for (const test in dict[selectedYear]["modules"][module]["tests"]) {
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
      accordionHeader.appendChild(accordionButton);

      var testName = document.createElement("p");
      testName.setAttribute("class", "m-0");
      testName.setAttribute("id", module + "-" + test + "-name");
      testName.innerHTML =
        dict[selectedYear]["modules"][module]["tests"][test]["name"];
      accordionButton.appendChild(testName);

      var percentage =
        dict[selectedYear]["modules"][module]["tests"][test]["marks"] /
        dict[selectedYear]["modules"][module]["tests"][test]["max_marks"];

      var span = document.createElement("span");
      span.setAttribute("id", module + "-" + test + "-percentage-span");
      span.setAttribute(
        "class",
        "badge text-bg-" + getColorFromMark(percentage) + " ms-2"
      );

      span.innerHTML =
        Math.round(
          percentage *
            dict[selectedYear]["modules"][module]["tests"][test][
              "percentage_accounted_for"
            ] *
            100
        ) /
          100 +
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
      input1.addEventListener("change", function (event) {
        updateTestData(
          module,
          test,
          "marks",
          document.getElementById(module + "-" + test + "-actual-mark-input")
            .value
        );
      });
      inputGroup1.appendChild(input1);

      var span1 = document.createElement("span");
      span1.setAttribute("id", module + "-" + test + "-actual-mark-span");
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
      input2.addEventListener("change", function (event) {
        updateTestData(
          module,
          test,
          "max_marks",
          document.getElementById(module + "-" + test + "-max-mark-input").value
        );
      });
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
      input3.addEventListener("change", function (event) {
        updateTestData(
          module,
          test,
          "percentage_accounted_for",
          document.getElementById(module + "-" + test + "-percentage-input")
            .value
        );
      });
      inputGroup2.appendChild(input3);

      var span2 = document.createElement("span");
      span2.setAttribute("class", "input-group-text");
      span2.innerHTML = "%";
      inputGroup2.appendChild(span2);

      var form2 = document.createElement("form");
      accordionBody.appendChild(form2);
      form2.addEventListener("submit", function (event) {
        event.preventDefault();
      });

      var inputGroup3 = document.createElement("div");
      inputGroup3.setAttribute("class", "input-group p-2");
      form2.appendChild(inputGroup3);

      var inputGroupText4 = document.createElement("span");
      inputGroupText4.setAttribute("class", "input-group-text");
      inputGroupText4.innerHTML = "Title";
      inputGroup3.appendChild(inputGroupText4);

      var input4 = document.createElement("input");
      input4.setAttribute("id", module + "-" + test + "-title-input");
      input4.setAttribute("type", "text");
      input4.setAttribute("class", "form-control");
      input4.setAttribute(
        "value",
        dict[selectedYear]["modules"][module]["tests"][test]["name"]
      );
      input4.addEventListener("change", function (event) {
        updateTestName(
          module,
          test,
          document.getElementById(module + "-" + test + "-title-input").value
        );
      });

      inputGroup3.appendChild(input4);

      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-outline-danger m-3");
      button.innerHTML =
        "Delete " +
        dict[selectedYear]["modules"][module]["tests"][test]["name"];
      button.addEventListener("click", function (event) {
        deleteTest(module, test);
      });
      accordionBody.appendChild(button);
    }

    if (
      Object.keys(dict[selectedYear]["modules"][module]["tests"]).length === 0
    ) {
      var card = document.createElement("div");
      card.setAttribute("class", "card text-center");
      card.setAttribute("id", "no-tests");

      var cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");

      var cardBodyText = document.createElement("p");
      cardBodyText.setAttribute("class", "card-text");
      cardBodyText.innerHTML = "No tests yet. Add a test to get started.";

      cardBody.appendChild(cardBodyText);

      card.appendChild(cardBody);

      accordion.appendChild(card);
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

function updateTestData(module, test, key, value) {
  // convert value to number
  value = Number(value);
  dict[selectedYear]["modules"][module]["tests"][test][key] = value;
  updateTestUI(module, test);
  buildTableViewUI();
}

function updateTestName(module, test, name) {
  dict[selectedYear]["modules"][module]["tests"][test]["name"] = name;
  updateTestUI(module, test);
}

function updateTestUI(module, test) {
  var percentage =
    dict[selectedYear]["modules"][module]["tests"][test]["marks"] /
    dict[selectedYear]["modules"][module]["tests"][test]["max_marks"];

  document.getElementById(module + "-" + test + "-percentage-span").innerText =
    Math.round(
      percentage *
        dict[selectedYear]["modules"][module]["tests"][test][
          "percentage_accounted_for"
        ] *
        100
    ) /
      100 +
    "/" +
    dict[selectedYear]["modules"][module]["tests"][test][
      "percentage_accounted_for"
    ];

  document.getElementById(module + "-" + test + "-actual-mark-span").innerText =
    Math.round(percentage * 100) + "%";

  document.getElementById(module + "-" + test + "-name").innerText =
    dict[selectedYear]["modules"][module]["tests"][test]["name"];
}

function generateTestName(module) {
  return (
    "Test_" +
    (Object.keys(dict[selectedYear]["modules"][module]["tests"]).length + 1)
  );
}

function generateTestID(name) {
  var id = name.replace(/ /g, "-").toLowerCase();
  if (id in dict[selectedYear]["modules"][module]["tests"]) {
    id = id + "-o";
  }

  while (id in dict[selectedYear]["modules"][module]["tests"]) {
    id = id + "o";
  }

  return id;
}

function addTest(module) {
  var name = generateTestName(module);
  dict[selectedYear]["modules"][module]["tests"][name] = {
    name: generateTestName(module),
    max_marks: 0,
    marks: 0,
    percentage_accounted_for: 0,
  };

  buildTestUI();
  buildTableViewUI();
}

function deleteTest(module, test) {
  delete dict[selectedYear]["modules"][module]["tests"][test];
  buildTestUI();
  buildTableViewUI();
}

// table view
// columns: module, col for each test, total
// rows: for each module

function buildTableViewUI() {
  var table = document.getElementById("table-view");
  table.innerHTML = "";

  if (Object.keys(dict[selectedYear]["modules"]).length === 0) {
    var br = document.createElement("br");
    table.appendChild(br);

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

    table.appendChild(card);

    return;
  }

  columns = ["Modules"];
  // look for the module with the most tests
  var maxTests = 0;
  for (const module in dict[selectedYear]["modules"]) {
    if (
      Object.keys(dict[selectedYear]["modules"][module]["tests"]).length >
      maxTests
    ) {
      maxTests = Object.keys(
        dict[selectedYear]["modules"][module]["tests"]
      ).length;
    }
  }

  for (var i = 0; i < maxTests; i++) {
    columns.push("Data " + (i + 1));
  }

  columns.push("Total");

  // build header
  var tableHead = document.createElement("thead");
  table.appendChild(tableHead);

  var tableHeadRow = document.createElement("tr");
  tableHead.appendChild(tableHeadRow);

  for (const column of columns) {
    var tableHeadColumn = document.createElement("th");
    tableHeadColumn.setAttribute("scope", "col");
    tableHeadColumn.innerHTML = column;
    tableHeadRow.appendChild(tableHeadColumn);
  }

  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  // build body - for each module (for module with not enough tests, set the value to "-")
  for (const module in dict[selectedYear]["modules"]) {
    // for each module, create a row
    var tableBodyRow = document.createElement("tr");
    tableBody.appendChild(tableBodyRow);

    // create a column for the module name
    var tableBodyColumn = document.createElement("th");
    tableBodyColumn.setAttribute("scope", "row");
    tableBodyColumn.innerHTML = dict[selectedYear]["modules"][module]["name"];
    tableBodyRow.appendChild(tableBodyColumn);

    // for each test, create a column
    for (const test in dict[selectedYear]["modules"][module]["tests"]) {
      var tableBodyColumn = document.createElement("td");

      var percentage =
        dict[selectedYear]["modules"][module]["tests"][test]["marks"] /
        dict[selectedYear]["modules"][module]["tests"][test]["max_marks"];
      tableBodyColumn.innerHTML = `
        <span class="badge bg-primary rounded-pill">
          ${
            Math.round(
              percentage *
                dict[selectedYear]["modules"][module]["tests"][test][
                  "percentage_accounted_for"
                ] *
                100
            ) / 100
          }/${
        dict[selectedYear]["modules"][module]["tests"][test][
          "percentage_accounted_for"
        ]
      }
        </span>
      `;
      tableBodyRow.appendChild(tableBodyColumn);
    }
    // for each test that is missing, create a column with "-"
    for (
      var i = 0;
      i <
      maxTests -
        Object.keys(dict[selectedYear]["modules"][module]["tests"]).length;
      i++
    ) {
      var tableBodyColumn = document.createElement("td");
      tableBodyColumn.innerHTML = `
        <span class="badge bg-secondary rounded-pill ">
          - 
        </span>
      `;
      tableBodyRow.appendChild(tableBodyColumn);
    }

    // create a column for the total
    var tableBodyColumn = document.createElement("td");

    // total is sum of all the percentages of the tests
    var total = 0;
    var maxTotal = 0;
    for (const test in dict[selectedYear]["modules"][module]["tests"]) {
      total +=
        (dict[selectedYear]["modules"][module]["tests"][test]["marks"] /
          dict[selectedYear]["modules"][module]["tests"][test]["max_marks"]) *
        dict[selectedYear]["modules"][module]["tests"][test][
          "percentage_accounted_for"
        ];
      maxTotal +=
        dict[selectedYear]["modules"][module]["tests"][test][
          "percentage_accounted_for"
        ];
    }

    tableBodyColumn.innerHTML = `
      <span class="badge bg-primary rounded-pill">
        ${Math.round(total * 100) / 100}/${maxTotal}
      </span> 
    `;

    tableBodyRow.appendChild(tableBodyColumn);
  }
}

buildYearNavUI();
buildModulesUI();
buildTestUI();
buildTableViewUI();

function downloadJSON() {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(dict, null, 2));

  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "data.json");

  dlAnchorElem.click();
  dlAnchorElem.remove();
}

function downloadCSV() {
  var csv = "Year,Module,Test,Max Marks,Marks,Percentage Accounted For\n";

  for (const year in dict) {
    for (const module in dict[year]["modules"]) {
      for (const test in dict[year]["modules"][module]["tests"]) {
        csv += `${dict[year]["name"]},${dict[year]["modules"][module]["name"]},${dict[year]["modules"][module]["tests"][test]["name"]},${dict[year]["modules"][module]["tests"][test]["max_marks"]},${dict[year]["modules"][module]["tests"][test]["marks"]},${dict[year]["modules"][module]["tests"][test]["percentage_accounted_for"]}\n`;
      }
    }
  }

  var dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);

  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "data.csv");

  dlAnchorElem.click();
  dlAnchorElem.remove();
}

function uploadJSON() {
  try {
    var file = document.getElementById("json-upload-input").files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      // try to parse the json
      try {
        dict = JSON.parse(event.target.result);
      } catch (error) {
        alert("Invalid JSON file");
        return;
      }

      selectedYear = Object.keys(dict)[0];

      buildYearNavUI();
      buildModulesUI();
      buildTestUI();
      buildTableViewUI();

      var modal = bootstrap.Modal.getInstance(
        document.getElementById("upload-data-modal")
      );
      modal.hide();
    };
    reader.readAsText(file);
  } catch (error) {
    alert("Please select a file");
    return;
  }
}

function saveDataToLocalStorage() {
  localStorage.setItem("data", JSON.stringify(dict));
}
