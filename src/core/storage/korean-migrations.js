// Patch versions 1.0.0 and 1.1.0 saved the translated Ra pet name as the remembrance identifier.
// Keep this idempotent and independent of the upstream save-version sequence.
export function migrateKoreanRemembrance(save) {
  const ra = save.celestials?.ra;
  if (ra?.petWithRemembrance === "이름 없는 자들") ra.petWithRemembrance = "Enslaved";
}
