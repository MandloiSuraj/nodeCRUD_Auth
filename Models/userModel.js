const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Hash the password only if it has  been modified(or is new )
  if (!user.isModified("password")) return next();
  try {
    // hash password generation
    // slat generate
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashPassword = await bcrypt.hash(user.password, salt);

    // over ride the plain password with the hashed one
    user.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.post("save", function () {
  console.log("User is successfully saved in the database");
});

userSchema.methods.comparePassword = async function (condidatePassword) {
  try {
    const isMatch = await bcrypt.compare(condidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
