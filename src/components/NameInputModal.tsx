import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NameInputModalProps {
  onClose: () => void;
}

const NameInputModal: React.FC<NameInputModalProps> = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const firstName = fullName.split(" ")[0];
    navigate(`/wheel`, { state: { firstName } });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-4">
        <label className="block mb-2">Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Enter full name"
        />
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleSubmit}
            disabled={!fullName}
            className={`bg-blue-500 hover:bg-blue-600 transition duration-200 text-white px-4 py-2 rounded ${
              !fullName ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Choose Color
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameInputModal;
