const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    token: "some-token",
  });

  const userData = await user.save();
  res.status(201).json({
    message: "sigin user successfully",
    user: userData,
  });
  return;
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(404).json({ message: "invalid password" });
  }

  const token = await jwt.sign(
    {
      email: email,
      userid: user._id.toString(),
      name: user.name,
    },
    "secret",
    { expiresIn: "1h" }
  );

  res.status(200).json({
    userid: user._id.toString(),
    name: user.name,
    token: token,
  });
};
