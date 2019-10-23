exports.checkAuth = req => {
  if (!req.isAuth) {
    throw new Error("Must be authenticated");
  }
};

exports.checkAdmin = req => {
  if (req.user.role !== "admin") {
    throw new Error("Must be admin to perform that action");
  }
};
