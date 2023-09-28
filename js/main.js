dict = {
    "year1": {
        name: "year_ID",
        modules: {
            "module_ID":{
                name: "module_NAME",
                "test_ID": {
                    "name": "test_NAME",
                    "max_marks": 100,
                    "marks": 50,
                    "percentage_accounted_for": 10,
                }
            },
            "COMS":{

            },
        }
    },

    "year2": {
        name: "year 2",
        modules: {
            "DSA":{
                
            },
            "OOSD":{

            },
        }
    }
};

var modules = document.getElementById("module-cards");
var selectedYear = Object.keys(dict)[0];



year_navigation = document.getElementById("year-nav");


const addYearForm = document.getElementById('add-year-form');
addYearForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent default form submission behavior
    addYear(); // call your function to handle form submission

    var modal = bootstrap.Modal.getInstance(document.getElementById('input-year-modal'));
    modal.hide();
});

const addModuleForm = document.getElementById('add-module-form');
addModuleForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent default form submission behavior
    addModule(); // call your function to handle form submission

    var modal = bootstrap.Modal.getInstance(document.getElementById('input-module-modal'));
    modal.hide();
});


// YEAR NAVIGATION

function updateYearNavUI(){
    //<input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
    //<label class="btn btn-outline-primary" for="btnradio1">year 1</label>
    
    year_navigation.innerHTML = "";
    
    for (const year in dict) {
        var radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("class", "btn-check");
        radio.setAttribute("name", "btnradio");
        radio.setAttribute("id", "year-nav-" + year);
        radio.setAttribute("autocomplete", "off");
       
        if(year == selectedYear) {
            radio.setAttribute("checked", "checked");
        }

        radio.addEventListener('click', function (event) {
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
        modules: {}
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
    if(id in dict){
        id = id + "-o";
    }
    
    while(id in dict){
        id = id + "o";
    }

    return id;
}

// MODULES UI
function updateModulesUI(){
    var modules = document.getElementById("module-cards");
    modules.innerHTML = "";

    for (const module in dict[selectedYear]["modules"]) {
        var card = document.createElement("div");
        card.setAttribute("class", "card text-center");
        card.setAttribute("id", module);

        var cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");

        var cardHeaderPills = document.createElement("ul");
        cardHeaderPills.setAttribute("class", "nav nav-pills card-header-pills d-flex justify-content-between align-middle");

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

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        modules.appendChild(card);

        var br = document.createElement("br");
        modules.appendChild(br);
    }

    // if dict[selectedYear]["modules"] is empty then show a message
    if(Object.keys(dict[selectedYear]["modules"]).length === 0){
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

    document.getElementById("module-new-name-field").value = "";
    document.getElementById("module-new-name-field").focus();
}

updateYearNavUI();
//updateModulesUI();