//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const sql = require('mssql')

// Setting Base directory
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


//Router
var userRouter= require('./router/user');
var WEB_BannerRouter= require('./router/WEB_Banner');
var testKeingtb1Router= require('./router/testKeingtb1');
var testKeingtbCacKhoanThuRouter= require('./router/testKeingtbCacKhoanThu');
var DanhGiaTreHangNgayRouter= require('./router/DanhGiaTreHangNgay');

//CORS Middleware
app.use(function (req, res, next) {
    // var token=req.headers.Authorization;
    // var TrueValueToken="ValueToken";
    // if(token && token==TrueValueToken)
    //   {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    //     next();
    //   }
    // else{
    //   var WrongTokenRes="Invalid Token on Header. Current Token value: "+token;
    //   res.json(WrongTokenRes);
    // }


    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    
    next();

    //Enabling CORS 
});

//Setting up server
 var server = app.listen(process.env.PORT || 8888, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Function to connect to database and execute query

// app.get('/api/user', function (req, res) {
// 	var query = "select * from ChatLuongGiaoDuc";
// 	executeQuery (res, query);
//   });
// app.get("/api/user ", function(req , res){
// 	var query = "select * from Users";
// 	executeQuery (res, query);
// });

//POST API
app.post("/api/user", userRouter);
app.post("/api/WEB_Banner", WEB_BannerRouter);
app.post("/api/testKeingtb1", testKeingtb1Router);
app.post("/api/testKeingtbCacKhoanThu", testKeingtbCacKhoanThuRouter);
app.post("/api/DanhGiaTreHangNgay", DanhGiaTreHangNgayRouter);


// app.post(path, function(req , res){
// 	switch(path){
// 		case "/api/user":
// 			console.log('path',path);
// 			break;
// 		default:
// 			break;
// 	}
// });


//PUT API
 app.put("/api/user/:id", function(req , res){
	var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
	executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
	var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
	executeQuery (res, query);
});
