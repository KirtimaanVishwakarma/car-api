import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../controllers/brandController.js";

const router = express.Router();

router.route("/brand").post(createBrand).get(getAllBrand);
router.route("/brand/:id").get(getBrand).put(updateBrand).delete(deleteBrand);

export default router;
