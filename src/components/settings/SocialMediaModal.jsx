import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaSquareXTwitter, FaTelegram } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { saveProfileLinks, getProfileLinks } from "../../store/slices/profileSlice";

const socialMediaPlatforms = [
  { 
    name: "instagram", 
    icon: FaInstagram, 
    color: "text-pink-500",
    placeholder: "https://instagram.com/username"
  },
  { 
    name: "twitter", 
    icon: FaSquareXTwitter, 
    color: "text-blue-400",
    placeholder: "https://twitter.com/username"
  },
  { 
    name: "facebook", 
    icon: FaFacebook, 
    color: "text-blue-600",
    placeholder: "https://facebook.com/username"
  },
  { 
    name: "telegram", 
    icon: FaTelegram, 
    color: "text-blue-500",
    placeholder: "https://t.me/username"
  },
];

const SocialMediaModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { socialMediaLinks, socialLinksLoading, updateError } = useSelector((state) => state.profile);
  
  const [links, setLinks] = useState({
    instagram: "",
    twitter: "",
    facebook: "",
    telegram: "",
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      dispatch(getProfileLinks());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (socialMediaLinks && socialMediaLinks.length > 0) {
      const linkMap = {};
      socialMediaLinks.forEach(link => {
        linkMap[link.name] = link.link;
      });
      setLinks(prev => ({ ...prev, ...linkMap }));
    }
  }, [socialMediaLinks]);

  const validateURL = (url) => {
    if (!url) return true; // Empty is valid
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (platform, value) => {
    setLinks(prev => ({ ...prev, [platform]: value }));
    
    // Clear error when user starts typing
    if (errors[platform]) {
      setErrors(prev => ({ ...prev, [platform]: "" }));
    }
  };

  const handleSave = async () => {
    const newErrors = {};
    
    // Validate URLs
    Object.keys(links).forEach(platform => {
      if (links[platform] && !validateURL(links[platform])) {
        newErrors[platform] = "Please enter a valid URL";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data for API - only include non-empty links
    const profileLinkArray = Object.keys(links)
      .filter(platform => links[platform].trim() !== "")
      .map(platform => ({
        name: platform,
        link: links[platform].trim()
      }));

    try {
      await dispatch(saveProfileLinks(profileLinkArray)).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to save profile links:", error);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Social Media Links
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            X
          </button>
        </div>

        {updateError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
            {updateError}
          </div>
        )}

        <div className="space-y-4">
          {socialMediaPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <div key={platform.name}>
                <label className="flex items-center gap-3 mb-2">
                  <IconComponent 
                    size={24} 
                    className={platform.color} 
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {platform.name}
                  </span>
                </label>
                <input
                  type="url"
                  value={links[platform.name]}
                  onChange={(e) => handleInputChange(platform.name, e.target.value)}
                  placeholder={platform.placeholder}
                  className={`w-full px-3 py-2 border rounded-md text-sm transition-colors
                    ${errors[platform.name] 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-purple-500'
                    }
                    dark:bg-zinc-700 dark:border-zinc-600 dark:text-white
                    focus:outline-none focus:ring-1 focus:ring-purple-500
                  `}
                />
                {errors[platform.name] && (
                  <p className="mt-1 text-xs text-red-500">{errors[platform.name]}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-600 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
            disabled={socialLinksLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={socialLinksLoading}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {socialLinksLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaModal;
