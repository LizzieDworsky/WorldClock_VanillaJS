import { timeZoneData } from "./timeZoneData.js";

let timePanelCounter = 1;

function setSelectOptions() {
    let selectElement = document.getElementById("location-select");
    for (let [value, text] of Object.entries(timeZoneData)) {
        let option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        selectElement.appendChild(option);
    }
}

function displayHeaderLocalTime() {
    let localTimeElement = document.getElementById("current-local-time");
    localTimeElement.innerHTML = moment().format("h:mm A");
}

function displayCurrentLocationTimeOnLoad() {
    let panelElements = getPanelElements(0);
    let timeZone = moment.tz.guess();
    formatLocationTime("Current Location", timeZone, panelElements);
}

function currentTimeLocation(event) {
    if (event.target.value.length > 0) {
        if (timePanelCounter < 3) {
            injectHtml(timePanelCounter);
            updateTimePanel(event, timePanelCounter);
            timePanelCounter++;
        } else {
            injectHtml(timePanelCounter);
            updateTimePanel(event, timePanelCounter);
            timePanelCounter = 0;
        }
    }
}

function getPanelElements(panelNum) {
    let locationNameElement = document.getElementById(
        `location-name-${panelNum}`
    );
    let locationDateElement = document.getElementById(
        `location-date-${panelNum}`
    );
    let locationTimeElement = document.getElementById(
        `location-time-${panelNum}`
    );
    let locationAmPmElement = document.getElementById(
        `location-time-am-pm-${panelNum}`
    );
    return [
        locationNameElement,
        locationDateElement,
        locationTimeElement,
        locationAmPmElement,
    ];
}

function formatLocationTime(locationName, timeZone, panelElements) {
    let currentLocationTime = moment().tz(timeZone);

    panelElements[0].innerHTML = locationName;
    panelElements[1].innerHTML = currentLocationTime.format("MMMM Do, YYYY");
    panelElements[2].innerHTML = currentLocationTime.format("h:mm:ss");
    panelElements[3].innerHTML = currentLocationTime.format("A");
}

function updateTimePanel(event, panelNum) {
    let panelElements = getPanelElements(panelNum);

    let timeZone = event.target.value;
    let locationName =
        event.target.options[event.target.selectedIndex].innerHTML;
    if (event.target.value === "local") {
        timeZone = moment.tz.guess();
        locationName = "Current Location";
    }
    formatLocationTime(locationName, timeZone, panelElements);
}

function injectHtml(panelNum) {
    let newHtml = `<div class="location-current-time-div">
                        <div class="location-name-date-div">
                            <h3 class="location-name" id="location-name-${panelNum}">
                                Los Angeles, USA
                            </h3>
                            <p class="location-date" id="location-date-${panelNum}">
                                November 11th, 2023
                            </p>
                        </div>
                        <h4 class="location-time">
                            <span id="location-time-${panelNum}"> 1:48:15 </span>

                            <span
                                class="location-time-am-pm"
                                id="location-time-am-pm-${panelNum}"
                                >AM</span
                            >
                        </h4>
                    </div>
                `;
    let locationTimesSection = document.getElementById(`location-${panelNum}`);
    locationTimesSection.innerHTML = newHtml;
}

setSelectOptions();
displayCurrentLocationTimeOnLoad();
displayHeaderLocalTime();
setInterval(displayHeaderLocalTime, 60000);
let locationSelect = document.getElementById("location-select");
locationSelect.addEventListener("change", currentTimeLocation);
