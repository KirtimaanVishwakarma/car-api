import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  logo: {
    public_id: String, // Cloudinary public ID for the logo
    url: String, // URL to the logo image on Cloudinary
  },
});

export const BrandSchema = mongoose.model("Brand", schema);
