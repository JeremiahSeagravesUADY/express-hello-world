const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const { Dentist } = require("./routes/index");

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use("/api/v1/dentist", Dentist);

module.exports = app;