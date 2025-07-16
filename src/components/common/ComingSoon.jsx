import React from "react";
import { useNavigate } from "react-router-dom";
import comingSoonImg from "../../assets/images/coming_soon.jpg";

const ComingSoon = ({ message = "This feature is coming soon!" }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-transparent p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full flex flex-col items-center">
        <img
          src={comingSoonImg}
          alt="Coming Soon"
          className="w-48 h-48 object-contain mb-6 drop-shadow-md"
        />
        <h2 className="text-2xl font-bold text-[#7A44FF] mb-2 text-center">Coming Soon</h2>
        <p className="text-gray-600 text-center mb-6">{message}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 rounded-xl bg-[#7A44FF] text-white font-semibold shadow hover:bg-[#562CBF] transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
