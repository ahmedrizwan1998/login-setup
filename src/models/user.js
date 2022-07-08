const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
    maxLength: [30, "User Name must be less the 30 letters"],
    minLength: [4, "User Name must be atleast 4 letters long"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [8, "Password must be 8 character long"],
  },
  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

// hashing password
userSchema.methods.hash = async function () {
  const a = await bcrypt.hash(this.password, 10);
  this.password = a;
};

// method to convert to json then remove password from object on display
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// create jwt token
userSchema.methods.createJwt = async function () {
  const time  = Date.now() + 24 * 60 * 60 * 1000;
  const token = await jwt.sign({ id: this._id }, 'shhhhh', {expiresIn: time});
  return token;
};

module.exports = mongoose.model("User", userSchema);
