import express from "express";
import {
  createCar,
  getAllCars,
  deleteCar,
  getCar,
  updateCar,
} from "../controllers/carController.js";

const router = express.Router();

router.route("/car").post(createCar).get(getAllCars);
router.route("/car/:id").get(getCar).put(updateCar).delete(deleteCar);
// .put(updateBrand).delete(deleteBrand);

export default router;
