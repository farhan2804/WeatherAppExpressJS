require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 5000;
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const staticPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));

// **Handle API requests from client-side JavaScript**
app.get("/get-weather", async (req, res) => {
  const cityName = req.query.city; // Retrieve city name from query parameter
  if (!cityName || cityName.trim() === "") {
    return res
      .status(400)
      .json({ message: "Please provide a valid city name." });
  }
  try {
    // Use the securely stored API key for the request
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const jsonData = await response.json();
    res.status(200).json(jsonData); // Send weather data as JSON response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching weather data." });
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
