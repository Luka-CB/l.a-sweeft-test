const User = require("../models/User");
const generateToken = require("../config/utils");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) throw new Error("User Already Exists!");

    const newUser = await User.create({
      username,
      password,
    });

    if (!newUser) throw new Error("Registration Failed!");

    res.status(200).send("Registration Success");
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) throw new Error("Username is incorrect!");
    if (!(await user.matchPassword(password)))
      throw new Error("Password is incorrect!");

    res.status(200).json({
      token: generateToken(user.id, user.username),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
