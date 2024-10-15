import React, { useState } from "react";
import NameInputModal from "../components/NameInputModal";
import birthdayImage from "../assets/images/birthday.png"; // Path to the birthday image

const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-birthday-bg bg-cover bg-center px-4 md:px-10 lg:px-20 xl:px-60">
      <h1 className="text-3xl font-bold mb-2 text-center">Hey you!</h1>
      <div className="flex items-center mb-4">
        <p className="text-lg text-center mr-2">
          It is Nonye Ezike's birthday.
        </p>
        {/* Uncomment and add your cake icon here */}
        {/* <img src={cakeIcon} alt="Birthday Cake" className="w-12 h-12" /> */}
      </div>
      <img
        src={birthdayImage}
        alt="Birthday Celebration"
        className="w-full max-w-md rounded-lg shadow-md mb-4"
      />
      <p className="text-lg text-center mb-4">
        <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent font-bold text-3xl">
          Happy birthday to Nonnie Ezike!
        </span>{" "}
        Many more years and achievements to come.
      </p>
      <p className="text-center">
        We want to surprise her as she clocks half. join her to participate in
        our color-themed snack potluck. Clue of items to bring are Biscuits,
        chocolates, Cookies, Sweets etc.
      </p>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
      >
        Get Started
      </button>
      {modalOpen && <NameInputModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
