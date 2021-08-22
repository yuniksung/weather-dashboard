
let search = document.getElementById("searchInput");
let btn = document.getElementById("searchBtn");

const api = {
    key: '65f623f1a41f52210c0bf9424a1d905b',
    base: "https://api.openweathermap.org/data/2.5/"
};

const getInput = (event) =>{
    event.preventDefault();

    if(event.type == "click"){
        getData(search.value);

    };
};

const getData = () => {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then(displayData);
}

const displayData = (response) => {
    console.log(response);
    console.log(response.name);

    if(response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value="";
    } else {

    // City and Country
    let cityName = document.querySelector(".city-name");
    let cityCountry = document.querySelector(".country");
    cityName.textContent = `${response.name}`
    cityCountry.textContent = `${response.sys.country}`
    }
}


btn.addEventListener("click", getInput);

