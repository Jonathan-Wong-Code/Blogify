const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../../utils/email");
const crypto = require("crypto");
const catchAsync = require("../../utils/catchAsync");
const { checkAuth } = require("../../utils/utils");

const createSendToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "90d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });

  return token;
};

module.exports = {
  signup: catchAsync(async (parent, { data }, { request: { res } }, info) => {
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
  }),

  login: catchAsync(async (parent, { data }, { request: { res } }, info) => {
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
  }),

  logout: catchAsync(async (parent, args, { request: { res } }, info) => {
    const token = jwt.sign("jwt", "loggedout");

    res.cookie("jwt", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1)
    });
    return { message: "Logging out..." };
  }),

  checkLoggedIn: catchAsync(async (parent, ctx, { request: { req, res } }) => {
    checkAuth(req);

    const token = createSendToken(req.user._id, res);
    return { token, user: req.user };
  }),

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
  },

  async resetPassword(
    parent,
    { data },
    {
      request: { res }
    },
    info
  ) {
    const { resetToken, password, confirmPassword } = data;
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({ passwordResetToken: hashedToken });
    if (!user) {
      throw new Error("Invalid token! Please try to reset again");
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();

    const token = createSendToken(user._id, res);

    return { token, user };
  },

  async updatePassword(
    parent,
    { data },
    {
      request: { res, req }
    },
    info
  ) {
    const { currentPassword, updatedPassword, confirmUpdatedPassword } = data;
    const isMatch = await req.user.verifyPassword(
      currentPassword,
      req.user.password
    );
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    req.user.password = updatedPassword;
    req.user.confirmPassword = confirmUpdatedPassword;
    await req.user.save();

    return { message: "Password updated!" };
  }
};
