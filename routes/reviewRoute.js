import express from "express";
import {
  getAllReview,
  createReview,
  updateReview,
  deleteReview,
  getReview,
} from "../controllers/reviewContorller.js";
import { isAuthenticatedUser, authorizeRoles } from "../utils/auth.js";

const router = express.Router();

router.route("/reviews").get(getAllReview);
router
  .route("/review")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createReview);
router
  .route("/review/:id")
  .get(getReview)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateReview)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

export default router;
