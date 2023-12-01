/**
 * External Dependencies:
 * - moment.js: Used for handling and formatting dates and times.
 * - timeZoneData.js: Contains data for different time zones used in the application.
 */
import { timeZoneData } from "./timeZoneData.js";
// Global Variables
/**
 * Global variable for tracking the current panel.
 * It represents the index of the time panel currently being manipulated or viewed.
 */
let timePanelCounter = 1;
/**
 * Populates the select options with time zones from the timeZoneData.
 * Example Usage:
 * setSelectOptions();
 * // After this function is called, the 'location-select' dropdown will be filled with time zones.
 */
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
/**
 * Displays the current local time in the header.
 * Example Usage:
 * displayHeaderLocalTime();
 * // This will update the 'current-local-time' element with the current local time.
 * @throws Will log an error if unable to display the local time.
 */
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
/**
 * Retrieves DOM elements related to the application theme.
 * Example Usage:
 * const themeElements = getThemeElements();
 * @returns {Object|null} An object with references to theme-related DOM elements, structured as { bodyElement, mainElement, locationSelectElement, panelElements } or null if elements are not found.
 */
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
/**
 * Adds or removes a specific theme class to/from each panel element.
 * @param {HTMLElement[]} panelElements - Array of panel elements to which the theme class will be applied.
 * @param {'add'|'remove'} addRemove - Specifies the action to perform. 'add' to apply the theme class, 'remove' to remove it.
 * @param {string} themeClass - The CSS class name related to the theme to be added or removed.
 */
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

/**
 * Removes a specific theme from the theme elements.
 * Example Usage:
 * removeThemeClasses(themeElements, "day");
 * // This will remove 'day' theme classes from the elements in themeElements.
 * @param {Object} themeElements - Object containing theme-related DOM elements.
 * @param {string} currentTheme - The current theme to be removed.
 */
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
/**
 * Adds a specific theme to the theme elements.
 * Example Usage:
 * addThemeClasses(themeElements, "night");
 * // This will add 'night' theme classes to the elements in themeElements.
 * @param {Object} themeElements - Object containing theme-related DOM elements.
 * @param {string} newTheme - The new theme to be applied.
 */
function addThemeClasses(themeElements, newTheme) {
    themeElements["bodyElement"].classList.add(`${newTheme}-theme-body`);
    themeElements["mainElement"].classList.add(`${newTheme}-theme-main`);
    themeElements["locationSelectElement"].classList.add(
        `${newTheme}-theme-location-time-select`
    );
    panelLoopAddRemoveTheme(themeElements["panelElements"], "add", newTheme);
}
/**
 * Sets the application theme based on the current local time.
 * The theme is determined by whether it's AM or PM in the local time.
 * This function dynamically changes the CSS classes of various elements to switch between 'day' and 'night' themes.
 * @throws Will log an error if the theme cannot be set, typically due to issues with moment.js or missing DOM elements. Default theme will remain on application.
 */
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
/**
 * Displays the current location's time when the page is loaded.
 * This function attempts to determine the user's local time zone and displays the corresponding local time.
 * @throws {Error} Logs an error if it fails to display the current location time, typically due to issues with moment.js or missing DOM elements.
 */
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
/**
 * Handles the change event for the location select element.
 * Updates the time panel based on the selected time zone.
 * Example Usage:
 * // Assuming 'locationSelect' is the select element and 'changeEvent' is the event object
 * locationSelect.addEventListener('change', currentTimeLocation);
 * @param {Event} event - The change event object from the select element.
 */
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
/**
 * Retrieves DOM elements for a specific time panel.
 * @param {number} panelNum - The panel number (index) to fetch elements for.
 * @returns {Object|null} An object containing references to panel elements or null if elements are not found.
 */
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
/**
 * Formats and displays the time for a specific location.
 * Example Usage: formatLocationTime("New York", "America/New_York", panelElements);
 * @param {string} locationName - The name of the location to display.
 * @param {string} timeZone - The time zone identifier to use for time calculation.
 * @param {Object} panelElements - The panel elements where the time should be displayed.
 */
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
/**
 * Updates the time displayed in a specific panel.
 * @param {Event} event - The event object from the select element.
 * @param {number} panelNum - The panel number (index) to update.
 * @throws Will log an error if unable to update the panel time.
 */
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
/**
 * Injects new HTML into a specific time panel with the given location name and panel number.
 * The method dynamically creates a new time display panel for the specified location.
 * Example Usage:
 * injectHtml("Tokyo", 1);
 * // This will create a new panel for Tokyo in the location-1 section of the document.
 * @param {string} locationName - The location name to display in the panel. This is used to set the class name for time elements.
 * @param {number} panelNum - The panel number (index) where the HTML should be injected. It determines the ID of elements created.
 * @throws Will log an error if unable to inject HTML into the panel due to missing elements in the DOM.
 */
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
/**
 * Periodically updates the time displayed in all time panels.
 */
function handlePanelTimeUpdates() {
    const allLocationCurrentTimeElements = document.querySelectorAll(
        ".location-current-time-div"
    );
    for (let i = 0; i < allLocationCurrentTimeElements.length; i++) {
        updatePanelTime(i);
    }
}
/**
 * Updates the time displayed in a specific panel.
 * @param {number} panelNum - The panel number (index) to update.
 * @throws Will log an error if unable to update the panel time.
 */
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
// Initialization and Event Listeners
// This section sets up the initial state of the application and registers event listeners.
// It includes setting the theme, populating time zone options, displaying the current time,
// and establishing intervals for updating time displays. Additionally, it handles cleanup
// of intervals to prevent memory leaks when the window is unloaded.
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
