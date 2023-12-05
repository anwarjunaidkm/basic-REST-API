const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let decodeToken;
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    decodeToken = await jwt.verify(token, "secret");
    if (!decodeToken) {
      return res.status(500).json({
        message: "Invalid token",
      });
    }

    req.userid = decodeToken.userid;
    req.name = decodeToken.name;
    next();
  } catch (error) {
    res.status(500).json({
      message: "cannot verify token",
    });
  }
};
