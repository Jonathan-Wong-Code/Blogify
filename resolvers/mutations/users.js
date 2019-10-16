const { checkAuth } = require("./../../utils/utils");
const User = require("./../../models/users");

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
  }
};
