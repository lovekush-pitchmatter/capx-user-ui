import React from "react";
import defaultImg from "../../assets/images/user_default.png"; // Assuming user_default.png is available

const UserProfileSection = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center space-y-3">
      <img
        src={user?.profile_image || defaultImg}
        alt={user?.username || "User"}
        className="w-24 h-24 rounded-full border-4 border-purple-500 object-cover"
      />
      <h3 className="text-xl font-semibold text-gray-800">{user?.username || "Guest User"}</h3>
      <p className="text-sm text-gray-500">User ID: {user?.id || "N/A"}</p>
    </div>
  );
};

export default UserProfileSection;
