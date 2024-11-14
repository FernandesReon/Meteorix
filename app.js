const apiKey = '21ea49c4cc934a5e9228bb979ab4ec5d';

const locationInput = document.querySelector('.search-location input');
const searchBtn = document.querySelector('.search-location button');

async function checkWeather(location = "Vasai") {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found.!");

        const data = await response.json();
        console.log(data);

        const weatherIcon = document.querySelector('.weather-icon');
        const windIcon = document.querySelector('.wind-icon');
        const pressureIcon = document.querySelector('.pressure-icon');

        // location and temperature
        document.querySelector('.location-name').innerHTML = data.name;
        document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        document.querySelector('.max').innerHTML = `${Math.round(data.main.temp_max)}<sup>°C</sup>`;
        document.querySelector('.min').innerHTML = `${Math.floor(data.main.temp_min)}<sup>°C</sup>`;
        document.querySelector('.feels_like').innerHTML = "Feels like " + `${Math.round(data.main.feels_like)}<sup>°C</sup>`;
        document.querySelector('.condition').innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

        // Weather Details (Sunrise, Sunset, Humidity, Wind-Speed, Visibility and Pressure)
        document.querySelector('.rise').innerHTML = convertTimeFormat(data.sys.sunrise);
        document.querySelector('.set').innerHTML = convertTimeFormat(data.sys.sunset);

        document.querySelector('.humid').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
        document.querySelector('.visible').innerHTML = data.visibility / 1000 + " km";
        document.querySelector('.pressure').innerHTML = data.main.pressure + " mb";

        // Change main weather image based on weather condition.
        if (data.weather[0].description == "clear sky") {
            weatherIcon.src = "/images/clear-sky.svg";
        }
        else if (data.weather[0].description == "few clouds") {
            weatherIcon.src = "/images/few-clouds.svg";
        }
        else if (data.weather[0].description == "scattered clouds") {
            weatherIcon.src = "/images/cloudy.svg";
        }
        else if (data.weather[0].description == "broken clouds") {
            weatherIcon.src = "/images/cloudy.svg";
        }
        else if (data.weather[0].description == "overcast clouds") {
            weatherIcon.src = "/images/overcast.svg";
        }
        else if (data.weather[0].description == "mist") {
            weatherIcon.src = "/images/mist.svg";
        }
        else if (data.weather[0].description == "smoke") {
            weatherIcon.src = "/images/smoke.svg";
        }
        else if (data.weather[0].description == "haze") {
            weatherIcon.src = "/images/haze.svg";
        }
        else if (data.weather[0].description == "fog") {
            weatherIcon.src = "/images/fog.svg";
        }
        else if (data.weather[0].description == "sand" || data.weather[0].description == "dust") {
            weatherIcon.src = "/images/dust.svg";
        }
        else if (data.weather[0].description == "shower rain") {
            weatherIcon.src = "/images/shower-rain.svg";
        }
        else if (data.weather[0].description == "rain" || data.weather[0].description == "light rain") {
            weatherIcon.src = "/images/rain.svg";
        }
        else if (data.weather[0].description == "thunderstorm") {
            weatherIcon.src = "/images/thunderstorm.svg";
        }
        else if (data.weather[0].description == "snow") {
            weatherIcon.src = "/images/snow.svg";
        }
        else if (data.weather[0].description == "sleet") {
            weatherIcon.src = "/images/sleet.svg";
        }
        else if (data.weather[0].description == "tornado") {
            weatherIcon.src = "/images/tornado.svg";
        } else {
            weatherIcon.src = "/images/not-available.svg";
        }

        // Change wind speed image based on wind speed in the Beaufort scale
        if (data.wind.speed == 0) {
            windIcon.src = "/images/wind/wind-beaufort-0.svg";
        }
         else if (data.wind.speed >= 1 && data.wind.speed < 2) {
            windIcon.src = "/images/wind/wind-beaufort-1.svg";
        }
         else if (data.wind.speed >= 2 && data.wind.speed < 3) {
            windIcon.src = "/images/wind/wind-beaufort-2.svg";
        }
         else if (data.wind.speed >= 3 && data.wind.speed < 4) {
            windIcon.src = "/images/wind/wind-beaufort-3.svg";
        }
         else if (data.wind.speed >= 4 && data.wind.speed < 5) {
            windIcon.src = "/images/wind/wind-beaufort-4.svg";
        }
         else if (data.wind.speed >= 5 && data.wind.speed < 6) {
            windIcon.src = "/images/wind/wind-beaufort-5.svg";
        }
         else if (data.wind.speed >= 6 && data.wind.speed < 7) {
            windIcon.src = "/images/wind/wind-beaufort-6.svg";
        }
         else if (data.wind.speed >= 7 && data.wind.speed < 8) {
            windIcon.src = "/images/wind/wind-beaufort-7.svg";
        }
         else if (data.wind.speed >= 8 && data.wind.speed < 9) {
            windIcon.src = "/images/wind/wind-beaufort-8.svg";
        }
         else if (data.wind.speed >= 9 && data.wind.speed < 10) {
            windIcon.src = "/images/wind/wind-beaufort-9.svg";
        }
         else if (data.wind.speed >= 10 && data.wind.speed < 11) {
            windIcon.src = "/images/wind/wind-beaufort-10.svg";
        }
         else if (data.wind.speed >= 11 && data.wind.speed < 12) {
            windIcon.src = "/images/wind/wind-beaufort-11.svg";
        }
         else if (data.wind.speed >= 12) {
            windIcon.src = "/images/wind/wind-beaufort-12.svg";
        }


        // change pressure image
        if (data.main.pressure < 1013.5) {
            pressureIcon.src = "/images/pressure/pressure-low-alt.svg";
        }
        else {
            pressureIcon.src = "/images/pressure/pressure-high-alt.svg";
        }

    } catch (error) {
        alert(error.message);
    }

}

function convertTimeFormat(timeStamp) {
    const date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${amPm}`;
}

searchBtn.addEventListener("click", () => {
    checkWeather(locationInput.value);
});

window.onload = function () {
    checkWeather();
}