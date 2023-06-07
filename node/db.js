const mongoose = require("mongoose");

const url =
"mongodb+srv://jawwadhussain895:teL1LTqOpTFafzAS@cluster0.rtotqnw.mongodb.net/test";

const db = () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch {
    console.log("db not connected");
  }
};

module.exports = db;
