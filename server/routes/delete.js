const express = require('express');
const router = express.Router();

const fs = require("fs");


// Delete data from JSON
router.delete("/delete/:id", (req, res) => {
    const id_user = req.params.id;
  
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
  
      const originalLength = jsonData.length;
      jsonData = jsonData.filter((item) => item.id !== id_user);
  
      if (jsonData.length === originalLength) {
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
  
          res.send("Data deleted successfully");
        }
      );
    });
  });

  module.exports = router;