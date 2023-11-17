import express from "express";
import {
  createOffer,
  deleteOffer,
  getAllOffer,
  getOffer,
  updateOffer,
} from "../controllers/offerController.js";
import { authorizeRoles, isAuthenticatedUser } from "../utils/auth.js";

const router = express.Router();

router
  .route("/offer")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createOffer)
  .get(getAllOffer);
router
  .route("/offer/:id")
  .get(getOffer)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOffer)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOffer);

export default router;
