import React from "react";
import Modal from "../../../custom/Modal";

function NextSetModal({ setNextSetModal, resetBoard, winner }) {
  const handleNextSet = () => {
    resetBoard(); // Reset the board for the next set
    setNextSetModal(false); // Close the modal
  };

  return (
    <Modal>
      <div className="flex flex-col pt-10 px-10 pb-3 space-y-10 bg-red-500 border-[10px] border-white rounded-3xl shadow-inner shadow-black">
        <h1 className="text-white text-6xl font-bold">{`${winner} WON THE SET!`}</h1>
        <button 
          onClick={handleNextSet}
          className="text-white hover:scale-105 duration-100 underline underline-offset-4 font-bold"
        >
          Continue to next set...
        </button>
      </div>
    </Modal>
  );
}

export default NextSetModal;
