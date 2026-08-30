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
