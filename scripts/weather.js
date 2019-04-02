const getWeatherAPIUrl='http://api.openweathermap.org/data/2.5/forecast?q=';
const APIKey = '&APPID=89cb83e42a997e3cdd025c2ade99b4d5&lang=nl';
let data = {};
let weather = ko.observableArray([]);

function getUserInput(){
    let festivalLocationInput = document.getElementById('city').innerText;
    if(festivalLocationInput == 0){
        return;
    }else{
        return festivalLocationInput;
    }
}

function getWeather(e, festivalLocationInput){
    let festivalLocation = getUserInput(festivalLocationInput);
    let getFestivalWeather = getWeatherAPIUrl + festivalLocation + APIKey + '&units=metric';
    console.log(getFestivalWeather);
    if(festivalLocationInput !== 0){
        fetch(getFestivalWeather)
        .then(response => response.json())
        .then(getData => {
            data = getData;
            setWeather();
            console.log(data);
        })
        .catch(err => console.log('Error', err));
    }else{
        return console.log('No User Input');
    }
};

function setWeather(){
    document.getElementById('city').innerHTML = data.city.name;
    document.getElementById('temp').innerHTML = data.list[0].main.temp.toFixed(2) + '&deg;C';
    document.getElementById('weertype').innerHTML = data.list[0].weather[0].description;

    for (let i = 1; i < data.list.length; i++) {
        let convert = (data.list[i].main.temp).toFixed(2) + String.fromCharCode(176)+'C';
        let weatherIcon = '<img src="' + 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon +'.png">';

        weather.push(
            {
                date: data.list[i].dt_txt,
                temperature: convert,
                icon: weatherIcon,
                type: data.list[i].weather[0].description
            }
        )
    }
    
};

ko.applyBindings(new weather());