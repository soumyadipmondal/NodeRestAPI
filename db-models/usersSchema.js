const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
    maxLength: [20, "Name cannot exceeds 20 chars"],
  },

  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [8, "Password cannot below 8 chars..."],
    select: false,
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  role: {
    type: String,
    enum: {
      values: ["User", "Employer"],
      message: "Please select correct role",
    },
    default: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);