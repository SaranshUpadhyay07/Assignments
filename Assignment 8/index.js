const express = require("express");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://upadhyaysaransh0704:gq3TByeciXuWhdLk@cluster0.7yooyrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const trySchema = new mongoose.Schema({
    name: String,
    priority: String
});

const item = mongoose.model("task", trySchema);

app.get("/", async function(req, res) {
    try {
        const foundIt = await item.find({});
        res.render("list", { dayej: foundIt });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});

app.post("/", async function(req, res) {
    if (!req.body.ele1) {
        return res.status(400).send("Task name is required");
    }

    const priority = req.body.priority;
    let priorityValue = "none";

    switch (priority) {
        case "high": priorityValue = "High"; break;
        case "medium": priorityValue = "Medium"; break;
        case "low": priorityValue = "Low"; break;
        default: priorityValue = "None";break; 
    }

    try {
        const todoi = new item({
            name: req.body.ele1,
            priority: priorityValue
        });
        await todoi.save();
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding data");
    }
});


app.post("/delete", async function(req, res) {
    try {
        const checked = req.body.checkbox1;
        // Check if checked is not empty or undefined
        if (!checked) {
            return res.status(400).send("No item selected to delete");
        }
        // Delete the item
        await item.findByIdAndDelete(checked);
        res.redirect("/"); // Redirect back to the main page
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting item");
    }
});

app.post("/high", async function(req,res){
     try {
        const highitem = await item.find({priority:"High"});
        res.render("list", { dayej: highitem });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});
app.post("/medium", async function(req,res){
     try {
        const miditem = await item.find({priority:"Medium"});
        res.render("list", { dayej: miditem });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});
app.post("/low", async function(req,res){
     try {
        const lowitem = await item.find({priority:"Low"});
        res.render("list", { dayej: lowitem });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});
app.post("/none", async function(req,res){
     try {
        const allitem = await item.find({});
        res.render("list", { dayej: allitem });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});

app.post('/update', async (req, res) => {
    const { id, updatedTask, updatedPriority } = req.body;
    await item.findByIdAndUpdate(id, { 
        name: updatedTask,
        priority: updatedPriority
    });
    res.redirect('/');
});


app.post("/remove", function(req, res) {
    const id  = req.body.id;
    item.findByIdAndDelete(id)
        .then(function(deletedItem) {
            res.redirect("/");
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error deleting item");
        });
});
app.listen("3000", function(){
    console.log("server is running ");
})
