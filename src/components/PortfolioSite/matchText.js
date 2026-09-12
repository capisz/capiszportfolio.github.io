// Shared by the UI matcher and isolated document worker. Never interpret content.
export function normalizeMatchText(value) {
  if (typeof value !== 'string' || value.length > 30000) throw Error('Please use a shorter brief (30,000 characters max).');
  for (const char of value) {
    const code=char.charCodeAt(0);
    if ((code<32 && ![9,10,13].includes(code)) || (code>=127 && code<=159)) throw Error('Remove control characters or paste plain text.');
  }
  // Separate rather than join hidden fragments; bidi overrides never reach display.
  const text = value.normalize('NFKC').replace(/[\u061c\u200b-\u200f\u202a-\u202e\u2060-\u2069\ufeff]/g, ' ').trim();
  if (text.length > 30000) throw Error('Please use a shorter brief (30,000 characters max).');
  return text;
}
