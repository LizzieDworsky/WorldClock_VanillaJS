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

-   **Time Zone Conversion**: Implementing accurate time zone conversion was a key challenge. Using Moment.js helped in managing different time zones efficiently.
-   **Dynamic UI Updates**: Ensuring the UI updates correctly with theme changes and time zone selections required careful state management.
-   **Initial Load Performance**: One of the areas identified for improvement is the performance during the initial load of the application. Future iterations will focus on optimizing this aspect to enhance user experience.

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
