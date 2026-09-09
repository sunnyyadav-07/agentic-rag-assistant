export function cleanText(rawText: string): string {
  let cleaned = rawText;

  // Step 1: PDF page markers hatao (jaise "-- 1 of 1 --")
  cleaned = cleaned.replace(/--\s*\d+\s*of\s*\d+\s*--/gi, "");

  // Step 2: Hyphen se tuti hui words ko jodo
  cleaned = cleaned.replace(/(\w+)-\n(\w+)/g, "$1$2");

  // Step 3: Multiple blank lines ko ek blank line mein convert karo
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  // Step 4: Multiple spaces/tabs ko ek space mein convert karo
  cleaned = cleaned.replace(/[ \t]{2,}/g, " ");

  // Step 5: Non-printable/control characters hatao
  cleaned = cleaned.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F]/g, "");

  // Step 6: Leading/trailing whitespace hatao
  cleaned = cleaned.trim();
  return cleaned;
}
