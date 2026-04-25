export function formatMessage(message) {
  if (!message || typeof message !== "string") {
    return "";
  }

  return message
    .trim()
    .replace(/\s+/g, " ")   // collapse multiple spaces
    .toLowerCase();
}