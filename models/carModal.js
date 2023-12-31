import mongoose from "mongoose";

const schema = new mongoose.Schema({
  brand: {
    name: {
      type: String,
      default: "tata",
    },
    logo: {
      public_id: {
        type: String,
        default: "public_id",
      },
      url: {
        type: String,
        default: "url",
      },
    },
  },
  images: {
    public_id: { type: String },
    url: { type: String },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  model: {
    type: String,
    required: [true, "Model is required"],
  },
  bodyType: {
    type: String,
    required: [true, "Body Type is required"],
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
  },
  engine: {
    type: Number,
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
      default: "petrol",
    },
  ],
  cylinder: {
    type: Number,
    default: 3,
  },
  transmission: {
    type: String,
    default: "manual",
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
  status: {
    type: String,
    default: "upcoming",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CarSchema = mongoose.model("Car", schema);
