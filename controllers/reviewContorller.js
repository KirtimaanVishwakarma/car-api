import catchAsyncError from "../middleware/catchAsyncError.js";
import { ReviewSchema } from "../models/reviewModal.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import ApiFeatures from "../utils/apiFeature.js";

export const createReview = catchAsyncError(async (req, res, next) => {
  const { customerName, brand, model, review } = req.body;
  const { file } = req.files;

  //upload file on cloudinary
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const newReview = await ReviewSchema.create({
    customerName,
    brand,
    model,
    review,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res
    .status(201)
    .json({ success: true, newReview, message: "New review add successfully" });
});

export const getAllReview = catchAsyncError(async (req, res, next) => {
  const resultPerPage = req.query.size || 10;
  const reviwCount = await ReviewSchema.countDocuments();

  const apiFeatures = new ApiFeatures(ReviewSchema.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let reviews = await apiFeatures.query;

  let filteredCount = reviews.length;

  res.status(200).json({
    success: true,
    list: reviews,
    totalElement: reviwCount,
    elements: reviews.length,
    size: Number(resultPerPage),
    filteredCount,
    page: Number(req.query.page) || 1,
  });
});

export const getReview = async (req, res, next) => {
  const id = req.params.id;

  const review = await ReviewSchema.findById(id);
  if (!review) {
    return next(new ErrorHandler(`review not found for the id: ${id}`, 400));
  }
  res.status(200).json({
    success: true,
    review,
  });
};

export const updateReview = catchAsyncError(async (req, res, next) => {
  const { file } = req.files;
  let review = await ReviewSchema.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorHandler(`review not found for the id :${req.params.id}`, 400)
    );
  }
  let image;
  if (file) {
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    await cloudinary.v2.uploader.destroy(car.images.public_id);
    image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const updatedReview = await CarSchema.findByIdAndUpdate(
    req.params.id,
    { ...req.body, image },
    { new: true }
  );
  if (!updatedReview) {
    return next(new ErrorHandler("Updated Review not found", 400));
  }
  res.status(201).json({
    success: true,
    message: "Review updated successfully",
    updatedReview,
  });
});

export const deleteReview = catchAsyncError(async (req, res, next) => {
  let review = await ReviewSchema.findById(req.params.id);
  if (!review) {
    return next(new ErrorHandler(`Review not found for the id:${id}`, 400));
  }
  if (review.image?.public_id) {
    await cloudinary.v2.uploader.destroy(review.image.public_id);
  }
  await review.deleteOne();
  res.status(200).json({
    success: true,
    message: "Review deleted succesfully",
  });
});
