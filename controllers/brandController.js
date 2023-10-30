import catchAsyncError from "../middleware/catchAsyncError.js";
import { BrandSchema } from "../models/brandModal.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createBrand = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler("Please enter brand name", 400));
  }
  const brand = await BrandSchema.create({ name });
  res.status(201).json({ success: true, brand });
});

export const getAllBrand = catchAsyncError(async (req, res, next) => {
  const brands = await BrandSchema.find();
  if (!brands) {
    return next(new ErrorHandler("brand list not found", 400));
  }
  res.status(200).json({
    success: true,
    brands,
  });
});

export const getBrand = async (req, res, next) => {
  const id = req.params.id;

  const brand = await BrandSchema.findById(id);
  if (!brand) {
    return next(new ErrorHandler("brand not found", 400));
  }
  res.status(200).json({
    success: true,
    brand,
  });
};

export const updateBrand = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  let brand = await BrandSchema.findById(req.params.id);
  if (!brand) {
    return next(new ErrorHandler("Brand not found", 400));
  }
  if (!name) {
    return next(new ErrorHandler("Please enter band name", 400));
  }
  brand.name = name;
  await brand.save();
  res.status(201).json({
    success: true,
    message: "Brand updated succesfully",
  });
});

export const deleteBrand = catchAsyncError(async (req, res, next) => {
  let brand = await BrandSchema.findById(req.params.id);
  if (!brand) {
    return next(new ErrorHandler("Brand not found", 400));
  }
  await brand.deleteOne();
  res.status(200).json({
    success: true,
    message: "Brand deleted succesfully",
  });
});
