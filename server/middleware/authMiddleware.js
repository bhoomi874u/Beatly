const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
 console.log("Authorization Header")
 console.log(req.headers.authorization)
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    token = req.headers.authorization.split(" ")[1];
 console.log("received Token")
 console.log(token);
 console.log("JWT_SECRET")
 console.log(process.env.JWT_SECRET)
    try {

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      console.log("decoded Token")
      console.log(decoded);

      req.user = decoded.userId;
console.log("Middleware Passed", req.user)
      next();

    } catch (error) {

      return res.status(401).json({
        message: "Not authorized, invalid token",
      });

    }

  } else {
   console.log("No Authorization Header Found");

    return res.status(401).json({
      message: "Not authorized, no token",
    });

  }
};

module.exports = protect;