import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Brand name is required"],
  },
  logo: {
    publicId: String, // Cloudinary public ID for the logo
    url: String, // URL to the logo image on Cloudinary
  },
});

export const BrandSchema = mongoose.model("Brand", schema);
