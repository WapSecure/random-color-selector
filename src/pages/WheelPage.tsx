import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./WheelStyles.css";

const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink"];

const WheelPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { firstName } = (location.state as { firstName: string }) || {
    firstName: "",
  };
  const [spinning, setSpinning] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastRotation, setLastRotation] = useState(0);

  const handleSpin = () => {
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    setSelectedColor(randomColor);

    const degreesPerColor = 360 / colors.length;
    const extraSpins = 3 * 360;
    const colorRotation = randomIndex * degreesPerColor;
    const totalRotation = extraSpins + colorRotation;

    setRotation(lastRotation + totalRotation);
    setLastRotation(lastRotation + totalRotation);

    setTimeout(() => {
      setSpinning(false);
    }, 2000);
  };

  const handleOkClick = () => {
    setOpenModal(true); 
  };

  const handleCloseModal = () => {
    setOpenModal(false); 
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className={`wheel-container ${spinning ? "spinning" : ""}`}>
            <div
              className="wheel"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {colors.map((color) => (
                <div
                  key={color}
                  className={`slice ${color.toLowerCase()} ${
                    !spinning && color === selectedColor ? "highlighted" : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleSpin}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
      {selectedColor && !spinning && (
        <div className="mt-6 text-center flex-col items-center">
          <div className="flex">
            <h2 className="mr-2">
              Congratulations {firstName}, Your Selected Color is:{" "}
            </h2>
            <div
              className="selected-color-box"
              style={{ backgroundColor: selectedColor.toLowerCase() }}
            ></div>
            <span className="ml-2">{selectedColor}</span>
          </div>
          <div className="flex">
            <h2 className="mr-2">Your colour for the Day is:</h2>
            <div
              className="selected-color-box"
              style={{ backgroundColor: selectedColor.toLowerCase() }}
            ></div>
            <span className="ml-2">{selectedColor}</span>
          </div>
          <button
            onClick={handleOkClick}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Ok
          </button>
        </div>
      )}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2>Thank you for participating!</h2>
            <p>Your selected color for the event is {selectedColor}.</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelPage;
