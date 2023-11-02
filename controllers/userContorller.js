import catchAsyncError from "../middleware/catchAsyncError.js";
import { UserSchema } from "../models/userModal.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";

export const createUser = catchAsyncError(async (req, res, next) => {
  const user = await UserSchema.create(req.body);

  sendToken(user, 201, res);
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and Password are required", 400));
  }
  const user = await UserSchema.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid email or password", 401));

  sendToken(user, 200, res);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    //token value is null now
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
