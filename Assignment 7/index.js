const express = require("express");
const port = process.env.PORT || 5023;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let items = [];
let high = [];
let medium = [];
let low = [];

// Helper to get the appropriate array by type
function getArrayByType(type) {
    switch (type) {
        case "high": return high;
        case "mid": return medium;
        case "low": return low;
        case "all": return items;
        default: return items;
    }
}

// Routes to render lists with the correct listType
app.get("/", function(req, res) {
    res.render("list", { ejes: items, listType: "all" });
});
app.get("/high", function(req, res) {
    res.render("list", { ejes: high, listType: "high" });
});
app.get("/mid", function(req, res) {
    res.render("list", { ejes: medium, listType: "mid" });
});
app.get("/low", function(req, res) {
    res.render("list", { ejes: low, listType: "low" });
});
app.get("/all", function(req, res) {
    res.render("list", { ejes: items, listType: "all" });
});

// Add new task
app.post('/', function (req, res) {
    const item = req.body.newValue || req.body.ele1;
    const priority = req.body.priority;

    switch (priority) {
        case "high":
            high.push(item);
            items.push(item);
            break;
        case "medium":
            medium.push(item);
            items.push(item);
            break;
        case "low":
            low.push(item);
            items.push(item);
            break;
        default:
            items.push(item);
            break;
    }
    res.redirect("/");
});

// Delete task
app.post('/delete', function(req, res) {
    const index = parseInt(req.body.index);
    const listType = req.body.listType || "all";
    const arr = getArrayByType(listType);

    if (!isNaN(index) && index >= 0 && index < arr.length) {
        const removed = arr.splice(index, 1)[0];
        if (listType !== "all") {
            // Remove from main items array
            const mainIndex = items.indexOf(removed);
            if (mainIndex !== -1) items.splice(mainIndex, 1);
            // Remove from other priority arrays as well
            if (listType !== "high") {
                const i = high.indexOf(removed);
                if (i !== -1) high.splice(i, 1);
            }
            if (listType !== "mid") {
                const i = medium.indexOf(removed);
                if (i !== -1) medium.splice(i, 1);
            }
            if (listType !== "low") {
                const i = low.indexOf(removed);
                if (i !== -1) low.splice(i, 1);
            }
        } else {
            // If deleting from "all", remove from all priority arrays
            const i1 = high.indexOf(removed);
            if (i1 !== -1) high.splice(i1, 1);
            const i2 = medium.indexOf(removed);
            if (i2 !== -1) medium.splice(i2, 1);
            const i3 = low.indexOf(removed);
            if (i3 !== -1) low.splice(i3, 1);
        }
    }
    res.redirect(req.get('referer') || '/');
});

// Edit task
app.post('/edit', function(req, res) {
    const index = parseInt(req.body.index);
    const newValue = req.body.newValue;
    const listType = req.body.listType || "all";
    const arr = getArrayByType(listType);

    if (!isNaN(index) && index >= 0 && index < arr.length && newValue) {
        const oldValue = arr[index];
        arr[index] = newValue;
        if (listType !== "all") {
            // Update in main items array
            const mainIndex = items.indexOf(oldValue);
            if (mainIndex !== -1) items[mainIndex] = newValue;
            // Update in other priority arrays as well
            if (listType !== "high") {
                const i = high.indexOf(oldValue);
                if (i !== -1) high[i] = newValue;
            }
            if (listType !== "mid") {
                const i = medium.indexOf(oldValue);
                if (i !== -1) medium[i] = newValue;
            }
            if (listType !== "low") {
                const i = low.indexOf(oldValue);
                if (i !== -1) low[i] = newValue;
            }
        } else {
            // If editing from "all", update in all priority arrays
            const i1 = high.indexOf(oldValue);
            if (i1 !== -1) high[i1] = newValue;
            const i2 = medium.indexOf(oldValue);
            if (i2 !== -1) medium[i2] = newValue;
            const i3 = low.indexOf(oldValue);
            if (i3 !== -1) low[i3] = newValue;
        }
    }
    res.redirect(req.get('referer') || '/');
});

app.listen(port, function(){
    console.log("Server started on port " + port);
});
