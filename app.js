const express = require("express");
// We don't need to install https module since it is one of the native module of node, it will be already present.
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const appid = "&appid=a864126d0bdd9f3933e9024a81abcce6";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + appid + "&units=" + unit;

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            // To convert the data received from hexadecimal to JSON
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            console.log(weatherDescription);
            res.write("<p>The weather currently: " + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + query + " is: " + temp + "<h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
});


app.listen(3000,function(){
    console.log("Server is listening on post 3000.");
});