// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/make", function (req, res) {
    res.sendFile(path.join(__dirname, "makereservation.html"));
});

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "viewreservation.html"));
});

// Display all tables
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Display wait list
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});


// Data Arrays
// ============================================================

let tables = [{
        "customerName": "Ahmed",
        "customerEmail": "ahmed@example.com",
        "customerID": "afhaque89",
        "phoneNumber": "000-000-0000"
    },
    {
        "customerName": "Tim",
        "phoneNumber": "323-316-4906",
        "customerEmail": "tim@gmail.com",
        "customerID": "tim123"
    }
];

let waitlist = [];



// GET and POST
// ============================

app.post("/api/tables", function (request, response) {
    // request.body is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newReservation = request.body;

    console.log(newReservation);

    tables.push(newReservation);

    waitlist.push(newReservation);

    // ????
    response.json(newReservation);
});

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var newReservation = {
        name: $("#InputName").val().trim(),
        phone: $("#phone").val().trim(),
        email: $("#exampleInputEmail1").val().trim(),
        uniqueid: $("#id").val().trim()
    };

    // Question: What does this code do??
    $.post("/api/tables", newReservation)
        .then(function (data) {
            alert("Your reservation has been made.");
        });


});




// Starts the server to begin listening
// =============================================================

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});