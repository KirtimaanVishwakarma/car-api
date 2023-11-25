import catchAsyncError from "../middleware/catchAsyncError.js";
import { CarSchema } from "../models/carModal.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeature.js";
import { InquirySchema } from "../models/inquiryModal.js";

export const createInquiry = catchAsyncError(async (req, res, next) => {
  const { carId, name, email, contact, message } = req.body;
  if (!carId || !name || !email || !contact || !message) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const offer = await InquirySchema.create(req.body);
  res.status(201).json({ success: true, offer });
});

export const getAllInquiry = catchAsyncError(async (req, res, next) => {
  const resultPerPage = req.query.size || 10;
  const offerCount = await InquirySchema.countDocuments();

  const apiFeatures = new ApiFeatures(
    InquirySchema.find().populate("carId"),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  let offer = await apiFeatures.query;

  let filteredCount = offer.length;

  res.status(200).json({
    success: true,
    list: offer,
    totalElement: offerCount,
    elements: offer.length,
    size: Number(resultPerPage),
    filteredCount,
    page: Number(req.query.page) || 1,
  });
});

export const getInquiry = async (req, res, next) => {
  const id = req.params.id;
  const offer = await InquirySchema.findById(id).populate("carId");
  if (!offer) {
    return next(new ErrorHandler("Inquiry is not found", 400));
  }
  res.status(200).json({
    success: true,
    offer,
  });
};

export const updateInquiry = catchAsyncError(async (req, res, next) => {
  let offer = await InquirySchema.findById(req.params.id);
  if (!offer) {
    return next(new ErrorHandler("Inquiry not found", 400));
  }

  const updatedOffer = await InquirySchema.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  if (!updatedOffer) {
    return next(new ErrorHandler("Updated inquiry not found", 400));
  }

  res.status(201).json({
    success: true,
    message: "offer updated succesfully",
  });
});

export const deleteInquiry = catchAsyncError(async (req, res, next) => {
  let offer = await InquirySchema.findById(req.params.id);
  if (!offer) {
    return next(new ErrorHandler("Inquiry not found", 400));
  }

  await offer.deleteOne();
  res.status(200).json({
    success: true,
    message: "Inquiry deleted succesfully",
  });
});
