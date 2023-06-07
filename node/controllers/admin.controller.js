const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Service = require("../models/services.models");
const User = require("../models/user.models");
const Booking = require("../models/booking.models");
const { storage } = require("../cloudinary");
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer({ storage: storage });
const jwt = require("jsonwebtoken");

const adminRouter = express.Router();
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.windows1,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error(err);
  } else console.log("Your config is correct");
});

adminRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { password, email } = req.body;
    if (!(email && password)) {
      return res
        .status(404)
        .json({ message: "Please enter email and password.", status: 404 });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User doesn't exist.", status: 404 });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = await user.generateAuthToken();
    user.token = token;
    res.send(user);
  })
);
adminRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, password, email } = req.body;
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res
          .status(404)
          .json({ message: "Email already existed.", status: 404 });
      }
      let user = await User.create({
        name,
        email,
        password,
      });
      let token = user.generateAuthToken();
      user = { ...user?._doc, token };
      if (user) {
        const verificationToken = jwt.sign(
          { ID: user._id },
          "somethingsecret",
          {
            expiresIn: "7d",
          }
        );

        // Step 3 - Email the user a unique verification link
        const url = `http://localhost:5000/api/admin/verify/${verificationToken}`;
        console.log(url);
        transporter.sendMail({
          to: email,
          subject: "Verify Account",
          html: `Click <a href = '${url}'>here</a> to confirm your email.`,
        });
        return res.status(201).send({
          message: `Verification email has been sent to ${email}`,
        });
      }
      // res.send(user);
    } catch (err) {
      console.log(err);
    }
  })
);

adminRouter.get(
  "/verify/:token",
  expressAsyncHandler(async (req, res) => {
    const { token } = req.params;
    console.log(token);
    // Check we have an id
    if (!token) {
      return res.status(422).send({
        message: "Missing Token",
      });
    }
    // Step 1 -  Verify the token from the URL
    let payload = null;
    try {
      payload = jwt.verify(token, "somethingsecret");
    } catch (err) {
      return res.status(500).send(err);
    }
    console.log("payload", payload);
    try {
      // Step 2 - Find user with matching ID
      const user = await User.findOne({ _id: payload.ID })
        .then(async (u) => {
          u.verified = true;
          await u.save();
          return res.status(200).send({
            message: "Account Verified",
          });
        })
        .catch((e) => {
          return res.status(404).send({
            message: "User does not  exists",
          });
        });

      // Step 3 - Update user verification status to true
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

adminRouter.get(
  "/createadmin",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.query;
    if (name && email && password) {
      try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
          return res
            .status(404)
            .json({ message: "Email already existed.", status: 404 });
        }

        let user = await User.create({
          name,
          email,
          password,
          role: "admin",
        });
        let token = user.generateAuthToken();
        user = { ...user?._doc, token };
        res.send(user);
      } catch (err) {
        console.log(err);
      }
    } else {
      res
        .status(401)
        .json({ message: "You dont have permission to access this" });
    }
  })
);

adminRouter.post(
  "/logingoogle",
  expressAsyncHandler(async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { name, email } = req.body.response;

    try {
      const existingUser = await User.findOne({
        email: email,
      });

      if (existingUser) {
        return res.status(201).send({
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          token: existingUser.generateAuthToken(),
        });
      }
      if (!existingUser) {
        const user = await User.create({
          name: name,

          email: email,
          password: "",
        });
        return res.status(201).send({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: user.generateAuthToken(),
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err, status: 500 });
    }
  })
);

adminRouter.post(
  "/createService",
  upload.single("media"),
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, location, startTime, endTime, service } = req.body;
      let image;

      if (req.file) {
        image = { public_id: req.file.filename, url: req.file.path };
      }
      const newService = await Service.create({
        name: title,
        location,
        category: service,
        startTime,
        endTime,
        image,
      }).then((s) => {
        res.send(s);
      });
    } catch (err) {
      console.log("error", err);
      return res.status(500).send(err);
    }
  })
);

adminRouter.post(
  "/updateService/:id",
  upload.single("media"),
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, location, startTime, endTime, service } = req.body;
      let image;

      let s = await Service.findOne({ _id: req.params.id });
      if (service) {
        if (req.file) {
          image = { public_id: req.file.filename, url: req.file.path };
        }

        s.name = title || s.title;
        s.location = location || s.location;
        s.category = service || s.category;
        s.startTime = startTime || s.startTime;
        s.endTime = endTime || s.endTime;
        s.image = image || s.image;

        s.save();
        res.send(s);
      }
    } catch (err) {
      console.log("error", err);
      return res.status(500).send(err);
    }
  })
);

adminRouter.get(
  "/services",
  expressAsyncHandler(async (req, res) => {
    try {
      const service = await Service.find().then((s) => {
        res.json(s);
      });
    } catch (err) {
      console.log("error", err);
      return res.status(500).send(err);
    }
  })
);

adminRouter.get(
  "/bookings",
  expressAsyncHandler(async (req, res) => {
    Booking.find({ $or: [{ status: "pending" }, { status: "waiting" }] })

      .then(async (booking) => {
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
adminRouter.get(
  "/allbookings",
  expressAsyncHandler(async (req, res) => {
    Booking.find()
      .then(async (booking) => {
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

adminRouter.get(
  "/allbookingsofservice/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    Booking.find({ status: "confirmed", service: req.params.id })
      .then(async (booking) => {
        res.json(booking);
      })
      .catch((e) => console.log(e));
  })
);

adminRouter.get(
  "/completeStatus/:id",
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findOne({ _id: req.params.id });

    booking.status = "completed";
    await booking.save();
    Booking.find()
      .then(async (booking) => {
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

adminRouter.post(
  "/updateStatus",
  expressAsyncHandler(async (req, res) => {
    try {
      function convertTimeToMinutes(time) {
        const [, hh, mm] = time.match(/(\d{2}):(\d{2})/);
        const minutes = parseInt(hh, 10) * 60 + parseInt(mm, 10);
        return minutes;
      }
      const booking = await Booking.findOne({ _id: req.body.serviceId });
      console.log("booking", booking);
      if (booking) {
        if (req.body.status === "accepted") {
          booking.status = "confirmed";
          await booking.save();

          const booked = await Booking.find({
            $or: [{ status: "pending" }, { status: "waiting" }],
            service: booking.service,
          }).populate("user");
          const r = booked?.filter(
            async (slot) =>
              (convertTimeToMinutes(booking.bookingStartTime) >
                convertTimeToMinutes(slot.bookingStartTime) &&
                convertTimeToMinutes(booking.bookingStartTime) <
                  convertTimeToMinutes(slot.bookingEndTime)) ||
              (convertTimeToMinutes(booking.bookingEndTime) >
                convertTimeToMinutes(slot.bookingStartTime) &&
                convertTimeToMinutes(booking.bookingEndTime) <
                  convertTimeToMinutes(slot.bookingEndTime)) ||
              (convertTimeToMinutes(booking.bookingStartTime) <
                convertTimeToMinutes(slot.bookingStartTime) &&
                convertTimeToMinutes(booking.bookingEndTime) >
                  convertTimeToMinutes(slot.bookingEndTime))
          );

          if (r) {
            console.log("RRRR,", r);
            for (let i = 0; i < r.length; i++) {
              const b = await Booking.findOne({
                _id: r[i]._id,
                service: r[i].service,
              });
              console.log("b", b);
              b.status = "rejected";
              await b.save();

              transporter.sendMail({
                to: booked[i]?.user?.email,
                subject: "Change Your Booking Time",
                html: `We are sorry to inform you that your booking time is already booked by someone else. Please Update your booking Time <br/> <br/> Thank you`,
              });
            }
          }
        } else {
          booking.status = "rejected";
          await booking.save();
        }
        Booking.find({ $or: [{ status: "pending" }, { status: "waiting" }] })
          .then(async (b) => {
            let arr = [];
            for (let i = 0; i < b.length; i++) {
              const service = await Service.findOne({ _id: b[i].service });
              arr.push({ ...b[i]._doc, serviceDetails: service });
            }
            res.json(arr);
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  })
);

module.exports = adminRouter;
