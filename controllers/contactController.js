import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeature.js";
import { ContactSchema } from "../models/contactModal.js";

export const createContact = catchAsyncError(async (req, res, next) => {
  const { name, contact, subject, message } = req.body;
  if (!name || !subject || !contact || !message) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const offer = await ContactSchema.create(req.body);
  res.status(201).json({ success: true, offer });
});

export const getAllContact = catchAsyncError(async (req, res, next) => {
  const resultPerPage = req.query.size || 10;
  const offerCount = await ContactSchema.countDocuments();

  const apiFeatures = new ApiFeatures(ContactSchema.find(), req.query)
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

export const getContact = async (req, res, next) => {
  const id = req.params.id;
  const offer = await ContactSchema.findById(id);
  if (!offer) {
    return next(new ErrorHandler("Inquiry is not found", 400));
  }
  res.status(200).json({
    success: true,
    offer,
  });
};

export const deleteContact = catchAsyncError(async (req, res, next) => {
  let offer = await ContactSchema.findById(req.params.id);
  if (!offer) {
    return next(new ErrorHandler("Contact not found", 400));
  }

  await offer.deleteOne();
  res.status(200).json({
    success: true,
    message: "Contact deleted succesfully",
  });
});
