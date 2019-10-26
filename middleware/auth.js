const jwt = require("jsonwebtoken");
const User = require("./../models/users");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    token = req.headers.cookie.split("jwt=")[1];
  }

  if (!token) {
    req.isAuth = false;
    return next();
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById({ _id: decoded.id });

  if (!user) {
    req.isAuth = false;
    return next();
  }

  const passwordChanged = user.checkPasswordChanged(decoded.iat);
  if (passwordChanged) {
    req.isAuth = false;
    return next();
  }

  req.user = user;
  req.isAuth = true;
  next();
};
