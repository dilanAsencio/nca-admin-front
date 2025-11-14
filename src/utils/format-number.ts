/**
 * Given a string representing a currency value, returns a string representing
 * the currency value according to the given locale and currency. The returned
 * string will have the currency symbol and separators according to the locale.
 *
 * @param {string} value The currency value as a string.
 * @param {string} [locale="es-CO"] The locale to use for formatting the currency.
 * @param {string} [currency="COP"] The currency code to use for formatting the currency.
 * @returns {string} A string representing the currency value according to the given locale and currency.
 */
export function formatCurrency(value: string, locale = "es-CO", currency = "COP") {
  const numeric = value;
  
  if (!numeric) return "$ -";
  const number = parseFloat(numeric);
  
  return number.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/**
 * Given a string representing a currency value, returns the numeric value
 * (without separators, currency symbol, etc.).
 *
 * @param {string} value - The string to parse.
 * @returns {number} The numeric value if the string is a valid number, 0 otherwise.
 */
export function unformatCurrency(value: string): number {
  const numeric = value.replace(/[^\d]/g, "");
  return numeric ? parseInt(numeric, 10) : 0;
}
