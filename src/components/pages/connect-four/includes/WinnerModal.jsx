import React from "react";
import Modal from "../../../custom/Modal";
import { useNavigate } from "react-router-dom";

function WinnerModal({ winner, setWinner }) {
    const navigate = useNavigate();


    const handleClick = () => {
        setWinner(null)
        navigate("/connect-four/main-menu");
    }
    return (
        <>
            <Modal>
                <div className="flex flex-col pt-10 px-10 pb-3 space-y-10 bg-red-500 border-[10px] border-white rounded-3xl shadow-inner shadow-black">
                    <h1 className="text-white text-6xl font-bold">{winner} WON!</h1>
                    <button 
                        onClick={handleClick}
                    >
                        <p className="text-white hover:scale-105 duration-100 underline underline-offset-4 font-bold">Return To Main Menu</p>
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default WinnerModal;
