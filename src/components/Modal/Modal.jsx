import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <div className="fixed h-screen transition w-screen overflow-y-visible top-0 left-0 right-0 bottom-0 flex items-center justify-center  z-50">
      <div className="modal-bg fixed h-screen w-full top-0 left-0 right-0 bg-black opacity-50"></div>
      <div className="modal-content bg-white dark:bg-[#18181b] dark:border-[1px] dark:border-[#2b2b2e] p-4 shadow-lg rounded-lg z-[100]">
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
