import { toast } from 'nextjs-toast-notify';
import Swal from "sweetalert2";

/**
 * Shows a notification to the user with the given message and type.
 * @param message The message to show.
 * @param type The type of the notification to show. Can be 'success', 'error', 'info' or 'warning'.
 */
export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => {
    switch (type) {
        case 'success':
            toast.success(message, {
                duration: duration ?? 5000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
        case 'error':
            toast.error(message, {
                duration: duration ?? 5000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
        case 'info':
            toast.info(message, {
                duration: duration ?? 5000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
        case 'warning':
            toast.warning(message, {
                duration: duration ?? 5000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
    }
};

/**
 * Show a confirmation dialog with a given title, text, icon and buttons.
 * @param {string} title - The title of the dialog.
 * @param {string} text - The text of the dialog.
 * @param {string} icon - The icon of the dialog, can be "warning", "success", "error", "info" or "question", defaults to "warning".
 * @param {string} [confirmText="Okay"] - The text of the confirm button.
 * @param {string} [cancelText="Cancel"] - The text of the cancel button.
 * @returns {Promise<boolean>} Whether the user confirmed the dialog or not.
 */
export const showConfirm = async (
  title: string,
  text: string,
  icon: "warning" | "success" | "error" | "info" | "question" = "warning",
  confirmText = "Aceptar",
  cancelText = "Cancelar"
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#610CF4",
    cancelButtonColor: "#FFE193",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
  return result.isConfirmed;
};