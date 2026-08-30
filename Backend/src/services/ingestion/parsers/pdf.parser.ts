import type { ParsedDocument } from "../../../types/ingestion.types.js";
import { PDFParse } from "pdf-parse";
export async function parsePDF(
  fileBuffer: Buffer,
  fileName: string,
): Promise<ParsedDocument> {
  const parser = new PDFParse({ data: fileBuffer });

  try {
    const result = await parser.getText();
    return {
      text: result.text,
      metadata: {
        fileName,
        pageCount: result.total,
      },
    };
  } finally {
    await parser.destroy();
  }
}
