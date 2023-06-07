const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Service = require("../models/services.models");
const User = require("../models/user.models");
const Booking = require("../models/booking.models");

const userRouter = express.Router();

userRouter.post(
  "/createBooking",
  expressAsyncHandler(async (req, res) => {
    const { userId, serviceId, startTime, endTime } = req.body;

    function convertTimeToMinutes(time) {
      const [, hh, mm] = time.match(/(\d{2}):(\d{2})/);
      const minutes = parseInt(hh, 10) * 60 + parseInt(mm, 10);
      return minutes;
    }
    const booked = await Booking.find({ service: serviceId });
    let booking;
    const r = booked?.find(
      (slot) =>
        (convertTimeToMinutes(startTime) >
          convertTimeToMinutes(slot.bookingStartTime) &&
          convertTimeToMinutes(startTime) <
            convertTimeToMinutes(slot.bookingEndTime)) ||
        (convertTimeToMinutes(endTime) >
          convertTimeToMinutes(slot.bookingStartTime) &&
          convertTimeToMinutes(endTime) <
            convertTimeToMinutes(slot.bookingEndTime)) ||
        (convertTimeToMinutes(startTime) <
          convertTimeToMinutes(slot.bookingStartTime) &&
          convertTimeToMinutes(endTime) >
            convertTimeToMinutes(slot.bookingEndTime))
    );

    if (r) {
      booking = await Booking.create({
        bookingStartTime: startTime,
        bookingEndTime: endTime,
        user: userId,
        service: serviceId,
        status: "waiting",
      });
    } else {
      booking = await Booking.create({
        bookingStartTime: startTime,
        bookingEndTime: endTime,
        user: userId,
        service: serviceId,
        status: "pending",
      });
    }
    res.status(201).send({ booking, message: "Booking created successfully" });
  })
);
userRouter.get(
  "/bookings/:id",
  expressAsyncHandler(async (req, res) => {
    Booking.find({ user: req.params.id })
      .populate("user")
      .then(async (booking) => {
        console.log("booking", booking);
        let arr = [];
        for (let i = 0; i < booking.length; i++) {
          const service = await Service.findOne({ _id: booking[i].service });
          arr.push({ ...booking[i]._doc, serviceDetails: service });
        }
        res.json(arr);
      })
      .catch((e) => console.log(e));
  })
);

module.exports = userRouter;
