const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    number: {
      type: String,
    //   required: true
    },
    password: {
        type: String,
        required: true
    }
    // You can add more fields as needed
    // createdAt: {
    //   type: Date,
    //   default: Date.now
    // }
  });

module.exports = mongoose.model("users", userSchema);