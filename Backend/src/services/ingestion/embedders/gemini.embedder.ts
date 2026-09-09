import { GoogleGenAI } from "@google/genai";
import { config } from "../../../config/config.js";
import type { Chunk, EmbeddedChunk } from "../../../types/ingestion.types.js";

const genAI = new GoogleGenAI({ apiKey: config.GEMINI_SECRET_API_KEY });

export async function embedChunks(chunks: Chunk[]): Promise<EmbeddedChunk[]> {
  const response = await genAI.models.embedContent({
    model: "gemini-embedding-001",
    contents: chunks.map((chunk) => ({
      parts: [{ text: chunk.content }],
    })),
    config:{
      outputDimensionality:2048
    }
  });

  return chunks.map((chunk, index) => {
    const embedding = response.embeddings?.[index]?.values;

    if (!embedding) {
      throw new Error(`Embedding missing for chunk index ${index}`);
    }

    return {
      content: chunk.content,
      embedding,
      metadata: chunk.metadata,
    };
  });
}
