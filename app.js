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

app.use("/api/v1", brandRoute);

// error middleware
app.use(errorHandler);
export default app;
