var express = require("express");
var path = require("path");
var fs = require("fs");
const req = require("express/lib/request");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

var app = express();

app.use(cors());
app.use(express.json())

let db;
MongoClient.connect('mongodb+srv://lukas-urba:726694222462aA.@cst3145.grrhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
    db = client.db('webstore')
})

app.use(function (request, response, next) {
    console.log("Request IP: " + request.url);
    console.log("Request date: " + new Date());
    next();
});



// var imagePath = path.resolve(__dirname,"../Images");
// app.use(express.static(imagePath));

app.use(function (request, response, next) {
    var filePath = path.join(__dirname, "/..", request.url);
    console.log(filePath);
    fs.stat(filePath, function (error, fileInfo) {
        if (error) {
            response.send("This file does not exist.");
            next();
            return;
        }
        if (fileInfo.isFile()) response.sendFile(filePath);
        else next();
    });
});

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, '/../index.html'));
});

app.use(function (request, response) {
    response.status(404).send("This page has not been made yet!");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});