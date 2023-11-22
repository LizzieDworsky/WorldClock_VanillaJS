let timePanelCounter = 0;

function displayLocalTime() {
    let localTimeElement = document.getElementById("current-local-time");
    localTimeElement.innerHTML = moment().format("h:mm A");
}

function currentTimeLocation(event) {
    if (event.target.value.length > 0) {
        if (timePanelCounter === 0) {
            updateTimePanel(event, timePanelCounter);
            timePanelCounter++;
        } else if (timePanelCounter < 3) {
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

function updateTimePanel(event, panelNum) {
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
    let currentLocationTime = moment().tz(event.target.value);

    locationNameElement.innerHTML =
        event.target.options[event.target.selectedIndex].innerHTML;
    locationDateElement.innerHTML = currentLocationTime.format("MMMM Do, YYYY");
    locationTimeElement.innerHTML = currentLocationTime.format("h:mm:ss");
    locationAmPmElement.innerHTML = currentLocationTime.format("A");
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

displayLocalTime();
setInterval(displayLocalTime, 60000);
let locationSelect = document.getElementById("location-select");
locationSelect.addEventListener("change", currentTimeLocation);
