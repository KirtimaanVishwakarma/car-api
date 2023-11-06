import catchAsyncError from "../middleware/catchAsyncError.js";
import { BrandSchema } from "../models/brandModal.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import ApiFeatures from "../utils/apiFeature.js";

export const createBrand = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const { file } = req.files;

  if (!name || !file) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  //upload file on cloudinary
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const brand = await BrandSchema.create({
    name,
    logo: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({ success: true, brand });
});

export const getAllBrand = catchAsyncError(async (req, res, next) => {
  const resultPerPage = req.query.size || 10;
  const brandCount = await BrandSchema.countDocuments();

  const apiFeatures = new ApiFeatures(BrandSchema.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let brands = await apiFeatures.query;

  let filteredCount = brands.length;

  res.status(200).json({
    success: true,
    list: brands,
    totalElement: brandCount,
    elements: brands.length,
    size: Number(resultPerPage),
    filteredCount,
    page: Number(req.query.page) || 1,
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
  const { file } = req.files;
  let brand = await BrandSchema.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler("Brand not found", 400));
  }
  if (file) {
    const fileUri = getDataUri(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    await cloudinary.v2.uploader.destroy(brand.logo.public_id);
    brand.logo = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
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
  if (brand.logo?.public_id) {
    await cloudinary.v2.uploader.destroy(brand.logo.public_id);
  }
  await brand.deleteOne();
  res.status(200).json({
    success: true,
    message: "Brand deleted succesfully",
  });
});
