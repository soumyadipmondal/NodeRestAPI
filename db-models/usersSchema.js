const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    unique: true,
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

/* Encyrption of password before saving */

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
