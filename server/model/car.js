const { Schema, model } = require("mongoose");
const validator = require("validator");
const car = new Schema(
  {
    car_name: {
      type: String,
      trim: true,
      required: [true, " car name is not required!"],
    },
    car_images: {
      type: String,
      trim: true,
      default: "",
    },
    description:{
        type: String,
        trim: true,
        default: "",
    },
    model_no: {
      type: String,
      trim: true,
      index: true,
      default: "",
    },

    car_type: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const Car = model("car", car);
module.exports = Car;
