var cityListEl = document.getElementById('cityList');
var searchBtnEl = document.getElementById('search-button');
var cityInputEl = document.getElementById('city-input');
var clearBtnEl = document.getElementById('clear-btn');
var currentWeatherEl = document.getElementById('currentWeather');
var forecastEls = document.getElementById('forecast-container')
var historyItemEl = document.getElementsByTagName('a');

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const apiKey = '65f623f1a41f52210c0bf9424a1d905b'


const getCurrentWeather = (searchTerm) => {
    // let searchMethod = cityInputEl.value
    console.log(searchTerm)
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`).then(result => {
            return result.json();
        }).then(result => {
            generateFiveDay(result.name);
            displayCurrentWeather(result);
        })
}

const getUvIndex = (obj) => {
    let coord = obj.coord;
    let UvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;
    fetch(UvUrl)
    .then((result) => result.json())
    .then((result) => displayUvLevel(result));
};

// Generate Five day Forecast
function generateFiveDay(searchTerm) {
    // const searchMethod = cityInputEl.value
    // console.log(searchMethod)
    console.log(searchTerm);
    let fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${apiKey}`;
    fetch(fiveDayUrl).then((result) => result.json())
    .then(function(data){
        // function fiveDayForecast() {
            // forecastEls.innerHTML = "";
            // Title for 5 day forecast section
            // let fiveDayForecast = document.createElement("div");
            var fiveDayForecast = document.querySelectorAll(".forecast");
            console.log(fiveDayForecast);
            console.log(fiveDayForecast);
            console.log(data);
            
            for (i = 0; i < fiveDayForecast.length; i++) {
                let h1El = document.createElement("h1");
                h1El.setAttribute("class", "forecast-h1");
                h1El.textContent = "5 Day Forecast";

                fiveDayForecast[i].appendChild(h1El);
                fiveDayForecast[i].innerHTML = "";
                var fiveDayIndex = i * 8 + 4;
                // console.log(fiveDayIndex);
                var fiveDayDate = new Date(data.list[fiveDayIndex].dt * 1000);
                var fiveDayYear = fiveDayDate.getFullYear();
                var fiveDayMonth = fiveDayDate.getMonth() + 1;
                var fiveDayDay = fiveDayDate.getDate();
                
                var fiveDayDateEl = document.createElement("p");
                fiveDayDateEl.setAttribute("class", "five-date-p");

                fiveDayDateEl.innerHTML = fiveDayMonth + "/" + fiveDayDay + "/" + fiveDayYear;
                console.log(fiveDayDateEl);
                fiveDayForecast[i].append(fiveDayDateEl);

                var forecastedWeatherEl = document.createElement("img");
                forecastedWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[fiveDayIndex].weather[0].icon + "@2x.png");
                
                fiveDayForecast[i].append(forecastedWeatherEl);

                var forecastedTemperatureEl = document.createElement("p");
                forecastedTemperatureEl.setAttribute("class", "five-temp-p");
                forecastedTemperatureEl.innerHTML = "Temp: " + convertToFahrenheit(data.list[fiveDayIndex].main.temp) + "&#176F";
                fiveDayForecast[i].append(forecastedTemperatureEl);

                var forecastedHumidityEl = document.createElement("p");
                forecastedHumidityEl.setAttribute("class", "five-humid-p");
                forecastedHumidityEl.innerHTML = "Humidity: " + data.list[fiveDayIndex].main.humidity + "%";
                fiveDayForecast[i].append(forecastedHumidityEl);
            }
        
    })
};



const displayCurrentWeather = (obj) => {
    // Parse data
    const currentDate   = new Date(obj.dt*1000);
    const day           = currentDate.getDate();
    const month         = currentDate.getMonth() + 1;
    const year          = currentDate.getFullYear();
    
    currentWeatherEl.innerHTML = '';
    // Create 'div' that will contain current weather information
    let weatherContainerEl = document.createElement('div');
    weatherContainerEl.classList = "weatherContainer";

    // Create h1 element to display name of the city
    let h1El = document.createElement('h1');
    let weatherContainerIconEl = document.createElement('img');
    
    // Retreive icon image
    let iconEl = obj.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${iconEl}.png`;
    // Create element that holds icon image
    
    weatherContainerIconEl.setAttribute("src", iconUrl);

    // Put date
    h1El.innerHTML = obj.name + "(" + month + "/" + day + "/" + year + ") ";

    weatherContainerEl.appendChild(h1El);
    weatherContainerEl.appendChild(weatherContainerIconEl);

    // Temperature section
    let temperatureEl = document.createElement("div");
    temperatureEl.classList = "temperature";
    let currentTemp = Math.floor((obj.main.temp * 9) / 5 - 459.67);
    let tempDisplay = document.createElement("h2");
    tempDisplay.textContent = `Teperature: ${currentTemp} (Fahernheit)`;
    temperatureEl.appendChild(tempDisplay);

    // Humidity section
    let humidityEl = document.createElement("div");
    let currentHumidityEl = document.createElement("h2");
    currentHumidityEl.textContent = `Humidity: ${obj.main.humidity}%`;
    humidityEl.appendChild(currentHumidityEl);

    // Wind-Speed sction
    let windEl = document.createElement("div");
    let WindSpeedEl = document.createElement("h2");
    WindSpeedEl.textContent = `Wind Speed: ${obj.wind.speed.toFixed(1)} mph`;
    windEl.appendChild(WindSpeedEl);

    // UV-index section
    let UvEl = document.createElement("div");
    UvEl.setAttribute("id", "uv-index");



      // append each weather element to the current weather element
    currentWeatherEl.appendChild(weatherContainerEl);
    currentWeatherEl.appendChild(temperatureEl);
    currentWeatherEl.appendChild(humidityEl);
    currentWeatherEl.appendChild(windEl);
    currentWeatherEl.appendChild(UvEl);
    getUvIndex(obj);
    
}   

const displayUvLevel = (obj) => {
    let uvIndexEl = document.createElement('div');
    uvIndexEl.setAttribute("class", "uv-control");
    let uvH2El = document.createElement('h2');
    uvH2El.setAttribute("class", "uv-text");
    uvH2El.textContent = "UV Index: ";
    let uvLevelEl = document.createElement("div");
    uvLevelEl.setAttribute("class", "uv-index");
    uvLevelEl.textContent = obj.value;
    if (obj.value < 3) {
        uvLevelEl.style.background = "#09ff00";
    } else if (3 <= obj.value || res.value <= 7) {
        uvLevelEl.style.background = "#fcec00";
    } else if (obj.value > 7) {
        uvLevelEl.style.background = "#f7001e";
    }
    uvIndexEl.appendChild(uvH2El);
    uvIndexEl.appendChild(uvLevelEl);
    const currentUvIndexEl = document.getElementById("uv-index");
    currentUvIndexEl.appendChild(uvIndexEl);
;}

var formSubmitHandler = (event) => {
    event.preventDefault();

    let searchTerm = cityInputEl.value;
    // cityInputEl.value = "";

    getCurrentWeather(searchHistory);
    if(searchHistory.includes(searchTerm) == false) {
        searchHistory.push(searchTerm);
    }
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory(searchHistory);
}

// Handles clear button to clear out the city list
var clearAll = () => {
    searchHistory = [];
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory(searchHistory);
    
}

// Create hyperlink of searched city
const renderSearchHistory = (arr) => {
    cityListEl.innerHTML = "";
    console.log(searchHistory);
    for (let i=0; i<searchHistory.length; i++) {
        let historyItemEl = document.createElement("a");
        historyItemEl.classList = "history-list";
        historyItemEl.textContent = searchHistory[i]
        let cityName = searchHistory[i]
        // When history Item is clicked, jump into its data
        historyItemEl.addEventListener("click",function() {
            // getCurrentWeather(historyItemEl.value);
            getCurrentWeather(cityName);
            console.log(cityName);
        })
        cityListEl.appendChild(historyItemEl)
    }

};

function convertToFahrenheit(k) {
    return Math.floor((k - 273.15) * 1.8 + 32);
 }
   



searchBtnEl.addEventListener('click', formSubmitHandler);
clearBtnEl.addEventListener("click",clearAll);

