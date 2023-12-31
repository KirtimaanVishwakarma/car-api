import express from "express";
import {
  createUser,
  loginUser,
  logout,
  userProfile,
} from "../controllers/userContorller.js";
import { isAuthenticatedUser } from "../utils/auth.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/profile").get(isAuthenticatedUser, userProfile);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
// .get(getAllCars);
// router.route("/user/:id").get(getCar).put(updateCar).delete(deleteCar);
// .put(updateBrand).delete(deleteBrand);

export default router;
