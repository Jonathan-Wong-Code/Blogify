const { checkAuth, checkAdmin } = require("./../../utils/utils");
const User = require("./../../models/users");
const catchAsync = require("./../../utils/catchAsync");
const filterObj = (data, ...allowedFields) => {
  const filteredData = {};
  allowedFields.forEach(fieldKey => {
    if (Object.keys(data).includes(fieldKey)) {
      filteredData[fieldKey] = data[fieldKey];
    }
  });
  return filteredData;
};

module.exports = {
  async updateMe(
    parent,
    { data },
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);
    const filteredData = filterObj(data, "name", "email");

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        filteredData,
        {
          runValidators: true,
          new: true
        }
      );

      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  },

  async deleteMe(
    parent,
    args,
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { isActive: false },
      { runValidators: true, new: true }
    );

    return user;
  },

  updateUser: catchAsync(
    async (parent, { userId, data }, { request: { req } }, info) => {
      checkAuth(req);
      checkAdmin(req);
      const filteredObj = filterObj(data, "name", "email", "role", "isActive");

      const user = await User.findByIdAndUpdate(userId, filteredObj, {
        runValidators: true,
        new: true
      });

      if (!user) {
        throw new Error("404 User not found");
      }

      if (data.password && data.confirmPassword) {
        user.password = data.password;
        user.confirmPassword = data.confirmPassword;
        await user.save();
      }

      return user;
    }
  ),

  deactivateUser: catchAsync(
    async (parent, { id }, { request: { req } }, info) => {
      checkAdmin(req);
      checkAuth(req);

      const user = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { runValidators: true, new: true }
      );
      if (!user) {
        throw new Error("404 User not found");
      }

      return user;
    }
  )
};
