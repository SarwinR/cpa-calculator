

dict = {
    "year 1": {
        "DB":{

        },
        "COMS":{

        },
    },

    "year 2": {
        "DSA":{
            
        },
        "OOSD":{

        },
    }
};


year_navigation = document.getElementById("year-nav");



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
        if (year == "year 1") {
            radio.setAttribute("checked", "");
        }
        year_navigation.appendChild(radio);
    
        var label = document.createElement("label");
        label.setAttribute("class", "btn btn-outline-primary");
        label.setAttribute("for", "year-nav-" + year);
        label.innerHTML = year;
        year_navigation.appendChild(label);
    }
}


function addYear() {
    var year = document.getElementById("year-new-name-field").value;
    dict[year] = {};
    updateYearNavUI();
    document.getElementById("year-new-name-field").value = "";
    document.getElementById("year-new-name-field").focus();
}

updateYearNavUI();