export interface ParsedDocument {
  text: string;
  metadata: {
    fileName: string;
    pageCount: number;
  };
}
export interface LoadedFile {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
}
export interface Chunk {
  content: string;
  metadata: {
    chunkIndex: number;
    fileName: string;
  };
}

export interface EmbeddedChunk {
  content: string;
  embedding: number[];
  metadata: {
    chunkIndex: number;
    fileName: string;
  };
}
