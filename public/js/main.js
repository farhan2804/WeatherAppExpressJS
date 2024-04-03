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
    const weatherData = await response.json();
    outputToShow.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    forDegree.innerText = weatherData.main.temp;
    // ... (unchanged temperature status logic based on weatherData)
    data_Hide.classList.remove("data_hide");
  } catch (error) {
    outputToShow.innerText = "Enter the Correct City name";
    data_Hide.classList.add("data_hide");
    console.error(error);
  }
};

submitButton.addEventListener("click", getInfo);
