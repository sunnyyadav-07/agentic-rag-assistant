import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "../../../config/config.js";
import type { EmbeddedChunk } from "../../../types/ingestion.types.js";
const pinecone = new Pinecone({ apiKey: config.PINECONE_SECRET_API_KEY });
export async function storeChunks(
  embeddedChunks: EmbeddedChunk[],
  indexName: string,
) {
  const indexModel = await pinecone.describeIndex(indexName);
  const index = pinecone.index({ host: indexModel.host });
  const vectors = embeddedChunks.map((chunk, i) => ({
    id: `chunk-${chunk.metadata.fileName}-${i}`,
    values: chunk.embedding,
    metadata: {
      content: chunk.content,
      fileName: chunk.metadata.fileName,
      chunkIndex: chunk.metadata.chunkIndex,
    },
  }));
  await index.upsert({ records: vectors });
}
