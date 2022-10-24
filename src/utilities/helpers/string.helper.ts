// NOTE: unicode filter (ES2018)
export function onlyLatinCharacters(string: string | null) {
  // Latin Characters with special symbols Mark(Spanish, German...) (e.g. accents, umlauts, enclosing boxes, etc.)
  return string && string.trim().match(/[\p{Letter}\p{Number}\p{Mark}\s]+/gu);
}
