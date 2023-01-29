const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  followers: {
    type: Array,
    default: [],
  },

  following: {
    type: Array,
    default: [],
  },
})

module.exports = mongoose.model("User", userSchema);