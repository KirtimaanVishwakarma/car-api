import express from "express";
import {
  createCar,
  getAllCars,
  deleteCar,
  getCar,
  updateCar,
} from "../controllers/carController.js";
import { authorizeRoles, isAuthenticatedUser } from "../utils/auth.js";

const router = express.Router();
router.route("/cars").get(getAllCars);
router
  .route("/car")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCar);
router
  .route("/car/:id")
  .get(getCar)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCar)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCar);

export default router;
