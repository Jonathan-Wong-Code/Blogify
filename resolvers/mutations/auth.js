const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../../utils/email");
const crypto = require("crypto");

const createSendToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "90d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    expiry: Date.now() + 24 * 60 * 60 * 1000
  });

  return token;
};

module.exports = {
  signup: async (parent, { data }, { request: { res } }, info) => {
    const { name, email, password, confirmPassword } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Account exists with this email");
    }

    const user = await User.create({
      name,
      email,
      password,
      confirmPassword
    });

    const token = createSendToken(user._id, res);
    return { user, token };
  },

  login: async (parent, { data }, { request: { res } }, info) => {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email/password try again");
    }
    const isMatch = await user.verifyPassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email/password try again");
    }

    const token = createSendToken(user._id, res);
    return { user, token };
  },

  logout: async (parent, args, { request: { res } }, info) => {
    const token = jwt.sign("badidea", "not a good secret");

    res.cookie("jwt", token, {
      httpOnly: true,
      expiry: Date.now() + 1
    });

    return { message: "Logging out..." };
  },

  async forgotPassword(
    parent,
    { email },
    {
      request: { req }
    },
    info
  ) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No email associated with that account");
      }

      const token = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      const message = `Forgot your password? Head over ${
        req.protocol
      }://${req.get("host")}/resetPassword/${token}`;

      await sendEmail({
        email,
        subject: "Reset password",
        message
      });

      return { message: "Password reset sent" };
    } catch (error) {
      throw new Error(error);
    }
  }
};
