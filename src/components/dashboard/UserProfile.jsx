import { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../store/slices/profileSlice";
import defaultImg from "../../assets/images/user_default.png";

//icon-images
import Polls from "../../assets/dashboard/polls.png";
import Spins from "../../assets/dashboard/spins.png";
import Games from "../../assets/dashboard/games.png";
import Surveys from "../../assets/dashboard/surveys.png";
import Quiz from "../../assets/dashboard/quiz.png";
import LogoutIcon from "../../assets/dashboard/logout.png";

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
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-5">
      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr,auto] items-center gap-4 sm:gap-6">
        {/* Left: Avatar + name + id */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full md:w-auto">
          <div className="relative">
            <img
              src={user?.profile_image || defaultImg}
              alt={user?.username || user?.fullname || "User"}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover"
            />
            {/* Edit avatar button */}
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-zinc-800 shadow ring-1 ring-black/5"
              aria-label="Edit profile picture"
            >
              <MdEdit className="w-3.5 h-3.5 text-gray-700 dark:text-gray-200" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {user?.username || user?.fullname}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">ID: {user?.id}</p>
            {fileError && (
              <p className="mt-1 text-xs text-red-500">{fileError}</p>
            )}
          </div>
          {/* Logout button for mobile inside left section */}
          <div className="md:hidden">
            <button
              type="button"
              className="ml-3 flex flex-col items-center text-gray-700 dark:text-gray-200 text-xs sm:text-sm hover:opacity-90"
            >
              <img src={LogoutIcon} alt="Logout" className="w-5 h-5 mb-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Middle: icons row + description */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center justify-evenly flex-wrap gap-3 sm:gap-4">
            <div className="flex flex-col items-center text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs shrink-0">
              <img src={Polls} alt="Polls" className="w-8 h-8 sm:w-9 sm:h-9 mb-1 object-contain" />
              <span>Polls</span>
            </div>
            <div className="flex flex-col items-center text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs shrink-0">
              <img src={Spins} alt="Spins" className="w-8 h-8 sm:w-9 sm:h-9 mb-1 object-contain" />
              <span>Spins</span>
            </div>
            <div className="flex flex-col items-center text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs shrink-0">
              <img src={Games} alt="Games" className="w-8 h-8 sm:w-9 sm:h-9 mb-1 object-contain" />
              <span>Games</span>
            </div>
            <div className="flex flex-col items-center text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs shrink-0">
              <img src={Surveys} alt="Surveys" className="w-8 h-8 sm:w-9 sm:h-9 mb-1 object-contain" />
              <span>Surveys</span>
            </div>
            <div className="flex flex-col items-center text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs shrink-0">
              <img src={Quiz} alt="Quizzes" className="w-8 h-8 sm:w-9 sm:h-9 mb-1 object-contain" />
              <span>Quizzes</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 text-center">
            <span className="text-violet-600 font-semibold">Earn ANGEL Coins</span> — Polls, tasks & surveys that pave your way to becoming an Angel Investor
          </p>
        </div>

        {/* Right: Logout for desktop */}
        <button
          type="button"
          className="hidden md:flex flex-col items-center text-gray-700 dark:text-gray-200 text-xs sm:text-sm hover:opacity-90 justify-self-end"
        >
          <img src={LogoutIcon} alt="Logout" className="w-5 h-5 mb-1" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;