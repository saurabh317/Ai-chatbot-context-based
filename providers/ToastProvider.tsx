import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar
      closeButton={false}
      toastClassName="!bg-transparent !shadow-none !p-0"
    />
  );
}
