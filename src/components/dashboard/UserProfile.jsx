import { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../store/slices/profileSlice";
import AssetAllocation from "./AssetAllocation";
import defaultImg from "../../assets/images/user_default.png";
import verifiedBadge from "../../assets/images/verified_badge.png";

const UserProfile = ({ user, dashboard }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleEditClick = () => {
    setFileError(null);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only PNG, JPEG, or JPG files are allowed");
        return;
      }

      // Validate file size (4MB = 4 * 1024 * 1024 bytes)
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

  const copyToClipboard = () => {
    const referralLink = `https://capshield.io/${user?.referral_id}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4 text-center border-[2px] border-violet-500 bg-gray-50 dark:bg-zinc-800 rounded-xl">
      <div className="relative w-28 h-28 mx-auto">
        <img
          src={user?.profile_image || defaultImg}
          alt={user?.email || "User"}
          className="w-28 h-28 rounded-full border-[2px] border-violet-500"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png,image/jpeg,image/jpg"
        />
        <div
          className="absolute top-0 right-1 cursor-pointer bg-violet-500 p-1 rounded-full text-white"
          onClick={handleEditClick}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <MdEdit size={20} />
          )}
        </div>
      </div>
      {(error || fileError) && (
        <p className="text-red-500 text-sm mt-2">{error || fileError}</p>
      )}
      <p className="mt-2 text-gray-700 text-md dark:text-white capitalize flex items-center justify-center"><img src={verifiedBadge} style={{ width: 20, height: 20 }} alt="Verified" className="mr-1" /> {user.current_level == "level1" ? "Member" : (user.current_level == "level2" ? "Partner" : "Strategist")}</p>
      <p className="mt-2 font-bold text-lg dark:text-white capitalize">Welcome <span className="lowercase">{user?.username || user?.fullname}</span></p>
      <div className="mt-2 text-sm dark:text-white">
        {user?.is_token_purchased ? (
          <div className="space-y-2">
            <div className="font-bold">Referral Link:</div>
            <div className="bg-white dark:bg-zinc-700 p-2 rounded-lg border">
              <div className="text-xs break-all font-mono text-gray-700 dark:text-gray-300">
                https://capshield.io/{user?.referral_id}
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-2 px-3 py-1 bg-violet-500 text-white text-xs rounded hover:bg-violet-600 transition-colors"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        ) : null}
        {/* <div>Total Assets: <span className="font-semibold">{dashboard?.totalAssets ?? 0}</span></div>
        <div>Direct Referrals: <span className="font-semibold">{dashboard?.totalDirectReferral ?? 0}</span></div> */}
      </div>
    </div>
  );
};

export default UserProfile;