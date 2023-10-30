import catchAsyncError from "../middleware/catchAsyncError.js";
import { BrandSchema } from "../models/brandModal.js";
import { CarSchema } from "../models/carModal.js";
import ErrorHandler from "../utils/errorHandler.js";

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
  const brandDetails = await BrandSchema.findById(brand);
  if (!brandDetails) {
    return next(new ErrorHandler("Brand not found", 400));
  }
  const car = await CarSchema.create({
    brand: brandDetails,
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
  const cars = await CarSchema.find();

  if (!cars) {
    return next(new ErrorHandler("Car list not found", 400));
  }

  res.status(200).json({
    success: true,
    cars,
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
  let car = await CarSchema.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("Car not found", 400));
  }

  const updatedCar = await CarSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
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
  await car.deleteOne();
  res.status(200).json({
    success: true,
    message: "Car deleted succesfully",
  });
});
