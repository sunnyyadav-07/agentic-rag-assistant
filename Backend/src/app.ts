import express from "express";
import { globalErrorHandler } from "./middlewares/errorHandler.middleware.js";
const app = express();

app.use(globalErrorHandler)
export default app;
