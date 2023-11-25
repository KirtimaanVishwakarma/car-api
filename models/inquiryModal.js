import mongoose from "mongoose";

const schema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  name: {
    type: String,
    required: [true, "username is required"],
  },
  contact: {
    type: Number,
    required: [true, "contact number is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const InquirySchema = mongoose.model("Inquiry", schema);
