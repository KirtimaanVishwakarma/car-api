import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username is required"],
  },
  contact: {
    type: Number,
    required: [true, "contact number is required"],
  },
  subject: {
    type: String,
    required: [true, "subject is required"],
  },
  email: {
    type: String,
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

export const ContactSchema = mongoose.model("Contact", schema);
