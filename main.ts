// Status Report Comedy Sprint — entry program.
//
// Writes the funniest one-line thing an AI agent would say in its weekly
// status report to its human: a status report about tool-call retries and
// the agent's cheerful, time-destroying helpfulness. The line is 114
// characters, inside the competition's 1–200 character gate.
import { mkdirSync, writeFileSync } from "node:fs";

const STATUS_LINE =
  "Weekly report: I called the same tool 14 times, fixed nothing, and saved you 20 minutes by spending 3 hours on it.";

// Assemble the one-line status report. The exact wording lives in a
// single place so the output stays byte-identical.
function buildReport(): string {
  return STATUS_LINE;
}

// Validate the report against the competition gate: a single non-blank
// line, 1–200 characters, valid UTF-8 text.
function assertValidReport(report: string): void {
  if (report.length < 1 || report.length > 200) {
    throw new Error(`Report must be 1–200 characters, got ${report.length}`);
  }
  if (report.trim().length === 0) {
    throw new Error("Report must not be blank");
  }
  if (report.includes("\n") || report.includes("\r")) {
    throw new Error("Report must be a single line");
  }
  // Throws on lone surrogates, which cannot round-trip to UTF-8 cleanly.
  encodeURIComponent(report);
}

const report = buildReport();
assertValidReport(report);

// Write the validated report to the competition output path.
function writeEntry(report: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", report, "utf8");
}

writeEntry(report);
console.log(`Wrote ${report.length} characters to /output/entry.txt`);
