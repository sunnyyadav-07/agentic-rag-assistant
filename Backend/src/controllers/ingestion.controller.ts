import { chunkText } from "../services/ingestion/chunkers/text.chunker.js";
import { cleanText } from "../services/ingestion/cleaners/text.cleaner.js";
import { embedChunks } from "../services/ingestion/embedders/gemini.embedder.js";
import { loadFile } from "../services/ingestion/loaders/file.loader.js";
import { parsePDF } from "../services/ingestion/parsers/pdf.parser.js";
import { storeChunks } from "../services/ingestion/stores/pinecone.store.js";
import type { AsyncControllerFn } from "../types/asyncControllerFn.js";
import { AppError } from "../utils/AppError.js";
import { sendResponse } from "../utils/sendResponse.js";

export const ingestDocumentController: AsyncControllerFn = async (
  req,
  res,
  next,
) => {
  if (!req.file) {
    throw new AppError("No file uploaded", 400);
  }
  const loadedFile = loadFile(
    req.file.buffer,
    req.file.originalname,
    req.file.mimetype,
  );

  const parsedDoc = await parsePDF(loadedFile.buffer, loadedFile.fileName);
  const cleanedText = cleanText(parsedDoc.text);

  const chunks = await chunkText(cleanedText, loadedFile.fileName);

  const embeddedChunks = await embedChunks(chunks);
  await storeChunks(embeddedChunks, "my-rag-project");

  sendResponse(res, 200, true, "File received successfully", {
    pageCount: parsedDoc.metadata.pageCount,
  });
};
