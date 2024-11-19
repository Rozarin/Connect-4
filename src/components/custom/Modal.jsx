import React from "react";

function Modal({ children }) {
  return (
    <div className="absolute left-0 top-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-15 z-50">
        {children}
    </div>
  );
}

export default Modal;
