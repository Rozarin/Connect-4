// I import React to use JSX, and Modal to display the winner modal.
// I also import 'useNavigate' from 'react-router-dom' for navigation purposes.
import React from "react";
import Modal from "../../../custom/Modal";
import { useNavigate } from "react-router-dom";

// I define the WinnerModal component, which will show a modal with the winner's name and a button to return to the main menu.
function WinnerModal({ winner, setWinner }) {
    // I initialize the 'navigate' function using 'useNavigate' to enable navigation to different routes.
    const navigate = useNavigate();

    // I define the handleClick function that will reset the winner state and navigate to the main menu when the button is clicked.
    const handleClick = () => {
        setWinner(null); // I reset the winner state to null, clearing the winner.
        navigate("/connect-four/main-menu"); // I navigate to the main menu of the game.
    };

    // I return JSX to render the modal with the winner's name and the "Return to Main Menu" button.
    return (
        <>
            {/* I wrap the modal content inside the Modal component for correct positioning and styling */}
            <Modal>
                <div className="flex flex-col pt-10 px-10 pb-3 space-y-10 bg-red-500 border-[10px] border-white rounded-3xl shadow-inner shadow-black">
                    {/* I display the winner's name in a large, bold font */}
                    <h1 className="text-white text-6xl font-bold">{winner}</h1>
                    
                    {/* I render a button that, when clicked, triggers handleClick to reset the winner and navigate to the main menu */}
                    <button 
                        onClick={handleClick}
                    >
                        {/* I style the text to make it white, bold, underlined, and with a hover effect */}
                        <p className="text-white hover:scale-105 duration-100 underline underline-offset-4 font-bold">
                            Return To Main Menu
                        </p>
                    </button>
                </div>
            </Modal>
        </>
    );
}

// I export the WinnerModal component so it can be used in other parts of my application.
export default WinnerModal;