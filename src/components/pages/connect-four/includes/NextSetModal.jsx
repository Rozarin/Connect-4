// I import React to use JSX syntax, and I also import the Modal component that will display the modal content.
import React from "react";
import Modal from "../../../custom/Modal";

// I define the NextSetModal component, which will show a message when a set is won and give the option to continue to the next set.
function NextSetModal({ setNextSetModal, resetBoard, winner }) {
  
  // I define the handleNextSet function that will be called when the user clicks "Continue to next set".
  const handleNextSet = () => {
    resetBoard(); // I reset the board to prepare for the next set.
    setNextSetModal(false); // I close the modal by setting its visibility to false.
  };

  // I return JSX to render the modal, displaying a congratulatory message and the option to continue.
  return (
    <Modal> {/* I wrap the modal content inside the Modal component for styling and positioning */}
      <div className="flex flex-col pt-10 px-10 pb-3 space-y-10 bg-red-500 border-[10px] border-white rounded-3xl shadow-inner shadow-black">
        {/* I display the winner's name in a large, bold font. */}
        <h1 className="text-white text-6xl font-bold">{`${winner} WON THE SET!`}</h1>
        
        {/* I render a button that, when clicked, triggers handleNextSet */}
        <button 
          onClick={handleNextSet}
          className="text-white hover:scale-105 duration-100 underline underline-offset-4 font-bold"
        >
          {/* I label the button with the text "Continue to next set..." */}
          Continue to next set...
        </button>
      </div>
    </Modal>
  );
}

// I export the NextSetModal component so that it can be used in other parts of my application.
export default NextSetModal;