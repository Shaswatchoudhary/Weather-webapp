//making object of weatherapi
const weatherApi = {
  key: "4eb3703790b356562054106543b748b2",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

//anonymous function
//adding event listener key press of enter
let searchInputBox = document.getElementById("input-box");
searchInputBox.addEventListener("keypress", (event) => {
  //keycode 13 represents the "Enter" key.
  if (event.keyCode == 13) {
    // console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    //Enter key is pressed  it calls the getWeatherReport() function with the value of the
  }
});

//get waether report

function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`) // fetch method fetching the data from  base url ...metric is used for unit in celcius......here i am appending the base url to get data by city name .
    .then((weather) => {
      //=> arrow functions
      //weather is from api
      return weather.json(); // return data from api in JSON
    })
    .then(showWeaterReport); // calling showweatherreport function
  // API key required for authentication, and units=metric indicates that temperature units should be returned in Celsius.
}
//json used for transfer data into website

//show weather report
//
function showWeaterReport(weather) {
  //showWeatherReport(weather) function is responsible for displaying the weather information on the webpage
  let city_code = weather.cod;
  if (city_code === "400") {
    //city_code is "400", it indicates empty inputt
    swal("Empty Input", "Please enter any city", "error");
    reset();
  } else if (city_code === "404") {
    swal("Bad Input", "entered city didn't matched", "warning");
    reset();
  } else {
    // console.log(weather.cod);
    // console.log(weather);
    let op = document.getElementById("weather-body");
    op.style.display = "block"; //display property of this element to "block", making it visible on the  webpage
    let todayDate = new Date(); //current date
    let parent = document.getElementById("parent"); //It selects two elements  one with the ID "parent" and another with the ID "weather-body" and append the weather

    let weather_body = document.getElementById("weather-body"); //(`) initiates a template literal allowing multi-line strings with embedded expressions
    weather_body.innerHTML = `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${
      weather.sys.country
    }</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(
          weather.main.temp
        )}&deg;C </div>
        <div class="weather" id="weather"> ${
          weather.weather[0].main
        } <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(
          weather.main.temp_min
        )}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${
          weather.main.feels_like
        }&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${
      weather.main.pressure
    } mb | Wind ${weather.wind.speed} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset(); //clear the inputs fields
  }
  //changeBg() function might be invoked to change the background based on the weather condition.
}

//making a function for the  last update current time

function getTime(todayDate) {
  let hour = addZero(todayDate.getHours());
  let minute = addZero(todayDate.getMinutes());
  return `${hour}:${minute}`; //Here it concatenated Hour and mins together by (:)
}

//date manage for return  current date
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday", // Each day name is indexed from 0 to 6 corresponding to Sunday to Saturday
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];
  // console.log(year+" "+date+" "+day+" "+month);
  return `${date} ${month} (${day}) , ${year}`; //It concatenates the day of the week, month, date, and year together with commas and spaces in between.
}

// function for the dynamic background change  according to weather status
function changeBg(status) {
  const videos = document.querySelectorAll(".bg-video");
  videos.forEach((video) => (video.style.display = "none"));

  let videoId;
  if (status === "Clouds") {
    videoId = "Clouds";
  } else if (status === "Rain") {
    videoId = "rain";
  } else if (status === "Clear") {
    videoId = "clear";
  } else if (status === "Snow") {
    videoId = "snow";
  } else if (status === "Sunny") {
    videoId = "sunny";
  } else if (status === "Thunderstorm") {
    videoId = "thunderstorm";
  } else if (status === "Drizzle") {
    videoId = "drizzle";
  } else if (status === "Mist" || status === "Haze" || status === "Fog") {
    videoId = "mist";
  }

  if (videoId) {
    const videoElement = document.getElementById(videoId);
    videoElement.style.display = "block";
    videoElement.play();
  }
}

//making a function for the classname of icon
function getIconClass(classarg) {
  if (classarg === "Rain") {
    return "fas fa-cloud-showers-heavy";
  } else if (classarg === "Clouds") {
    return "fas fa-cloud";
  } else if (classarg === "Clear") {
    return "fas fa-cloud-sun";
  } else if (classarg === "Snow") {
    return "fas fa-snowman";
  } else if (classarg === "Sunny") {
    return "fas fa-sun";
  } else if (classarg === "Mist") {
    return "fas fa-smog";
  } else if (classarg === "Thunderstorm" || classarg === "Drizzle") {
    return "fas fa-thunderstorm";
  } else {
    return "fas fa-cloud-sun";
  }
}

function reset() {
  let input = document.getElementById("input-box");
  input.value = "";
}

// funtion to add zero if hour and minute less than 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
