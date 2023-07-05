const express = require('express')
const https  = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
 app.get('/',(req,res)=>{
    
    res.sendFile(__dirname+'/index.html');

 })

app.post('/',(req,res)=>{
 const cityName = req.body.cityName;
 const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=22f68460af54ed19b7b285d9fd704dff&units=metric`;
 console.log(url,typeof(url));
 https.get(url,(response)=>{
    response.on("data",(data)=>{
        console.log(data);
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        var img = weatherData.weather[0].icon;
        img = `https://openweathermap.org/img/wn/${img}@2x.png`;
        res.send(
           `
           <html>
           <head>
                <style>
                body{
                    background-color: #164B60;
                    color: white;
                }
                </style>
           </head>
           <body>
           <h1>The Weater Conditions in the City : ${cityName}</h1>
           <img src=${img}>
          <ul>
              <li>Temperature : ${temp} degree Celcius</li>
              <li>The Weather is ${desc}</li>
             
          </ul>
           
           
           </body>
           </html>
            
           `
        )
    })
    })
 

})


   
   
   


app.listen(3000,(err)=>{
    if(err)
    console.log('Error while loading the page',err);
    else
    console.log('success');

})