const weather = document.querySelector(".js-weather");

const COORDS = "coords",
    API_KEY = "5ff5f673b636e8a4a040a58efff3e499";

function getWeather(lat, lon) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    });
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError() {
    console.log("Can't access geo location");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init() {
    loadCoords();
}

init();