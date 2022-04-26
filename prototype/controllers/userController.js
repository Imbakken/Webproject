const User = require("../schemas/userSchema");

const createUser = async (req, res) => {
  try {
    const user = await User.create({
        name: req.body.name,
        email: req.body.name,
        password: req.body.password 
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
      if (user.length !== 0) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("user not found");
    }
} catch (error) {
    res.json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.json(user);
} catch (err) {
    res.json({ message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.name,
        password: req.body.password,
      }
    );
    res.json(user);
} catch (error) {
    console.log(error.message);
    res.status(404).json("Id not found");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    await user.delete();
    res.json(user);
} catch (error) {
    console.log(error.message);
    res.status(404).json("User not found");
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};