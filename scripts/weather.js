const getWeatherAPIUrl='http://api.openweathermap.org/data/2.5/forecast?q=';
const APIKey = '&APPID=89cb83e42a997e3cdd025c2ade99b4d5';
let data = {};

function getUserInput(){
    let festivalLocationInput = document.getElementById('inputText').value;
    return festivalLocationInput;
}

function getWeather(e, festivalLocationInput){
    let festivalLocation = getUserInput(festivalLocationInput);
    let getFestivalWeather = getWeatherAPIUrl + festivalLocation + APIKey;

    if(festivalLocationInput !== null){
        fetch(getFestivalWeather)
        .then(response => response.json())
        .then(getData => {
            data = getData;
            console.log(data);
            convertKelvinToCelcius();
            setWeather();
        })
        .catch(err => console.log('Error', err));
    }else{
        return console.log('No User Input');
    }
};

function setWeather(tempCelsius){
    let tempC = convertKelvinToCelcius(tempCelsius);
    document.getElementById('city').innerHTML = data.city.name;
    document.getElementById('temp').innerHTML = tempC.toFixed(2) + '&deg;C';
};

function convertKelvinToCelcius(){
    let tempCelsius = data.list[0].main.temp - 273.15;
    return tempCelsius;
};