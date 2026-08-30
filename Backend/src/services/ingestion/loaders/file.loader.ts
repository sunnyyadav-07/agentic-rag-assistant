import type { LoadedFile } from "../../../types/ingestion.types.js";
import { AppError } from "../../../utils/AppError.js";

const ALLOWED_MIME_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function loadFile(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
): LoadedFile {
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new AppError(`Unsupported file type: ${mimeType}`, 400);
  }

  if (buffer.length > MAX_FILE_SIZE) {
    throw new AppError(`File too large: ${buffer.length} bytes`, 400);
  }

  return { buffer, fileName, mimeType };
}
