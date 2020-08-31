const mongoose = require("mongoose");
const validator = require("validator");

const Room = mongoose.model("Room", {
  type: {
    type: String,
  },
  beds: {
    type: Number,
  },
  price: {
    type: Number,
  },
  guests: {
    type: Number,
  },
  cancellation: {
    type: Boolean,
  },
  location: {
    type: String,
  },
  availableFrom: {
    type: Date,
  },
  availableTill: {
    type: Date,
  },
  imageName: {
    type: String,
    default: "none",
  },
  imageData: {
    type: Object,
  },
});

module.exports = Room;
