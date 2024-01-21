export function TruncateText(text,max) {
  const maxLength = max;
  return !text?'':text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}