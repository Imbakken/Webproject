const express = require("express");
const app = express();
//const auth = require('./routes/auth')
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(cors());
const connectDB = require("./dbconnect");
connectDB();
app.use(express.json());

//app.use('/auth', auth);

app.use("/users", require("./routes/userRoutes"));

app.listen(5000, () => {
  console.log(`server working and listening at ${PORT}`);
});