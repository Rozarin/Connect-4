import React, { Children } from "react";

function Modal() {
  return (
    <div className="absolute flex justify-center items-center h-screen w-screen bg-black bg-opacity-15">
        <div className="bg-white rounded-lg shadow-md shadow-neutral-500 p-10">
            {Children}
        </div>
    </div>
  );
}

export default Modal;
