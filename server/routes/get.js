const express = require('express');
const router = express.Router();

const fs = require("fs");

router.get("/get", (req, res) => {
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
  
      res.json(jsonData);
    });
  });

  module.exports = router;