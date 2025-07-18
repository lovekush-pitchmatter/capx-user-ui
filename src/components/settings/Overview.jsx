import React, { useEffect, useState, useRef } from "react";
import Input from "./Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../store/slices/profileSlice";
import { getUser } from "../../store/slices/authSlice";
import { countries } from "../../constants/countries";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { checkUserNameThunk } from "../../store/slices/authSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { updateLoading } = useSelector((state) => state.profile);
  const debounceRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    preferredLanguage: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    countryCode: "",
    mobileNumber: "",
    email: "",
    country: "",
    referredBy: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formErrors, setFormErrors] = useState({
    userNameAvailable: "",
    userNameError: "",
  });
  const [isUserTyping, setIsUserTyping] = useState(false);

  const checkUserName = (username) => {
    // Mark that user has started typing
    setIsUserTyping(true);

    const sanitized = username
      .replace(/[^a-zA-Z0-9]/g, "") // allow only alphanumeric characters
      .toLowerCase();

    // Always update the form data with sanitized input
    setFormData((prev) => ({ ...prev, username: sanitized }));

    if (sanitized.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        userNameError: "",
        userNameAvailable: "",
      }));
      return;
    }

    if (sanitized.length < 3) {
      setFormErrors((prev) => ({
        ...prev,
        userNameError: "Username must be at least 3 characters long.",
        userNameAvailable: "",
      }));
      return;
    }

    // Clear previous errors
    setFormErrors((prev) => ({
      ...prev,
      userNameError: "",
      userNameAvailable: "",
    }));
  };

  useEffect(() => {
    // Only check username availability if user has started typing
    if (!isUserTyping || !formData.username || formData.username.length < 3) {
      if (isUserTyping) {
        setFormErrors((prev) => ({
          ...prev,
          userNameAvailable: "",
          userNameError: "",
        }));
      }
      return;
    }

    // Debounce the API call
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const checkName = await dispatch(checkUserNameThunk(formData.username));
        if (
          checkName.type === checkUserNameThunk.fulfilled.type &&
          checkName.payload?.status === "ok"
        ) {
          setFormErrors((prev) => ({
            ...prev,
            userNameAvailable: checkName.payload.message,
            userNameError: "",
          }));
        } else {
          setFormErrors((prev) => ({
            ...prev,
            userNameError: "Username is not available",
            userNameAvailable: "",
          }));
        }
      } catch (err) {
        setFormErrors((prev) => ({
          ...prev,
          userNameError: "Error checking username availability.",
        }));
      }
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [formData.username, dispatch, isUserTyping]);

  useEffect(() => {
    if (user) {
      const parsed = parsePhoneNumberFromString("+" + user.mobile_number);
      setFormData({
        username: user.username || "",
        fullname: user.fullname || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        dateOfBirth: user.dob || "",
        nationality: user.nationality || "",
        preferredLanguage: user.language || "",
        address: user.address || "",
        state: user.state || "",
        city: user.city || "",
        zip: user.zip || "",
        countryCode: user.country_code || "",
        mobileNumber: user.mobile_number || "",
        email: user.email || "",
        country: user.country || "",
        referredBy: user.referred_from || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhoneChange = (value, country, e, formattedValue) => {
    try {
      const parsed = parsePhoneNumberFromString("+" + value);
      setFormData((prev) => ({
        ...prev,
        countryCode: parsed?.countryCallingCode || "",
        mobileNumber: parsed?.nationalNumber || "",
      }));
    } catch (err) {
      console.error("Invalid phone number");
    }
  };

  const handleSave = async () => {
    if (
      !formData.username ||
      !formData.fullname ||
      !formData.mobileNumber ||
      !formData.country
    ) {
      setErrorMsg("Please fill all required fields.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    const data = {
      fullname: formData.fullname,
      username: formData.username,
      mobileno: formData.mobileNumber,
      country_code: formData.countryCode,
      country: formData.country,
    };

    const { encryptedData, id } = encryptData(data);
    const { reqdata } = hashing(data, id);
    const payload = {
      data: encryptedData,
      reqid: id,
      reqdata: reqdata,
    };

    const result = await dispatch(updateUserProfile(payload));
    if (result.type && result.type.endsWith("fulfilled")) {
      setFormErrors((prev) => ({
        ...prev,
        userNameAvailable: "",
        userNameError: "",
      }));
      setSuccessMsg("Profile updated successfully");
      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      setFormErrors((prev) => ({
        ...prev,
        userNameAvailable: "",
        userNameError: "",
      }));
      setErrorMsg(result.payload || "Failed to update profile");
      setTimeout(() => setErrorMsg(""), 4000);
    }
    await dispatch(getUser());
  };

  const handleDiscard = () => {
    if (user) {
      const parsed = parsePhoneNumberFromString("+" + user.mobile_number);
      setFormData({
        username: user.username || "",
        fullname: user.fullname || "",
        countryCode: user.country_code || "",
        mobileNumber: user.mobile_number || "",
        email: user.email || "",
        country: user.country || "",
        referredBy: user.referred_from || "",
      });
      // Reset typing flag when discarding changes
      setIsUserTyping(false);
      setFormErrors((prev) => ({
        ...prev,
        userNameAvailable: "",
        userNameError: "",
      }));
    }
  };
  return (
    <div className="md:space-y-10 space-y-4">
      {successMsg && (
        <div
          className="mb-4 border border-green-800 bg-green-100 text-green-900 rounded"
          style={{ borderRadius: 5, padding: "12px 20px", fontWeight: 600 }}
        >
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div
          className="mb-4 border border-red-800 bg-red-100 text-red-900 rounded"
          style={{ borderRadius: 5, padding: "12px 20px", fontWeight: 600 }}
        >
          {errorMsg}
        </div>
      )}
      <div>
        <h3 className="md:text-2xl my-4 text-lg font-semibold text-purple-600">
          Personal Information
        </h3>
        <div className="shadow-sm border-2 border-purple-200 md:p-6 p-4 rounded-xl md:space-y-10 space-y-4">
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Username
            </label>
            <Input
              label="Username"
              value={formData.username}
              onChange={(e) => checkUserName(e.target.value)}
            />
            {formErrors.userNameError && (
              <p className="text-red-600 text-sm mt-1">
                {formErrors.userNameError}
              </p>
            )}
            {formErrors.userNameAvailable && (
              <p className="text-green-600 text-sm mt-1">
                {formErrors.userNameAvailable}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-4">
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                First Name
              </label>
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                Last Name
              </label>
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-4">
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                Date of Birth
              </label>
              <Input
                type="date"
                label="DOB"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                Nationality
              </label>
              <Input
                label="Nationality"
                value={formData.nationality}
                onChange={(e) => handleChange("nationality", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 items-center w-full md:gap-10 gap-4">
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                Preferred Language
              </label>
              <Input
                label="Preferred Language"
                value={formData.preferredLanguage}
                onChange={(e) =>
                  handleChange("preferredLanguage", e.target.value)
                }
              />
            </div>

            {user.referred_from && (
              <div>
                <label className="block mb-1 font-medium dark:text-white">
                  Referred by
                </label>
                <Input
                  label="Referred by"
                  value={formData.referredBy}
                  readOnly
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="md:text-2xl my-4 text-lg font-semibold text-purple-600">
          Contact Details
        </h3>
        <div className="shadow-sm border-2 border-purple-200 rounded-xl md:p-6 p-4 grid md:grid-cols-2 grid-cols-1 w-full gap-4 md:gap-10">
          <div className="w-full grid   md:gap-10 gap-4">
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                Phone Number
              </label>
              <PhoneInput
                country={"in"}
                value={formData.countryCode + formData.mobileNumber}
                onChange={handlePhoneChange}
                excludeCountries={[
                  "us",
                  "ca",
                  "cn",
                  "ir",
                  "kp",
                  "sy",
                  "by",
                  "mm",
                ]}
                containerClass="w-full"
                inputClass="!w-full !h-[46px] !rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:!bg-zinc-700 dark:!text-white dark:!border-zinc-600"
                enableSearch
              />
            </div>
          </div>

          <div className="w-full grid   md:gap-10 gap-4">
            {user.is_email_verified && (
              <div>
                <label className="block mb-1 font-medium dark:text-white">
                  Email
                </label>
                <Input label="Email" value={formData.email} readOnly />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="md:text-2xl my-4 text-lg font-semibold text-purple-600">
          Address
        </h3>
        <div className="shadow-sm border-2 border-purple-200 md:p-6 p-4 rounded-xl md:space-y-10 space-y-4">
          <div className="grid grid-cols-1">
            <label className="block mb-1 font-medium dark:text-white">
              Address
            </label>
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-4">
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                State / Province
              </label>
              <Input
                label="State"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                City
              </label>
              <Input
                label="City"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10  w-full">
            <div className="w-full">
              <label className="block mb-1 font-medium dark:text-white">
                Country
              </label>
              <select
                className="w-full h-[46px] pl-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block mb-1 font-medium dark:text-white">
                ZIP Code
              </label>
              <Input
                label="ZIP Code"
                value={formData.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex max-sm:flex-col md:justify-end items-center justify-center font-semibold gap-4 md:gap-10">
        <button
          className="bg-red-600 max-sm:w-full text-white px-6 py-2 rounded-md hover:bg-red-700"
          onClick={handleDiscard}
        >
          Discard changes
        </button>
        <button
          className="bg-[#7A44FF] outline-none max-sm:w-full text-white px-6 py-2 rounded-md hover:bg-purple-700"
          onClick={handleSave}
          disabled={updateLoading}
        >
          {updateLoading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default Overview;
