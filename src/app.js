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

function getThemeElements() {
    let bodyElement = document.getElementById("body");
    let mainElement = document.getElementById("main");
    let locationSelectElement = document.getElementById("location-select");
    let panelElements = document.querySelectorAll(".location-current-time-div");
    if (
        !bodyElement ||
        !mainElement ||
        !locationSelectElement ||
        !panelElements.length
    ) {
        console.error("One or more theme elements were not found.");
        return null;
    }
    return {
        bodyElement: bodyElement,
        mainElement: mainElement,
        locationSelectElement: locationSelectElement,
        panelElements: panelElements,
    };
}

function panelLoopAddRemoveTheme(panelElements, addRemove, themeClass) {
    if (!panelElements) {
        console.error(
            "Panel elements not provided for theme class manipulation."
        );
        return;
    }
    for (let i = 0; i < panelElements.length; i++) {
        if (addRemove === "remove") {
            panelElements[i].classList.remove(
                `${themeClass}-theme-location-time-select`
            );
        } else {
            panelElements[i].classList.add(
                `${themeClass}-theme-location-time-select`
            );
        }
    }
}

function removeThemeClasses(themeElements, currentTheme) {
    themeElements["bodyElement"].classList.remove(`${currentTheme}-theme-body`);
    themeElements["mainElement"].classList.remove(`${currentTheme}-theme-main`);
    themeElements["locationSelectElement"].classList.remove(
        `${currentTheme}-theme-location-time-select`
    );
    panelLoopAddRemoveTheme(
        themeElements["panelElements"],
        "remove",
        currentTheme
    );
}

function addThemeClasses(themeElements, newTheme) {
    themeElements["bodyElement"].classList.add(`${newTheme}-theme-body`);
    themeElements["mainElement"].classList.add(`${newTheme}-theme-main`);
    themeElements["locationSelectElement"].classList.add(
        `${newTheme}-theme-location-time-select`
    );
    panelLoopAddRemoveTheme(themeElements["panelElements"], "add", newTheme);
}

function setTheme() {
    let localTime = moment();
    let themeElements = getThemeElements();
    if (!themeElements) {
        console.error("Failed to set theme due to missing elements.");
        return;
    }
    if (themeElements.bodyElement.classList.contains("default-body")) {
        themeElements.bodyElement.classList.remove("default-body");
        themeElements.mainElement.classList.remove("default-main");
        themeElements.locationSelectElement.classList.remove("default-select");
    }
    if (themeElements["bodyElement"].classList.contains("day-theme-body")) {
        removeThemeClasses(themeElements, "day");
    } else if (
        themeElements["bodyElement"].classList.contains("night-theme-body")
    ) {
        removeThemeClasses(themeElements, "night");
    }
    if (localTime.format("A") === "AM") {
        addThemeClasses(themeElements, "day");
    } else {
        addThemeClasses(themeElements, "night");
    }
}

function displayCurrentLocationTimeOnLoad() {
    let panelElements = getPanelElements(0);
    let timeZone = moment.tz.guess();
    formatLocationTime("Current Location", timeZone, panelElements);
}

function currentTimeLocation(event) {
    if (event.target.value.length > 0) {
        if (timePanelCounter < 3) {
            injectHtml(event.target.value, timePanelCounter);
            updateTimePanel(event, timePanelCounter);
            timePanelCounter++;
        } else {
            injectHtml(event.target.value, timePanelCounter);
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

function injectHtml(locationName, panelNum) {
    let newHtml = `<div class="location-current-time-div">
                        <div class="location-name-date-div">
                            <h3 class="location-name" id="location-name-${panelNum}">
                            </h3>
                            <p class="location-date" id="location-date-${panelNum}">
                            </p>
                        </div>
                        <h4 class="location-time">
                            <span class="${locationName}" id="location-time-${panelNum}"></span>
                            <span
                                class="location-time-am-pm"
                                id="location-time-am-pm-${panelNum}"
                                ></span
                            >
                        </h4>
                    </div>
                `;
    let locationTimesSection = document.getElementById(`location-${panelNum}`);
    locationTimesSection.innerHTML = newHtml;
    setTheme();
}

function handlePanelTimeUpdates() {
    let allLocationCurrentTimeElements = document.querySelectorAll(
        ".location-current-time-div"
    );
    for (let i = 0; i < allLocationCurrentTimeElements.length; i++) {
        updatePanelTime(i);
    }
}

function updatePanelTime(panelNum) {
    let locationTimeElement = document.getElementById(
        `location-time-${panelNum}`
    );
    let timeZone = locationTimeElement.classList.value;
    if (timeZone === "local") {
        timeZone = moment.tz.guess();
    }
    let locationTime = moment().tz(timeZone);
    locationTimeElement.innerHTML = locationTime.format("h:mm:ss");
}

setTheme();
setInterval(handlePanelTimeUpdates, 1000);
setSelectOptions();
displayCurrentLocationTimeOnLoad();
displayHeaderLocalTime();
setInterval(displayHeaderLocalTime, 10000);
let locationSelect = document.getElementById("location-select");
locationSelect.addEventListener("change", currentTimeLocation);
