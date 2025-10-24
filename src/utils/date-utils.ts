/**
 * Utilidades para el manejo y formateo de fechas.
 * @example
 * formatDate(new Date(), true); // "2025-10-19T14:32:55Z"
 * formatDateCustom(new Date()); // "19-10-2025"
 */
export class DateUtils {
  /**
   * Formatea una fecha a un formato legible o tipo ISO.
   * @param date Fecha a formatear (Date, string o number).
   * @param isoFormat Si es true, retorna formato ISO completo.
   * @returns Fecha formateada como string.
   */
  static formatDate(date: Date | string | number, isoFormat: boolean = false, onlyDate: boolean = false): string {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return ''; // Retornar cadena vacía si la fecha no es válida
    }

    // Opciones para mostrar fecha legible en español
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    // Formato legible: "19 de octubre de 2025, 14:35:00"
    if (!isoFormat) {
      const formattedDate = dateObj.toLocaleDateString('es-ES', options);
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const seconds = String(dateObj.getSeconds()).padStart(2, '0');
      if (onlyDate) return formattedDate;
      return `${formattedDate}, ${hours}:${minutes}:${seconds}`;
    }

    // Formato ISO: "YYYY-MM-DD HH:mm:ss.SSS Z"
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const ms = String(dateObj.getMilliseconds()).padStart(3, '0');

    // Zona horaria (por ejemplo: "-0500")
    const offsetMinutes = dateObj.getTimezoneOffset();
    const offsetSign = offsetMinutes > 0 ? '-' : '+';
    const offsetHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
    const offsetMins = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');
    const timezone = `${offsetSign}${offsetHours}${offsetMins}`;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms} ${timezone}`;
  }

  /**
   * Formatea una fecha en formato "DD/MM/YYYY".
   * @param date Fecha a formatear.
   * @returns Fecha formateada como "DD/MM/YYYY".
   */
  static formatDateCustom(date: Date): string {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
