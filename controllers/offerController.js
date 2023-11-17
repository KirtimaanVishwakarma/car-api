import catchAsyncError from "../middleware/catchAsyncError.js";
import { CarSchema } from "../models/carModal.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeature.js";
import { OfferSchema } from "../models/offerModal.js";

export const createOffer = catchAsyncError(async (req, res, next) => {
  const { car, offerStartDate, offerEndDate, discountPercentage } = req.body;
  if (offerStartDate > offerEndDate) {
    return next(
      new ErrorHandler("End Date must be greater than start date", 400)
    );
  }
  const getCar = await CarSchema.findById(car);
  const discountPrice = ((100 - discountPercentage) / 100) * getCar.price;
  const offer = await OfferSchema.create({
    car,
    offerStartDate,
    offerEndDate,
    specialOfferPrice: discountPrice,
    discountPercentage,
  });
  getCar.status = "offer";
  await getCar.save();
  res.status(201).json({ success: true, offer });
});

export const getAllOffer = catchAsyncError(async (req, res, next) => {
  const resultPerPage = req.query.size || 10;
  const offerCount = await OfferSchema.countDocuments();

  const apiFeatures = new ApiFeatures(
    OfferSchema.find().populate("car"),
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

export const getOffer = async (req, res, next) => {
  const id = req.params.id;
  const offer = await OfferSchema.findById(id).populate("car");
  if (!offer) {
    return next(new ErrorHandler("brand not found", 400));
  }
  res.status(200).json({
    success: true,
    offer,
  });
};

export const updateOffer = catchAsyncError(async (req, res, next) => {
  let offer = await OfferSchema.findById(req.params.id);

  const { offerStartDate, offerEndDate, discountPercentage } = req.body;

  if (offerStartDate > offerEndDate) {
    return next(
      new ErrorHandler("End Date must be greater than start date", 400)
    );
  }
  let originalPrice =
    (100 / (100 - offer.discountPercentage)) * offer.specialOfferPrice;

  const discountPrice =
    ((100 - discountPercentage || offer.discountPercentage) / 100) *
    originalPrice;

  if (!offer) {
    return next(new ErrorHandler("offer not found", 400));
  }

  const updatedOffer = await OfferSchema.findByIdAndUpdate(
    req.params.id,
    { ...req.body, specialOfferPrice: discountPrice },
    { new: true }
  );
  if (!updatedOffer) {
    return next(new ErrorHandler("Updated offer not found", 400));
  }

  res.status(201).json({
    success: true,
    message: "offer updated succesfully",
  });
});

export const deleteOffer = catchAsyncError(async (req, res, next) => {
  let offer = await OfferSchema.findById(req.params.id);
  if (!offer) {
    return next(new ErrorHandler("offer not found", 400));
  }

  const car = await CarSchema.findById(offer.car._id);

  car.status = "most-searched";
  car.save();
  await offer.deleteOne();
  res.status(200).json({
    success: true,
    message: "offer deleted succesfully",
  });
});
