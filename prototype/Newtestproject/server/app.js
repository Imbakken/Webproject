const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const connectDB = require("./db");

const cors = require("cors");
const dotenv = require("dotenv").config();

const users = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', users);

//app.use(mainRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Your app is listening on http://localhost:${PORT}`);
});