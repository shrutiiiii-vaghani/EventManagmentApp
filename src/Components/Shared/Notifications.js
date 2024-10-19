import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showSuccessNotification = (message) => {
  toast.success(message);
};

const showErrorNotification = (message) => {
  toast.error(message);
};

export { showSuccessNotification, showErrorNotification };
