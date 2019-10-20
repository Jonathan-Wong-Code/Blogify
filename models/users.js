const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "An account already exists with this email"],
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },

        message: "Please enter a valid email"
      },
      trim: true
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be at least 8 characters"]
    },

    confirmPassword: {
      type: String,
      required: [true, "Please confirm password"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator(value) {
          return value === this.password;
        },

        message: "Passwords do not match"
      }
    },

    passwordChangedAt: Date,
    passwordExpiry: Date,
    passwordResetToken: String,

    isActive: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author"
});

UserSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author"
});

UserSchema.methods.toJSON = function() {
  const returnedData = this.toObject();
  delete returnedData.password;

  return returnedData;
};

UserSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    return next();
  }

  next();
});

UserSchema.pre("save", async function(next) {
  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
    return next();
  }

  next();
});

UserSchema.pre(/^find/, function(next) {
  this.find({ isActive: true });
  next();
});

UserSchema.methods.verifyPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.checkPasswordChanged = function(jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return jwtTimestamp < changedTime;
  }
};

UserSchema.methods.createPasswordResetToken = function() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetToken = hashedToken;
  this.passResetExpiry = Date.now() + 10 * 60 * 1000;

  return token;
};

module.exports = mongoose.model("User", UserSchema);
