import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/error.js";
import fileUpload from "express-fileupload";
import cors from "cors";

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// routes
import brandRoute from "./routes/brandRoute.js";
import carRoute from "./routes/carRoute.js";
import userRoute from "./routes/userRoute.js";

app.use("/api/v1", brandRoute);
app.use("/api/v1", carRoute);
app.use("/api/v1", userRoute);

// error middleware
app.use(errorHandler);
export default app;
