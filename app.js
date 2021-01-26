if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const axios = require('axios');
const ExpressError = require("./utils/ExpressError");
const apiToken = process.env.COVIDAPITOKEN;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const options = {
    method: 'GET',
    url: 'https://api.covid19api.com/summary',
    headers: {
      'X-Access-Token': apiToken,
    }
  };


app.get("/", async (req, res) => {
    const covidData = await axios.request(options)
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        return error;
    });
    const date = covidData.Date;
    const modifiedDate = JSON.stringify(date).slice(1, 11).split("-").reverse().join("-");
    res.render("home", {covidData, modifiedDate});
})

app.get("/countries", async (req, res) => {
    const covidData = await axios.request(options)
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        return error;
    });
    const countries = await covidData.Countries;
    res.render("countries", {countries});
})

app.get("/about", (req, res) =>{
    res.render("about");
})

app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Oh No, Something Went Wrong!"
    res.status(statusCode).render("error", {err});

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})