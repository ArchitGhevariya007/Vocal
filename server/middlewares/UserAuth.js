const jwt = require("jsonwebtoken");

const UserAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.error(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = UserAuth;
