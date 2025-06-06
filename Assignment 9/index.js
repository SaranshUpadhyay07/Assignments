const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const encrypt = require('mongoose-encryption');

const app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const mongoose = require ('mongoose');
mongoose.connect("mongodb+srv://upadhyaysaransh0704:9KhHMrHtYyCTWmzs@clustersecrets.sjns2vp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSecrets");
const trySchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    Secret: String
});
const secret = "thisisasecret";
trySchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});

const item = mongoose.model("second",trySchema);

app.get("/",function(req,res){
    res.render("home");
});
app.get("/login", function(req,res){
    res.render("login");
});
app.get("/register", function(req,res){
    res.render("register");
});
app.get("/logout",function(req,res){
    res.render("home");
});

app.post("/register",function(req,res){
    const newUser = new item({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save().then(function(){
        res.render("login");
    }).catch(function(err){
        console.log(err);
    })
});

app.post("/login",function(req,res){
    const username = req.body.email;
    const password = req.body.password;
    item.findOne({email:username}).then(function(user){
        if(user.password === password){
            res.render("secrets", { user });
        }
    }).catch(function(err){
        console.log(err);
    }) 
})

app.post("/update",function(req,res){
    const username = req.body.name;
    const email = req.body.email;
    const secret = req.body.secret;
    item.updateOne({name:username, email:email},
        {$set:{Secret:req.body.secret}}
    ).then(function(){
    item.findOne({name:username,email:email}).then(function(user){
        res.render("secrets", { user });
    }).catch(function(err){
        console.log(err);
    }) 
    }).catch(function(err){
        console.log(err);
    })
});

app.listen(3000, function(){
    console.log("Server Running");
})