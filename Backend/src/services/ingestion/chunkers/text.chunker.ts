import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { Chunk } from "../../../types/ingestion.types.js";

export async function chunkText(
  text: string,
  fileName: string,
): Promise<Chunk[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1200,
    chunkOverlap: 150,
    separators: ["\n\n", "\n", ". ", " ", ""],
  });
  const splitTexts = await splitter.splitText(text);
  return splitTexts.map((content, index) => ({
    content,
    metadata: {
      chunkIndex: index,
      fileName,
    },
  }));
}
