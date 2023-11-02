// 2:32
import jwt from "jsonwebtoken";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { UserSchema } from "../models/userModal.js";
import ErrorHandler from "./errorHandler.js";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserSchema.findById(decodedData.id); //from JWT TOKEN of userModel "id"
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Your are not allowed to access this resource`, 403)
      );
    }
    next();
  };
};
