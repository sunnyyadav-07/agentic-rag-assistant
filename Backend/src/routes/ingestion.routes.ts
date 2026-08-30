import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ingestDocumentController } from "../controllers/ingestion.controller.js";

const ingestionRouter = Router();
ingestionRouter.post(
  "/ingest",
  asyncHandler(authenticateUser),
  upload.single("file"),
  asyncHandler(ingestDocumentController),
);
export default ingestionRouter;
