import mongoose from "mongoose";

const schema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  model: {
    type: String,
    required: [true, "Model is required"],
  },
  modelYear: {
    type: Number,
    required: [true, "Model year is required"],
  },
  mileage: {
    type: Number,
    required: [true, "Mileage is required"],
  },
  doors: {
    type: Number,
    default: 4,
  },
  condition: {
    type: String,
    default: "Used car",
  },
  engineSize: {
    type: Number,
    required: [true, "Engine CC is required"],
  },
  color: {
    type: String,
    required: [true, "color is required"],
  },
  repaire: {
    type: Boolean,
    default: false,
  },
  steering: {
    type: String,
    default: "right",
  },
  catacity: {
    type: Number,
    default: 4,
  },
  fuelType: [
    {
      type: String,
      default: "Petrol",
    },
  ],
  cylinder: {
    type: Number,
    required: [true, "No. of cylinder is required"],
  },
  transmission: {
    type: String,
    default: "Manual",
  },
  wheel: {
    type: Number,
    default: 4,
  },
  valveGear: {
    type: String,
  },
  induction: {
    type: String,
  },
  fuleInjection: {
    type: String,
  },
  power: {
    type: String,
  },
  engineLocation: {
    type: String,
    default: "front",
  },
  odometer: {
    type: Number,
    required: [true, "odometer is required"],
  },
  features: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CarSchema = mongoose.model("Car", schema);
