import mongoose from "mongoose";

const schema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "customer name is required"],
  },
  brand: {
    type: String,
    required: [true, "brand is required"],
  },
  model: {
    type: String,
    required: [true, "model is required"],
  },
  review: {
    type: String,
    required: [true, "customer review is required"],
  },
  image: {
    public_id: String, // Cloudinary public ID for the logo
    url: String, // URL to the logo image on Cloudinary
  },
});

export const ReviewSchema = mongoose.model("Review", schema);
