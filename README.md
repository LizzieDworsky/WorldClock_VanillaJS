# World Clock Application

## Table of Contents

-   [Live Demo](#live-demo)
-   [Description](#description)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [File Structure](#file-structure)
-   [Future Work](#future-work)
-   [Challenges and Lessons Learned](#challenges-and-lessons-learned)
-   [Contributing](#contributing)

## Live Demo

You can check out the live demo of the application here: [Live Demo Link.](https://papaya-lily-3d0909.netlify.app/)

## Description

World Clock is a web application that displays the current time in various time zones across the world. It uses Moment.js for accurate time zone conversions and formatting.

## Features

-   **Dynamic Time Zone Selection**: Users can select from a variety of time zones to view the current time in different cities.
-   **Automatic Local Time Display**: On page load, the application automatically displays the local time based on the user's geolocation.
-   **Theme Switching**: The application features a dynamic theme that switches between 'day' and 'night' modes based on the local time.
-   **Customizable Time Panels**: Users can view and customize multiple time panels for different locations simultaneously.

## Installation

No special installation steps are required. The application is built with HTML, CSS, and vanilla JavaScript. Simply clone or download the repository and open `index.html` in a web browser.

## Usage

1. **Open the Application**: Open `index.html` in a web browser.
2. **Select Time Zone**: Use the dropdown menu to select different time zones and view their corresponding times.
3. **View Local Time**: By default, your local time is displayed upon loading the application.

## File Structure

-   `index.html`: The main HTML file.
-   `styles.css`: Contains all the styling for the application.
-   `main.js`: Main JavaScript file containing the application logic.
-   `timeZoneData.js`: Contains data mapping for time zones and their corresponding city names.

## Future Work

-   **Additional Time Zone Data**: Expanding the list of available time zones.
-   **Customizable Panel Count**: Implementing a feature that allows users to select the number of time panels displayed (up to four). This feature is currently under development in a separate branch.
-   **Mobile Responsiveness**: Enhancing the user interface for better responsiveness on mobile devices.

## Challenges and Lessons Learned

### Time Zone Conversion and Data Management

One of the core challenges of the World Clock project was handling accurate time zone conversion. Utilizing Moment.js and Moment Timezone significantly aided in managing and converting time zones. However, curating the `timeZoneData` required meticulous attention to ensure that each time zone was correctly mapped to its corresponding city and country name. The following snippet from `timeZoneData.js` highlights this mapping:

```javascript
export const timeZoneData = {
    "Europe/London": "London, GBR",
    "Asia/Tokyo": "Tokyo, JPN",
    // more mappings...
};
```

### Dynamic UI Updates and Reactivity

Ensuring that the user interface dynamically reflects changes in theme and time zone selections presented a unique challenge. This required implementing a reactive system to update the UI based on user interactions and time changes. A key part of this was the `setTheme` function, which dynamically adjusted the theme based on the local time:

```javascript
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
```

### Performance Optimization and Load Delay

The application currently experiences a subtle delay during loading. This issue arises from the way time zone data is processed and the extensive number of DOM manipulations required during the initialization phase. Efforts to address these challenges are ongoing. Future iterations will focus on optimizing data handling and reducing initial render time to enhance user experience. This includes exploring more efficient ways to manage DOM updates and considering lazy loading techniques for time zone data.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**
2. **Create a new branch**:
    ```bash
    git checkout -b new-feature
    ```
3. **Commit your changes**:
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```bash
    git push origin new-feature
    ```
5. **Create a new Pull Request**
