import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AlertModal = withReactContent(Swal);

interface AlertOptions {
  title: string;
  text: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
}

const showAlert = ({
  title,
  text,
  icon = 'error',
  confirmButtonText = 'Aceptar',
}: AlertOptions) => {
  return AlertModal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
};

export default showAlert;
