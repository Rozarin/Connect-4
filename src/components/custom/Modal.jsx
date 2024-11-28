// I start by importing React since I'm working with JSX, which requires React in the environment.
import React from "react";

// I define the Modal component, which takes a 'children' prop. This allows me to pass any content I want to display inside the modal.
function Modal({ children }) {
  return (
    // I use a <div> to create the modal structure. 
    // The 'absolute' position places the modal at the top-left of the screen, 
    // and 'flex' centers its content both horizontally and vertically.
    <div className="absolute left-0 top-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-15 z-50">
        {/* I render the 'children' prop here, which can be any element or component passed into the Modal */}
        {children}
    </div>
  );
}

// Finally, I export the Modal component so it can be used elsewhere in my app.
export default Modal;