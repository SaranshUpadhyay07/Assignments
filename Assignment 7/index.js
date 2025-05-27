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

app.post('/', function(req,res){
    var item = req.body.ele1;
    items.push(item);
    res.redirect("/")
})

app.listen(port, function(){
    console.log("Server started");
});