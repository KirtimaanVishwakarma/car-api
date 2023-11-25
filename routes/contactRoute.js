import express from "express";
import {
  getAllContact,
  createContact,
  deleteContact,
  getContact,
} from "../controllers/contactController.js";
import { isAuthenticatedUser, authorizeRoles } from "../utils/auth.js";

const router = express.Router();

router
  .route("/contact")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllContact);
router.route("/contact").post(createContact);
router
  .route("/contact/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getContact)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteContact);

export default router;
