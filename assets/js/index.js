
let search = document.getElementById("searchInput");
let btn = document.getElementById("searchBtn");

const api = {
    key: 'd52da520de0de4bf6efcf27697f24ea6',
    base: "https://api.openweathermap.org/data/2.5/"
};

const getInput = (event) =>{
    event.preventDefault();

    if(event.type == "click"){
        getData(search.value);

        console.log(search.value);
    };
};

const getData = () => {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then(displayData);
}




