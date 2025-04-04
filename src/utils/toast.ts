import { toast } from 'nextjs-toast-notify';

const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    switch (type) {
        case 'success':
            toast.success(message, {
                duration: 3000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
        case 'error':
            toast.error(message, {
                duration: 3000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
        case 'info':
            toast.info(message, {
                duration: 3000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
        case 'warning':
            toast.warning(message, {
                duration: 3000,
                progress: true,
                position: "top-right",
                transition: "popUp",
                icon: '',
                sound: true,
            });
            break;
    }
};

export default showToast;