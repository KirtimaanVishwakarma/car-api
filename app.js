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
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// routes
import brandRoute from "./routes/brandRoute.js";
import carRoute from "./routes/carRoute.js";
import userRoute from "./routes/userRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import offerRoute from "./routes/offerRoute.js";
import inquiryRoute from "./routes/inquiryRoute.js";
import contactRoute from "./routes/contactRoute.js";

app.use("/api/v1", brandRoute);
app.use("/api/v1", carRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", reviewRoute);
app.use("/api/v1", offerRoute);
app.use("/api/v1", inquiryRoute);
app.use("/api/v1", contactRoute);

// error middleware
app.use(errorHandler);
export default app;
