const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Importă uuid

const fs = require("fs");

// Add data to JSON
router.post("/add", (req, res) => {
    const newData = { ...req.body, id: uuidv4() }; // Adaugă un ID unic
  
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error reading file");
      }
  
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return res.status(500).send("Error parsing JSON");
      }
  
      jsonData.push(newData);
  
      fs.writeFile(
        "data.json",
        JSON.stringify(jsonData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error writing file");
          }
  
          res.send(newData); // Returnează noua sarcină adăugată
        }
      );
    });
  });

  module.exports = router;