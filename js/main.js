/* NAVBAR */

const collapsedNavbar = document.querySelector(".collapsed-navbar");
document.getElementById("navbar-toggler").addEventListener('click', function(){
    if(collapsedNavbar.classList.contains("d-none")){
        collapsedNavbar.classList.remove("d-none")
    }else{
        collapsedNavbar.classList.add("d-none");
    }
})


/*TODAY WEATHER DISPLAY*/

function checkWeather(city){
    const apiURL = 'http://api.weatherapi.com/v1/forecast.json?key=20f20a9de4ad4267a15170855241612&q=' + city + '&days=7';
var weatherData = [];
var todayData = new XMLHttpRequest();
todayData.open('GET',apiURL);
todayData.send();
todayData.addEventListener('readystatechange',function(){
    if(todayData.readyState == 4 && todayData.status == 200){
        weatherData = JSON.parse(todayData.response);
        console.log(weatherData)

        // TODAY WEATHER 

        document.querySelector(".city-name").innerHTML = weatherData.location.name;
        document.querySelector(".today-temp").innerHTML=weatherData.current.temp_c + "°C";
        document.querySelector(".icon").src="https:"+weatherData.current.condition.icon;
        document.querySelector(".condition").innerHTML=weatherData.current.condition.text;
        const todayDate = new Date(weatherData.location.localtime);

        const dayOfWeek = todayDate.getDay();
        
        document.querySelector(".today").innerHTML = getDayName(dayOfWeek);
        
        const month = todayDate.getMonth() + 1;
        
        const day = todayDate.getDate();
        
        document.querySelector(".today-date").innerHTML = day + " " + getMonthName(month);


        // TOMORROW WEATHER
        const tomorrowWeather = weatherData.forecast.forecastday[1];
        const tomorrowDate = new Date(tomorrowWeather.date);
        document.querySelector(".tomorrow").innerHTML = getDayName(tomorrowDate.getDay());
        document.querySelector(".tomorrow-max-temp").innerHTML = tomorrowWeather.day.maxtemp_c + "°C";
        document.querySelector(".tomorrow-min-temp").innerHTML = tomorrowWeather.day.mintemp_c + "°C";
        document.querySelector(".tomorrow-condition").innerHTML = tomorrowWeather.day.condition.text;
        document.querySelector(".icon-2").src = "https:" + tomorrowWeather.day.condition.icon;

        // AFTER TOMORROW WEATHER
        const afterTomorrowWeather = weatherData.forecast.forecastday[2];
        const afterTomorrowDate = new Date(afterTomorrowWeather.date);
        document.querySelector(".after-tomorrow").innerHTML = getDayName(afterTomorrowDate.getDay());
        document.querySelector(".aftertomorrow-max-temp").innerHTML = afterTomorrowWeather.day.maxtemp_c + "°C";
        document.querySelector(".aftertomorrow-min-temp").innerHTML = afterTomorrowWeather.day.mintemp_c + "°C";
        document.querySelector(".aftertomorrow-condition").innerHTML = afterTomorrowWeather.day.condition.text;
        document.querySelector(".icon-3").src = "https:" + afterTomorrowWeather.day.condition.icon;
    }
})
}

const searchResult = document.getElementById("search");
document.getElementById("search-btn").addEventListener('click', function(e){
    e.preventDefault()
    const city = searchResult.value; 
    checkWeather(city);

})


window.addEventListener('load', function() {
    const defaultCity = "Cairo";  
    searchResult.value = defaultCity;  
    checkWeather(defaultCity);  
});


function getMonthName(month) {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month - 1];
}

function getDayName(day) {
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  return days[day];
}




