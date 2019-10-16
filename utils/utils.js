exports.checkAuth = req => {
  if (!req.isAuth) {
    throw new Error("Must be authenticated");
  }
};
