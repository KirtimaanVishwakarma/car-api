import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../controllers/brandController.js";
import { authorizeRoles, isAuthenticatedUser } from "../utils/auth.js";

const router = express.Router();

router
  .route("/brand")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBrand)
  .get(getAllBrand);
router
  .route("/singlebrand/:id")
  .get(getBrand)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBrand)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBrand);

export default router;
