import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AlertModal = withReactContent(Swal);

export const showErrorModal = (title: string, text: string) => {
  AlertModal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Aceptar",
    customClass: {
      popup: "rounded-lg shadow-lg",
      confirmButton: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg",
    },
  });
};
