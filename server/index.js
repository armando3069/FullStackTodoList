const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); // Importă uuid
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const addRoute = require('./routes/add');
const deleteRoute = require('./routes/delete');
const editRoute = require('./routes/edit');
const getRoute = require('./routes/get');

app.use('/', addRoute);
app.use('/', deleteRoute);
app.use('/', editRoute);
app.use('/', getRoute);

module.exports = app;