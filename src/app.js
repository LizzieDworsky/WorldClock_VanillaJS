function currentTimeLocation(event) {
    if (event.target.value.length > 0) {
        let currentTime = moment().tz(event.target.value);
        alert(
            `It is ${currentTime.format("dddd, MMMM M, YYYY h:mm A")} in ${
                event.target.value
            }`
        );
    }
}

let locationSelect = document.getElementById("location-select");
locationSelect.addEventListener("change", currentTimeLocation);
