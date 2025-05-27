const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5023;

var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

var items=[];
var high =[];
var medium=[];
var low=[];

app.get("/", function(req,res){
    res.render("list",{ejes: items})
});
app.get("/high", function(req,res){
    res.render("list",{ejes: high})
});app.get("/mid", function(req,res){
    res.render("list",{ejes: medium})
});app.get("/low", function(req,res){
    res.render("list",{ejes: low})
});
app.get("/all", function(req,res){
    res.render("list",{ejes: items})
});

app.post('/', function (req, res) {
    const item = req.body.ele1;
    const priority = req.body.priority;

    switch (priority) {
        case "high":
            high.push(item);
            items.push(item); // also add to main items list
            break;
        case "medium":
            medium.push(item);
            items.push(item); // also add to main items list
            break;
        case "low":
            low.push(item);
            items.push(item); // also add to main items list
            break;
        default:
            items.push(item); // no priority
            break;
    }

    res.redirect("/");
});


app.listen(port, function(){
    console.log("Server started");
});