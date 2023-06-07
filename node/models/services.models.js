const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const servicesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },

    location: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    startTime: {
      type: String,
      require: true,
    },
    endTime: {
      type: String,
      require: true,
    },
    image: {
      public_id: { type: String, require: true },
      url: { type: String, require: true },
    },
  },
  {
    timestamps: true,
  }
);
const Services = mongoose.model("Services", servicesSchema);
module.exports = Services;
