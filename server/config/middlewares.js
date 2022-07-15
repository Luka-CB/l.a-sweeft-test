const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized!");
    }
  }
};

const checkContactInfo = async (req, res, next) => {
  const { name, number } = req.body;

  const onlyNumbers = /^[0-9]/.test(number);
  const onlyLetters = /^[a-zA-Z\s]+$/.test(name);

  try {
    if (!onlyNumbers)
      throw new Error("Number Input Should Contain Only Numbers!");
    if (!onlyLetters)
      throw new Error("Name Input Should Contain Only Letters!");

    next();
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

module.exports = {
  auth,
  checkContactInfo,
};
