import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
