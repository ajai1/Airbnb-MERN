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
  description: {
    type: String,
  },
  imageData: {
    type: Object,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Room;
