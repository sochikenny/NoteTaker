// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

let rawnoteData = [];


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/Develop/public'));

//Routes for HTML
//--Home Page ROute
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
  });
 //--Notes Route 
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
  });

//-----API ROUTES-----------
//GET ROUTE
app.get("/api/notes", function (req, res){

  try{
    rawnoteData = fs.readFileSync("/Develop/db/db.json", "utf8");

    rawnoteData = JSON.parse(rawnoteData);
  }
  catch (err){
    //console.log(err);
    return err;
  }
  res.json(rawnoteData);

});

//POST ROUTE
app.post("/api/notes", function (req, res){

  try{
    rawnoteData = fs.readFileSync("/Develop/db/db.json", "utf8");

    rawnoteData = JSON.parse(rawnoteData);

    req.body.id = rawnoteData.length;

    rawnoteData.push(req.body);

    rawnoteData = JSON.stringify(rawnoteData);

    fs.writeFile("/Develop/db/db.json", rawnoteData, "utf8", function (err){
      if (err) throw err;
    });
    
    res.json(JSON.parse(rawnoteData));

  }
  catch (err){
    return err; 
  }

});








  




