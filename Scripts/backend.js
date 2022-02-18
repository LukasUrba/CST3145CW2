var express = require("express");
var path = require("path");

var app = express();
var publicPath = path.join(__dirname, "../public/");
app.use(express.static(publicPath));

app.use(function (request, response, next) {
    console.log("Request IP: " + request.url);
    console.log("Request date: " + new Date());
    next();
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});