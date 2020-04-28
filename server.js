// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

let rawnoteData = [];


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Routes for HTML
//--Home Page ROute
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
//--Notes Route 
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//-----API ROUTES-----------
//GET ROUTE
app.get("/api/notes", function (req, res) {

  try {
    rawnoteData = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8");

    rawnoteData = JSON.parse(rawnoteData);
  }
  catch (err) {
    //console.log(err);
    return err;
  }
  res.json(rawnoteData);

});

//POST ROUTE
app.post("/api/notes", function (req, res) {

  try {
    rawnoteData = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8");

    rawnoteData = JSON.parse(rawnoteData);

    req.body.id = rawnoteData.length;

    rawnoteData.push(req.body);

    rawnoteData = JSON.stringify(rawnoteData);

    fs.writeFile(path.join(__dirname, "./db/db.json"), rawnoteData, "utf8",
      function (err) {
        if (err) throw err;

      });

    res.json(JSON.parse(rawnoteData));

  }
  catch (err) {
    return err;
  }

});

//Delete Route

app.delete("/api/notes/:id", function (req, res) {
  try {
    rawnoteData = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8");

    rawnoteData = JSON.parse(rawnoteData);

    rawnoteData = rawnoteData.filter(function (note) {
      return note.id != req.params.id;
    });

    rawnoteData = JSON.stringify(rawnoteData);

    fs.writeFile(path.join(__dirname, "./db/db.json"), rawnoteData, "utf8",
      function (err) {
        if (err) throw err;

      });

    res.send(JSON.parse(rawnoteData));


  }
  catch (err) {
    throw err;
  }

});

app.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});











