export function cleanText(rawText: string): string {
  let cleaned = rawText;

  cleaned = cleaned.replace(/(\w+)-\n(\w+)/g, "$1$2");

  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  cleaned = cleaned.replace(/[ \t]{2,}/g, " ");

  cleaned = cleaned.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F]/g, "");

  cleaned = cleaned.trim();
  return cleaned;
}
