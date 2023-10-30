import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/error.js";

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
import brandRoute from "./routes/brandRoute.js";
import carRoute from "./routes/carRoute.js";

app.use("/api/v1", brandRoute);
app.use("/api/v1", carRoute);

// error middleware
app.use(errorHandler);
export default app;
