import { timeZoneData } from "./timeZoneData.js";

let timePanelCounter = 1;

function setSelectOptions() {
    const selectElement = document.getElementById("location-select");
    if (!selectElement) {
        console.error("Select element was not found.");
        return;
    }
    for (let [value, text] of Object.entries(timeZoneData)) {
        let option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        selectElement.appendChild(option);
    }
}

function displayHeaderLocalTime() {
    try {
        const localTimeElement = document.getElementById("current-local-time");
        if (!localTimeElement) {
            console.error("One or more location elements were not found.");
            return;
        }
        localTimeElement.innerHTML = moment().format("h:mm A");
    } catch (error) {
        console.error(
            `Error adding current local time for header: ${error.message}`
        );
    }
}

function getThemeElements() {
    const bodyElement = document.getElementById("body");
    const mainElement = document.getElementById("main");
    const locationSelectElement = document.getElementById("location-select");
    const panelElements = document.querySelectorAll(
        ".location-current-time-div"
    );
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
    let localTimeAmPM;
    try {
        localTimeAmPM = moment().format("A");
    } catch (error) {
        console.error(`Error formatting Time for Theme: ${error.message}`);
    }

    const themeElements = getThemeElements();
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
    if (localTimeAmPM === "AM") {
        addThemeClasses(themeElements, "day");
    } else {
        addThemeClasses(themeElements, "night");
    }
}

function displayCurrentLocationTimeOnLoad() {
    try {
        const panelElements = getPanelElements(0);
        if (!panelElements) {
            console.error("Failed to add time panel due to missing elements.");
            return;
        }
        const timeZone = moment.tz.guess();
        formatLocationTime("Current Location", timeZone, panelElements);
    } catch (error) {
        console.error(
            `Error adding current location time on load: ${error.message}`
        );
    }
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
    const locationNameElement = document.getElementById(
        `location-name-${panelNum}`
    );
    const locationDateElement = document.getElementById(
        `location-date-${panelNum}`
    );
    const locationTimeElement = document.getElementById(
        `location-time-${panelNum}`
    );
    const locationAmPmElement = document.getElementById(
        `location-time-am-pm-${panelNum}`
    );
    if (
        !locationNameElement ||
        !locationDateElement ||
        !locationTimeElement ||
        !locationAmPmElement
    ) {
        console.error("One or more location elements were not found.");
        return null;
    }
    return {
        locationNameElement: locationNameElement,
        locationDateElement: locationDateElement,
        locationTimeElement: locationTimeElement,
        locationAmPmElement: locationAmPmElement,
    };
}

function formatLocationTime(locationName, timeZone, panelElements) {
    const currentLocationTime = moment().tz(timeZone);

    panelElements["locationNameElement"].innerHTML = locationName;
    panelElements["locationDateElement"].innerHTML =
        currentLocationTime.format("MMMM Do, YYYY");
    panelElements["locationTimeElement"].innerHTML =
        currentLocationTime.format("h:mm:ss");
    panelElements["locationAmPmElement"].innerHTML =
        currentLocationTime.format("A");
}

function updateTimePanel(event, panelNum) {
    try {
        const panelElements = getPanelElements(panelNum);
        if (!panelElements) {
            console.error("Failed to add time panel due to missing elements.");
            return;
        }
        let timeZone = event.target.value;
        let locationName =
            event.target.options[event.target.selectedIndex].innerHTML;
        if (timeZone === "local") {
            timeZone = moment.tz.guess();
            locationName = "Current Location";
        }
        formatLocationTime(locationName, timeZone, panelElements);
    } catch (error) {
        console.error(`Error updating panel ${panelNum}: ${error.message}`);
    }
}

function injectHtml(locationName, panelNum) {
    const newHtml = `<div class="location-current-time-div">
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
    const locationTimesSection = document.getElementById(
        `location-${panelNum}`
    );
    if (!locationTimesSection) {
        console.error(
            `Location times section (location-${panelNum}) not found.`
        );
        return;
    }
    locationTimesSection.innerHTML = newHtml;
    setTheme();
}

function handlePanelTimeUpdates() {
    const allLocationCurrentTimeElements = document.querySelectorAll(
        ".location-current-time-div"
    );
    for (let i = 0; i < allLocationCurrentTimeElements.length; i++) {
        updatePanelTime(i);
    }
}

function updatePanelTime(panelNum) {
    try {
        const locationTimeElement = document.getElementById(
            `location-time-${panelNum}`
        );
        let timeZone = locationTimeElement.classList.value;
        if (timeZone === "local") {
            timeZone = moment.tz.guess();
        }
        const locationTime = moment().tz(timeZone);
        locationTimeElement.innerHTML = locationTime.format("h:mm:ss");
    } catch (error) {
        console.error(`Error updating panel time: ${error.message}`);
    }
}

setTheme();
setSelectOptions();
displayCurrentLocationTimeOnLoad();
displayHeaderLocalTime();
const panelInterval = setInterval(handlePanelTimeUpdates, 1000);
const headerTimeInterval = setInterval(displayHeaderLocalTime, 10000);
const locationSelect = document.getElementById("location-select");
locationSelect.addEventListener("change", currentTimeLocation);
window.addEventListener("beforeunload", function () {
    clearInterval(panelInterval);
    clearInterval(headerTimeInterval);
});
