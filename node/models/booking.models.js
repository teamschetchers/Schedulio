const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema(
  {
    bookingStartTime: {
      type: String,
      required: true,
    },
    bookingEndTime: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
