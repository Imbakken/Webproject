const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.db_connection);
    console.log("connected to db using env");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;