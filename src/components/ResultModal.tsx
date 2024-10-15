import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ResultModalProps {
    selectedColor: string;
    firstName: string;
    onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ selectedColor, firstName, onClose }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        navigate('/');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2>Thank you for participating in the spin for Nonye Ezike's Birthday!</h2>
                <p>We hope to see you on 26th October, 2024.</p>
                <p>Remember your colour for that day is {selectedColor}.</p>
                <p>Don't forget to bring your gift for Nonye.</p>
                <p>See you on the 26th October.</p>
                <button onClick={handleClose} className="bg-green-500 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ResultModal;

