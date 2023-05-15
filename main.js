// Getting input from the input

let mainInput = document.getElementById("main-input");

let cityToCordinate;

function getInput(e) {
  console.log(e.target.value);
  cityToCordinate = `https://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=1&appid=27f7ed587efeca878990fec4b1a20915`;
  fetch(cityToCordinate)
    .then((data) => data.json())
    .then((data) => {
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=27f7ed587efeca878990fec4b1a20915`;
    })
    .then((data) => {
      console.log(data);
      fetch(data)
        .then((data) => data.json())
        .then((data) => {
          //Changing city name
          let cityName = document.getElementById("city-name");
          cityName.textContent = `${data.name}, ${data.sys.country}`;
          //Weather
          let weather = document.getElementById("weather");
          weather.textContent = data.weather[0].main;
          //temperature
          let temp = document.getElementById("curr-temp");
          temp.textContent = `${Math.floor(data.main.temp - 273.15)}°C`;
          //Low temp
          let lowTemp = document.getElementById("low-temp");
          lowTemp.textContent = `Min Temp : ${Math.floor(
            data.main.temp_min - 273.15,
          )}°C`;
          //High temp
          let highTemp = document.getElementById("high-temp");
          highTemp.textContent = `Max Temp : ${Math.floor(
            data.main.temp_max - 273.15,
          )}°C`;
          // Wind Speed
          let windSpeed = document.getElementById("wind-speed");
          windSpeed.textContent = `Wind Speed : ${data.wind.speed} Miles/s`;
          //sun rise time
          let sunRise = document.getElementById("sun-rise");
          sunRise.textContent = time(data.sys.sunrise, "AM");
          //sun set time
          let sunSet = document.getElementById("sun-set");
          sunSet.textContent = time(data.sys.sunset, "PM");
          //Image
          let weatherImg = document.getElementById("weater-img");
          weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          let weatherName = data.weather[0].main.toLowerCase();
          let url;
          if (weatherName == "clear") {
            url =
              "https://picjumbo.com/wp-content/uploads/view-of-the-lake-michigan-on-a-sunny-day-free-photo.jpg";
          } else if (weatherName == "haze") {
            url =
              "https://eoimages.gsfc.nasa.gov/images/imagerecords/145000/145827/globeindiasmog_lrg.jpg";
          } else if (weatherName == "clouds") {
            url =
              "https://upload.wikimedia.org/wikipedia/commons/6/6b/Cloudy_Day_01.jpg";
          } else if (weatherName == "rain") {
            url =
              "https://mypenmyfriend.com/wp-content/uploads/2022/09/60a8e096cdfa36001e16a988.jpg";
          } else {
            url =
              "https://eoimages.gsfc.nasa.gov/images/imagerecords/145000/145827/globeindiasmog_lrg.jpg";
          }

          document.body.style.background = `#f3f3f3 url(${url})`;
          document.body.style.backgroundSize = "100% ";
        });
    });
}

function time(val, zone) {
  const date = new Date(val * 1000);
  const hours = date.getHours();
  const minuts = date.getMinutes();
  const seconds = date.getSeconds();

  return `${pad(hours)}:${pad(minuts)}:${pad(seconds)} ${zone}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

mainInput.addEventListener("change", getInput);
