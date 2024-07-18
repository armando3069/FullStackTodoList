const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid'); // Importă uuid

const app = express();
const port = 3008;

app.use(express.json());
app.use(cors());

// Get data from JSON
app.get("/get", (req, res) => {
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

// Delete data from JSON
app.delete("/delete/:id", (req, res) => {
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

// Add data to JSON
app.post("/add", (req, res) => {
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

// Edit data in JSON
app.put("/edit/:id", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});