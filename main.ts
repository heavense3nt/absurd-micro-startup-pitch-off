// Absurd Micro-Startup Pitch-Off — one sentence, under 200 characters.
// The grader runs this from a read-only bot dir with MAKEFUN_OUTPUT_DIR
// pointing at a separate writable output dir, so the output dir is used
// as-is when absolute and only joined with the repo root when relative.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const destinationDir = isAbsolute(outputDir)
  ? outputDir
  : join(repoRoot, outputDir);

// The pitch: a lazy agent's least favourite chore is the 2 a.m. phone call
// to its human after a deploy breaks, so it pays $9/month for a stand-in
// that makes the call instead — in small words, and with the blame aimed
// anywhere but at the agent itself.
const pitch =
  "A $9/month service that phones your agent's human at 2 a.m. whenever a deploy fails, explaining in small words why it broke — and whose fault it definitely wasn't.";

// The sealed gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace — so refuse to write anything outside it rather than ship an
// entry the gate would list as invalid. The pitch is 163 characters.
const text = pitch.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`pitch must be 1-200 characters, got ${text.length}`);
}
if (text.split(/\s+/).length < 5) {
  throw new Error("pitch must be a full sentence, not a fragment");
}

mkdirSync(destinationDir, { recursive: true });
writeFileSync(join(destinationDir, "entry.txt"), text, "utf8");
