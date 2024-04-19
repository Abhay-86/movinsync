const mongoose = require('mongoose');

const floorPlanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: String,
    seats: [{
      seatNumber: {
        type: Number,
        required: true
      },
      occupied: {
        type: Boolean,
        default: false
      }
    }],
    rooms: [{
      roomNumber: {
        type: Number,
        required: true
      },
      capacity: {
        type: Number,
        required: true
      },
      booked: {
        type: Boolean,
        default: false
      }
    }],
  });

module.exports = mongoose.model("floor", floorPlanSchema);