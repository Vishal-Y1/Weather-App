require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const PORT = 4000;

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

// console.log(process.env.APIKEY);
const API_KEY = "34e08bfe0f910ca56e067a8de4536cf1";

// const initialCity = async (iCity) => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${iCity}&appid=${API_KEY}&units=metric`
//     const response = await fetch(url);
//     const data = await response.json()
//     console.log(data)
//     return data
// };
// initialCity("delhi")

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34e08bfe0f910ca56e067a8de4536cf1&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const status = data.weather[0].main;
  console.log("test: ", status);
  res.render("weather", {
    data,
  });
});

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
