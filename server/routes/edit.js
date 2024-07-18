const express = require('express');
const router = express.Router();
const fs = require("fs");


router.put("/edit/:id", (req, res) => {
    const id_user = req.params.id;
    const updatedData = req.body;
  
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
  
      let found = false;
      jsonData = jsonData.map((item) => {
        if (item.id === id_user) {
          found = true;
          return { ...item, ...updatedData };
        }
        return item;
      });
  
      if (!found) {
        return res.status(404).send("No data found with the specified ID");
      }
  
      fs.writeFile(
        "data.json",
        JSON.stringify(jsonData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error writing file");
          }
  
          res.send(updatedData); // Returnează sarcina actualizată
        }
      );
    });
  });

  module.exports = router;