/**
 * Transforma una cadena de texto en una cadena que puede ser utilizada como nombre de variable.
 * Quita los conectores (de, del, la, el, los, las, por, para, en, y, a, con, o, u) y
 * une las palabras restantes con guión bajo (_) en lugar de espacios.
 * @param {string} input Cadena de texto a transformar
 * @returns {string} Cadena de texto transformada
 */
export function transformarCadena(input: string): string {
  const conectores = ['de', 'del', 'la', 'el', 'los', 'las', 'por', 'para', 'en', 'y', 'a', 'con', 'o', 'u'];

  // 1. Convertir en array de palabras
  const palabras = input.split(/\s+/);

  // 2. Filtrar los conectores (ignorando mayúsculas/minúsculas)
  const filtradas = palabras.filter(palabra => !conectores.includes(palabra.toLowerCase()));

  // 3. Unir con guión bajo
  return filtradas.join('_');
}