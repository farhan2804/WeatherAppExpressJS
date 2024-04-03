const submitButton = document.getElementById("submitBtn");
const cityName = document.getElementById("city_name");
const outputToShow = document.getElementById("output");
const getTemp = document.getElementById("temp");
const getTempStatus = document.getElementById("temp_status");
const forDegree = document.getElementById("forDegree");
const data_Hide = document.querySelector(".middle_layer");
const findDay = document.getElementById("day");
const findMonth = document.getElementById("today_data");
const getCurrTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const months = [
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
  let month = months[date.getMonth()] + " " + year;
  let day = days[date.getDay()];
  return (findDay.innerText = day), (findMonth.innerText = month);
};
getCurrTime();

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal.trim() === "") {
    outputToShow.innerText = "Enter City name to see Result";
    data_Hide.classList.add("data_hide");
    return;
  }
  try {
    const url = `/get-weather?city=${cityVal}`; // Fetch weather data from server-side API endpoint
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const jsonData = await response.json();
    const arrData = [jsonData];
    outputToShow.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
    forDegree.innerText = arrData[0].main.temp;
    // ... (unchanged temperature status logic based on weatherData)
    const checkTempStatus =  arrData[0].weather[0].main;
    //condition to check sunny or cloudy
    if (checkTempStatus == "Sunny") {
      getTempStatus.innerHTML =
        "<i class='fas  fa-sun' style='color: #F5B027;'></i>";
    } else if (checkTempStatus == "Clouds") {
      getTempStatus.innerHTML =
        "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
    } else if (checkTempStatus == "Rainy") {
      getTempStatus.innerHTML =
        "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
    } else {
      getTempStatus.innerHTML =
        "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
    }
    data_Hide.classList.remove("data_hide");
  } catch (error) {
    outputToShow.innerText = "Enter the Correct City name";
    data_Hide.classList.add("data_hide");
    console.error(error);
  }
};

submitButton.addEventListener("click", getInfo);
