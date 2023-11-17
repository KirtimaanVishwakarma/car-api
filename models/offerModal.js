import mongoose from "mongoose";

const schema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },

  specialOfferPrice: {
    type: Number,
  },
  offerStartDate: {
    type: Date,
  },
  offerEndDate: {
    type: Date,
  },
  discountPercentage: {
    type: Number,
    required: [true, "Discount required"],
  },
});

export const OfferSchema = mongoose.model("Offer", schema);
