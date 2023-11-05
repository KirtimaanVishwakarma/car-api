import catchAsyncError from "../middleware/catchAsyncError.js";
import { BrandSchema } from "../models/brandModal.js";
import { CarSchema } from "../models/carModal.js";
import ApiFeatures from "../utils/apiFeature.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const createCar = catchAsyncError(async (req, res, next) => {
  const {
    brand,
    price,
    model,
    modelYear,
    mileage,
    engineSize,
    color,
    cylinder,
    features,
    doors,
    condition,
    repaire,
    steering,
    catacity,
    fuelType,
    odometer,
    transmission,
    wheel,
    valveGear,
    induction,
    fuleInjection,
    power,
    engineLocation,
  } = req.body;
  const { file } = req.files;
  if (
    !price ||
    !model ||
    !modelYear ||
    !mileage ||
    !engineSize ||
    !color ||
    !cylinder ||
    !features ||
    !odometer
  ) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  //upload file on cloudinary

  const fileUri = getDataUri(file);
  const brandDetails = await BrandSchema.findOne({ name: brand });
  if (!brandDetails) {
    return next(new ErrorHandler("Brand not found", 400));
  }

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const car = await CarSchema.create({
    brand: brandDetails,
    images: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    price,
    model,
    modelYear,
    mileage,
    engineSize,
    color,
    cylinder,
    features,
    doors,
    condition,
    odometer,
    repaire,
    steering,
    catacity,
    fuelType,
    transmission,
    wheel,
    valveGear,
    induction,
    fuleInjection,
    power,
    engineLocation,
  });
  res.status(201).json({ success: true, car });
});

export const getAllCars = catchAsyncError(async (req, res, next) => {
  const resultPerPage = req.query.size || 10;
  const carCount = await CarSchema.countDocuments();

  const apiFeatures = new ApiFeatures(CarSchema.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  let car = await apiFeatures.query;

  let filteredCount = car.length;

  res.status(200).json({
    success: true,
    list: car,
    totalElement: carCount,
    elements: car.length,
    size: Number(resultPerPage),
    filteredCount,
    page: Number(req.query.page) || 1,
  });
});

export const getCar = async (req, res, next) => {
  const car = await CarSchema.findById(req.params.id);

  if (!car) {
    return next(new ErrorHandler("Car not found", 400));
  }
  res.status(200).json({
    success: true,
    car,
  });
};

export const updateCar = catchAsyncError(async (req, res, next) => {
  const { file } = req.files;
  let car = await CarSchema.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("Car not found", 400));
  }
  let images;
  if (file) {
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    await cloudinary.v2.uploader.destroy(car.images.public_id);
    images = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const updatedCar = await CarSchema.findByIdAndUpdate(
    req.params.id,
    { ...req.body, images },
    { new: true }
  );
  if (!updatedCar) {
    return next(new ErrorHandler("Updated car not found", 400));
  }
  res.status(201).json({
    success: true,
    message: "Brand updated succesfully",
    updatedCar,
  });
});

export const deleteCar = catchAsyncError(async (req, res, next) => {
  let car = await CarSchema.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("Car not found", 400));
  }

  if (car.images?.public_id) {
    await cloudinary.v2.uploader.destroy(car.images.public_id);
  }
  await car.deleteOne();
  res.status(200).json({
    success: true,
    message: "Car deleted succesfully",
  });
});
