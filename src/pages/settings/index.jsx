import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Overview from "../../components/settings/Overview";
import VerifyEmail from "../../components/settings/SecurityPin";
import ChangePassword from "../../components/settings/ChangePassword";
import DeleteAccount from "../../components/settings/DeleteAccount";
import TwoFA from "../../components/settings/TwoFA";
import Layout from "../../components/layout/Layout";
import { MdEdit } from "react-icons/md";
import {
  FaInstagram,
  FaFacebook,
  FaSquareXTwitter,
  FaTelegram,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../store/slices/profileSlice";

const baseTabs = [
  "Overview",
  "Verify Email",
  "Change Password",
  "Delete Account",
  "2FA",
];

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = "Overview";
  const user = useSelector((state) => state.auth.user);
  const filteredTabs = baseTabs.filter(
    (tab) => !(tab === "Verify Email" && user?.is_email_verified)
  );

  const initialTab = searchParams.get("tab") || defaultTab;
  const [activeTab, setActiveTab] = useState(
    filteredTabs.includes(initialTab) ? initialTab : defaultTab
  );

  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  useEffect(() => {
    if (user?.is_email_verified && activeTab === "Verify Email") {
      setActiveTab("Overview");
    }
  }, [user?.is_email_verified]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <>
          {user?.is_email_updated === false && (
              <div className="mb-5">
                <VerifyEmail />
              </div>
            )}
            <Overview />
          </>
        );

      case "Verify Email":
        return <VerifyEmail />;

      case "Change Password":
        return <ChangePassword />;

      case "Delete Account":
        return <DeleteAccount />;

      case "2FA":
        return <TwoFA />;

      default:
        return null;
    }
  };

  const handleEditClick = () => {
    setFileError(null);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only PNG, JPEG, or JPG files are allowed");
        return;
      }

      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        setFileError("File size must be less than 4MB");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      dispatch(updateProfilePicture(formData));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen max-w-4xl mx-auto w-full rounded-xl sm:px-4 px-2 sm:py-6 py-4">
        {/* Profile Card */}
        <div className="bg-white dark:bg-zinc-800 dark:text-white shadow-md rounded-t-xl py-6 px-10 flex max-md:flex-col lg:gap-10 md:gap-8 sm:gap-6 gap-2 md:items-start items-start justify-start">
          <div className="relative md:w-40 sm:w-28 w-20 h-20 md:h-40 sm:h-28 flex justify-left">
            <img
              src={
                user?.profile_image
                  ? user.profile_image
                  : "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="User"
              className="md:w-40 sm:w-28 w-20 h-20 md:h-40 sm:h-28 rounded-full border-[4px] border-violet-500"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png,image/jpeg,image/jpg"
            />
            <div
              className="absolute top-3 right-1 cursor-pointer bg-violet-500 p-1 rounded-full text-white"
              onClick={handleEditClick}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <MdEdit size={20} />
              )}
            </div>
          </div>

          <div className="flex flex-col md:items-start md:text-left max-md:items-center max-md:text-center md:gap-4 gap-2">
            <h2 className="md:mt-4 md:text-4xl text-2xl font-semibold italic">
              {user?.fullname}
            </h2>
            <p className="md:text-xl sm:text-lg text-zinc-800 dark:text-zinc-100 font-semibold">
              @{user?.username}
            </p>
            <div className="flex gap-4 text-[#7A44FF]">
              <FaInstagram size={28} />
              <FaFacebook size={28} />
              <FaSquareXTwitter size={28} />
              <FaTelegram size={28} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div>
          <div className="hidden shadow-lg md:flex px-4 justify-around rounded-b-xl bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white">
            {filteredTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-4 px-4 w-full font-medium transition-all duration-300 ${
                  activeTab === tab ? "border-b-[6px] border-white" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="md:hidden shadow-lg bg-[#7A44FF] text-white px-4 py-2 rounded-b-xl">
            <select
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value)}
              className="w-full bg-transparent outline-none border-none text-white py-2 px-4 rounded-md font-semibold"
            >
              {filteredTabs.map((tab) => (
                <option
                  key={tab}
                  value={tab}
                  className="bg-white text-black"
                >
                  {tab}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="py-6">{renderTabContent()}</div>
      </div>
    </Layout>
  );
};

export default Settings;
