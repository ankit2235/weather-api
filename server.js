const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");




const app = express();

app.use(bodyParser.urlencoded({extended : true}));

 app.get("/",function(req,res){
 	res.sendFile(__dirname+"/index.html");
 });

 app.post("/",function(req,res){
 	
 	const querry = req.body.cityname;
 	const appid = "cb4d1e0300bbf1181d1c4aca92163ed9";
 	const unit = "metric";


 const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid="+appid+"&units="+unit;
 https.get(url , function(response){
 	console.log(response.statusCode);

 	response.on("data",function(data){
 		const weatherdata = JSON.parse(data);
 		const condition = weatherdata.weather[0].description;
 		const temp = weatherdata.main.temp;
 		const icon =  weatherdata.weather[0].icon;
 		const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
 		
 		res.write("<h1> the weather status is : "+condition+"</h1>");
 		res.write("<h1>the temprature in "+querry+" is "+temp+ "degree celcius</h1>");
 		res.write("<img src="+imageURL+">");
 		res.send();
 	});

 });
 });

 	

 


app.listen(3020,function(){

	console.log("server started on port 3020");
});