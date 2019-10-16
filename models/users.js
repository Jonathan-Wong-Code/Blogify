const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    passwordResetToken: String
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

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

module.exports = mongoose.model("User", UserSchema);
