const getWeatherAPIUrl='http://api.openweathermap.org/data/2.5/forecast?q=';
const APIKey = '&APPID=89cb83e42a997e3cdd025c2ade99b4d5';
let data = {};

function getUserInput(){
    let festivalLocationInput = document.getElementById('inputText').value;
    
    console.log('festivalLocation', festivalLocationInput)
    return festivalLocationInput;
}

function getWeather(e, festivalLocationInput){
    let festivalLocation = getUserInput(festivalLocationInput);
    let getLocalWeather = getWeatherAPIUrl + festivalLocation + APIKey;
    if(festivalLocationInput !== ''){
        fetch(getLocalWeather)
        .then(response => response.json())
        .then(data => {
            console.log(data.list[0].main.temp);
        })
        .catch(err => console.log('Error', err));
    }else{
        return console.log('No User Input');
    }
};
