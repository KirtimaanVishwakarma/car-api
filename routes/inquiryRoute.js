import express from "express";
import {
  getAllInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiry,
} from "../controllers/inquiryController.js";
import { isAuthenticatedUser, authorizeRoles } from "../utils/auth.js";

const router = express.Router();

router
  .route("/inquiry")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllInquiry);
router.route("/inquiry").post(createInquiry);
router
  .route("/inquiry/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getInquiry)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateInquiry)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteInquiry);

export default router;
