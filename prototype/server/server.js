const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const mainRoutes = require("./Routes/routes");
const connectDB = require("./connectDB");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(mainRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Your app is listening on http://localhost:${PORT}`);
});