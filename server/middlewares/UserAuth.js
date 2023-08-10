const UserAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } 
      else {
        if (decodedToken.userId !== "Basic") {
          return res.status(401).json({ message: "Not authorized" });
        } 
        else 
        {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

module.exports = UserAuth;
