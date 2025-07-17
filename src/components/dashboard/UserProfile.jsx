import { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../store/slices/profileSlice";
import AssetAllocation from "./AssetAllocation";
import defaultImg from "../../assets/images/user_default.png";
import ActionButtons from "./ActionButtons";

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
    <div className="flex max-sm:flex-col bg-white items-center justify-between  gap-2     dark:bg-zinc-800 py-4 px-4 text-center  rounded-xl">

    <div className="flex gap-2  items-center justify-start">
      <div className="relative flex items-center justify-center w-20 h-20 ">
        <img
          src={user?.profile_image || defaultImg}
          alt={user?.email || "User"}
          className="w-16 h-16 rounded-full border-[2px] border-[#DA68FFBF]"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png,image/jpeg,image/jpg"
        />
        {/* <div
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
        </div> */}
      </div>
      {(error || fileError) && (
        <p className="text-red-500 text-sm mt-2">{error || fileError}</p>
      )}
      <div className="flex flex-col items-start">

      <p className=" font-semibold text-lg dark:text-white capitalize">{user?.username || user?.fullname}</p>
      <p className="text-gray-600 dark:text-white capitalize">{ user?.email}</p>
      </div>
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
  <ActionButtons />
    </div>
  );
};

export default UserProfile;