const mongoose = require("mongoose");

const userScema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim:true
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScema);
module.exports = User;


