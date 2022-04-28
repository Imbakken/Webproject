const express = require("express");
//const auth = require('./routes/auth')
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDB = require("./dbconnect");
const app = express();
connectDB();
app.use(express.json());

//app.use('/auth', auth);

app.use("/users", require("./routes/userRoutes"));

app.listen(3000, () => {
  console.log(`server working and listening at ${PORT}`);
});