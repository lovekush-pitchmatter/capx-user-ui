import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { register, verifyOtp, resendOtp, checkUserNameThunk } from "../../store/slices/authSlice";
import OtpModal from "../../components/common/OtpModal";
import "../../styles/input.css";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import loginIllustration from '../../assets/images/login_illustaration.png';
import SignInOptions from "../../components/auth";
import lightLogo from "../../assets/images/capshield_logo_dark.png";
import darkLogo from "../../assets/images/capshield_logo_light.png";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios'; 

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const debounceRef = useRef();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isCountryCodeFocused, setIsCountryCodeFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: '', password: '', confirmPassword: '', registerError: '', registerSuccess: '', userNameAvailable: "", userNameError: "", firstName: "", lastName: "" });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [havereferral, setHavereferral] = useState(false);
  const [regRequestId, setRequestId] = useState("");
  const [username, setUserName] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refcode } = useParams();
  const storedTheme = localStorage.getItem("theme");
  

  const [phone, setPhone] = useState('');
  const [defaultCountry, setDefaultCountry] = useState('ae');

    const [blocked, setBlocked] = useState(false);
    const BLOCKED_COUNTRIES = [
        "US", // United States
        "CA", // Canada
        "CN", // China
        "IR", // Iran
        "KP", // North Korea
        "SY", // Syria
        "BY", // Belarus
        "MM", // Myanmar
      ];

  const handlePhoneChange = (value, data) => {
    const dialCode = '+' + data.dialCode;
    const number = value.replace(dialCode, '');

    setPhone(value);
    setCountryCode(dialCode);
    setMobileNumber(number);
  };

  useEffect(() => {
      const checkLocation = async () => {
        try {
          const res = await fetch("https://ipapi.co/json");
          const data = await res.json();
          if (BLOCKED_COUNTRIES.includes(data.country)) {
            setBlocked(true);
          }
        } catch (err) {
          console.error("Geolocation check failed:", err);
        }
      };
  
      checkLocation();
    }, []);

  useEffect(() => {
    axios.get('https://ipapi.co/json/')
      .then((res) => {
        if (res.data?.country_code) {
          setDefaultCountry(res.data.country_code.toLowerCase());
        }
      })
      .catch(() => {
        setDefaultCountry('ae');
      });
  }, []);

  useEffect(() => {
    if (refcode) {
      setHavereferral(true);
    }
  }, [refcode]);

  useEffect(() => {
    if (formErrors.registerError) {
      const timer = setTimeout(() => {
        setFormErrors((prev) => ({ ...prev, registerError: "" }));
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (formErrors.registerSuccess) {
      const timer = setTimeout(() => {
        setFormErrors((prev) => ({ ...prev, registerSuccess: "" }));
      }, 4000);
      return () => clearTimeout(timer);
    }

    if (formErrors.userNameAvailable) {
      const timer = setTimeout(() => {
        setFormErrors((prev) => ({ ...prev, userNameAvailable: "", userNameError: "" }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [formErrors.registerError, formErrors.registerSuccess, formErrors.userNameAvailable]);

  const fillPassword = (e) => {
    setPassword(e.target.value);
    setFormErrors({ ...formErrors, password: "" });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  const checkUserName = async (username) => {
  const sanitized = username
    .replace(/[^a-zA-Z0-9]/g, '') // allow only alphanumeric characters
    .toLowerCase();

  if (sanitized.length === 0) {
    setFormErrors((prev) => ({ ...prev, userNameError: "Username must have at least 1 valid character." }));
    setUserName('');
    return;
  }

  setUserName(sanitized);
  setFormErrors((prev) => ({ ...prev, userNameError: '', userNameAvailable: '' }));

  try {
    const res = await checkUsernameAvailability(sanitized);
    if (res.isAvailable) {
      setFormErrors((prev) => ({ ...prev, userNameAvailable: "Username is available!" }));
    } else {
      setFormErrors((prev) => ({ ...prev, userNameError: "Username is already taken." }));
    }
  } catch (err) {
    
  }
};


  useEffect(() => {
    if (!username) {
      setFormErrors((prev) => ({ ...prev, userNameAvailable: "", userNameError: "" }));
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const checkName = await dispatch(checkUserNameThunk(username));
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
    }, 100);
    return () => clearTimeout(debounceRef.current);
  }, [username, dispatch]);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    let errors = { email: '', password: '', confirmPassword: '', registerError: '' };
    let valid = true;
    if (!firstName || !lastName || !email || !password || !confirmPassword || !username || !mobileNumber) {
      errors.registerError = "Please fill all fields.";
      valid = false;
    }

    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(firstName)) {
      errors.firstName = "First name must contain only letters.";
      valid = false;
    }
    if (!nameRegex.test(lastName)) {
      errors.lastName = "Last name must contain only letters.";
      valid = false;
    }

    const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;

    if (!usernameRegex.test(username)) {
      errors.userNameError = "Username must be alphanumeric and 3-16 characters long.";
      valid = false;
    }

    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!passwordRegex.test(password)) {
      errors.password = "Password must be 8+ chars, include uppercase, lowercase, number, special char.";
      valid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      valid = false;
    }
    setFormErrors(errors);
    if (!valid) return;
    setRegisterLoading(true);
    try {
      const resultAction = await dispatch(
        register({
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          countryCode,
          mobileNumber: mobileNumber || undefined,
          refcode,
          username
        })
      );
      const payload = resultAction.payload;

      if (resultAction.type === register.fulfilled.type && payload?.status === "ok") {
        setRequestId(payload.req);
        setOtpModalOpen(true);
        setFormErrors((prev) => ({ ...prev, registerSuccess: payload.message, registerError: "" }));
      } else {
        setFormErrors((prev) => ({ ...prev, registerError: payload || "Registration failed", registerSuccess: "" }));
      }
    } catch (err) {
      setFormErrors((prev) => ({ ...prev, registerError: "Registration failed", registerSuccess: "" }));
    }
    setRegisterLoading(false);
  };

  const handleVerifyOtp = async (otp) => {
    setOtpLoading(true);
    try {
      const data = {
        reqid: regRequestId,
        otp
      }
      const { encryptedData, id } = encryptData(data);
      const { reqdata } = hashing(data, id);
      if (
        encryptedData == "" ||
        encryptedData == null ||
        encryptedData == undefined ||
        id == undefined ||
        id == null ||
        isNaN(id) ||
        id == "" ||
        reqdata == "" ||
        reqdata == null ||
        reqdata == undefined
      ) {
        setFormErrors({ ...formErrors, registerError: "Invalid request data. Please try again later." });
      } else {
        const finalData = {
          data: encryptedData,
          reqid: id,
          reqdata: reqdata,
        };
        const resultAction = await dispatch(verifyOtp(finalData));
        const payload = resultAction.payload;
        if (resultAction.type === verifyOtp.fulfilled.type && payload?.status === "ok") {
          setOtpModalOpen(false);
          navigate("/dashboard");
        } else {
          setFormErrors({ ...formErrors, registerError: payload || "Invalid OTP" });
        }
      }

    } catch (err) {
      console.log("err", err)
      setFormErrors({ ...formErrors, registerError: "Invalid OTP" });
    }
    setOtpLoading(false);
  };

  const handleResendOtp = async () => {
    setOtpLoading(true);
    try {
      const data = {
        reqid: regRequestId,
      }
      const { encryptedData, id } = encryptData(data);
      const { reqdata } = hashing(data, id);
      if (
        encryptedData == "" ||
        encryptedData == null ||
        encryptedData == undefined ||
        id == undefined ||
        id == null ||
        isNaN(id) ||
        id == "" ||
        reqdata == "" ||
        reqdata == null ||
        reqdata == undefined
      ) {
        setFormErrors({ ...formErrors, registerError: "Invalid request data. Please try again later." });
      } else {
        const finalData = {
          data: encryptedData,
          reqid: id,
          reqdata: reqdata,
        };
        const resultAction = await dispatch(resendOtp(finalData));
        if (resendOtp.rejected.match(resultAction)) {
          setFormErrors({ ...formErrors, registerError: resultAction.payload || "Failed to resend OTP" });
        }
      }
    } catch (err) {
      setFormErrors({ ...formErrors, registerError: "Failed to resend OTP" });
    }
    setOtpLoading(false);
  };

    if(blocked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-xl font-semibold mb-4">Access Restricted</h1>
          <p className="text-gray-600">
            Unfortunately, access to this application is restricted in your region.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col lg:flex-row p-0 m-0 font-roboto">

        {!havereferral && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                color: "#b91c1c", // red-700
                padding: "24px 32px",
                borderRadius: "12px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
                maxWidth: "400px",
                fontFamily: "sans-serif",
              }}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>
                🚨 Referral Required
              </h2>
              <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
                For compliance and security, this is an invite-only platform with limited access.
              </p>
              <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
                👉 Please sign up using a referral link from an approved member.
              </p>
            </div>
          </div>
        )}
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-[#FFFFFF] py-8 px-0 flex flex-col items-start">
          {/* Logo */}
          <div className="w-full max-w-[150px] ml-4 mb-8">
            <img
              src={storedTheme === "dark" ? darkLogo : lightLogo}
              alt="CapShield Logo"
              className="h-15 w-full object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="max-w-[400px] mx-auto flex flex-col items-center gap-[48px]">
            {/* Heading and Subtext */}
            <div className="flex flex-col items-center gap-[23.24px]">
              <div className="flex flex-col items-center gap-[24.35px]">
                <div className="flex flex-col items-center gap-[17.7px]">
                  <div className="flex flex-col items-center gap-[5.54px] leading-[38.4px]">
                    <h2 className="w-full font-semibold text-[32.45px] leading-[38.4px] text-start text-[#000000] whitespace-nowrap">
                      Sign up for an account
                    </h2>
                    <p className="w-[207.6px] h-[16.8px] font-medium text-[14.35px] leading-[16.8px] text-center text-[rgba(7,0,23,0.3)]">
                      Access smarter investing tools and protection.
                    </p>
                    <p className="w-[112.8px] mt-4 h-[10.8px] font-medium text-[9.48px] leading-[10.8px] text-center text-[#7A44FF] whitespace-nowrap" style={{ marginTop: "25px"}}>
                      Invited By: {refcode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col items-end gap-[12.17px] w-[340.26px]">
                {/* Google and Apple Sign-In Buttons */}
                <SignInOptions refcode={refcode} />

                <div className="w-full">
                  {formErrors.registerSuccess && (
                    <div className="input-success w-full mb-2 mt-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded px-3 py-2 animate-fade-in">
                      {formErrors.registerSuccess}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  {formErrors.registerError && (
                    <div className="input-error w-full mb-2 mt-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded px-3 py-2 animate-fade-in">
                      {formErrors.registerError}
                    </div>
                  )}
                </div>
                {/* Name Fields */}
                <div className="flex flex-row items-left gap-[28.64px] w-full">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-[155.18px] h-[41.46px] bg-[#FFFFFF] border border-[#DEE3E9] rounded-[6.19px] px-[10px] py-[15.4px] font-roboto font-normal text-[12.72px] leading-[14.4px] text-[#A0AEBF] text-left focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-[155.18px] h-[41.46px] bg-[#FFFFFF] border border-[#DEE3E9] rounded-[6.19px] px-[10px] py-[15.4px] font-roboto font-normal text-[12.72px] leading-[14.4px] text-[#A0AEBF] text-left focus:outline-none"
                  />
                </div>
                <div className="w-full">
                {formErrors.firstName && (
                  <div className="input-error mb-3 text-red-500 text-xs font-medium mt-3">
                    {formErrors.firstName}
                  </div>
                )}

                {formErrors.lastName && (
                  <div className="input-error mb-3 text-red-500 text-xs font-medium mt-3">
                    {formErrors.lastName}
                  </div>
                )}
                </div>
                {/* Email and Phone Fields */}
                <div className="flex flex-col gap-[13.16px] w-full">
                  <input
                    type="email"
                    placeholder="Email Id"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFormErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    className="w-[339.98px] h-[41.46px] bg-[#FFFFFF] border border-[#DEE3E9] rounded-[6.19px] px-[10px] py-[15.4px] font-roboto font-normal text-[12.72px] leading-[14.4px] text-[#A0AEBF] text-left focus:outline-none"
                  />
                  {formErrors.email && (
                    <div className="input-error mb-3 text-red-500 text-xs font-medium mt-3">
                      {formErrors.email}
                    </div>
                  )}
                  <div className="flex flex-row items-center w-full">
                    {/* <select
                      className={`w-[61.7px] h-[39.84px] whitespace-nowrap bg-[#FFFFFF] border border-[#DEE3E9] rounded-l-[5.78px] px-[10px] font-roboto font-normal text-[12.72px] leading-[14.4px] ${isCountryCodeFocused
                        ? "text-[#7A44FF]"
                        : "text-[#A0AEBF]"
                        } focus:outline-none`}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      onFocus={() => setIsCountryCodeFocused(true)}
                      onBlur={() => setIsCountryCodeFocused(false)}
                    >
                      <option value={"+91"}>+91</option>
                      <option value={"+1"}>+1</option>
                      <option value={"+44"}>+44</option>
                    </select>
                    <div className="w-[0px] h-[39.84px] border-l border-[#DEE3E9]"></div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="flex-grow h-[39.84px] bg-[#FFFFFF] border border-[#DEE3E9] border-l-0 rounded-r-[5.78px] px-[10px] py-[15.4px] font-roboto font-normal text-[12.72px] leading-[14.4px] text-[#A0AEBF] focus:outline-none"
                    />
                  </div> */}

                    <PhoneInput
                      country={defaultCountry}
                      value={phone}
                      onChange={handlePhoneChange}
                      enableSearch={true}
                      excludeCountries={['us', 'ca', 'cn', 'ir', 'kp', 'sy', 'by', 'mm']}
                      inputClass="!w-full !h-[40px] !text-sm !pl-[48px] !border-[#DEE3E9] !rounded-md !focus:outline-none"
                      buttonClass="!border-[#DEE3E9]"
                      dropdownClass="!text-sm !z-[1000]"
                      containerClass="!w-full"
                      placeholder="Enter phone number"
                    /></div>

                  <div className="flex flex-col w-full">
                    
                    <input
                      type="text"
                      placeholder="User Name"
                      value={username}
                      onChange={(e) => checkUserName(e.target.value)}
                      className="flex-grow h-[39.84px] bg-[#FFFFFF] border border-[#DEE3E9] rounded-[5.78px] px-[10px] py-[15.4px] font-roboto font-normal text-[12.72px] leading-[14.4px] text-[#A0AEBF] focus:outline-none"
                    />

                    {formErrors.userNameError && (
                      <div className="input-error mb-3 text-red-500 text-xs font-medium mt-3">
                        {formErrors.userNameError}
                      </div>
                    )}

                    {formErrors.userNameAvailable && (
                      <div className="input-error text-green-500 text-xs font-medium mt-1">
                        {formErrors.userNameAvailable}
                      </div>
                    )}

                  </div>

                  {/* Password Fields */}
                  <div className="relative w-[339.6px] h-[40.8px]">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setFormErrors((prev) => ({ ...prev, password: '' }));
                        fillPassword(e);
                      }}
                      className="w-full h-full bg-[#FFFFFF] border-[2px] border-[#DEE3E9] rounded-[6.19px] px-[10px] py-[15.4px] font-roboto font-normal text-[12.72px] leading-[14.4px] text-[#A0AEBF] focus:outline-none"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />

                    <span
                      className="absolute right-[10px] top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg
                          width="18"
                          height="16.8"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.24218 5.62055L6.32587 8.53686C5.95124 8.16224 5.7207 7.64929 5.7207 7.0787C5.7207 5.93754 6.64286 5.01538 7.78403 5.01538C8.35461 5.01538 8.86756 5.24592 9.24218 5.62055Z"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.1375 3.488C10.1288 2.72723 8.97615 2.31226 7.78311 2.31226C5.74861 2.31226 3.85242 3.51106 2.53259 5.58591C2.01388 6.39856 2.01388 7.7645 2.53259 8.57715C2.9879 9.29182 3.51814 9.90851 4.09449 10.4042"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.7207 11.4185C6.37774 11.6952 7.07512 11.845 7.78403 11.845C9.81853 11.845 11.7147 10.6462 13.0346 8.57138C13.5533 7.75873 13.5533 6.39279 13.0346 5.58014C12.8444 5.28044 12.6369 4.99803 12.4236 4.73291"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.80694 7.48193C9.65709 8.29458 8.99429 8.95738 8.18164 9.10723"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.32582 8.53687L2.02051 12.8422"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.5465 1.31519L9.24121 5.6205"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16.6"
                          height="16.6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                            fill="#A0AEBF"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                                      {formErrors.password && (
                      <div className="input-error mb-3 text-red-500 text-xs font-medium mt-3">
                        {formErrors.password}
                      </div>
                    )}
                  {isPasswordFocused && (
                    <div className="mt-2">
                      <p className="font-roboto font-normal text-[10.96px] text-[#A0AEBF] mb-1">
                        Password must include:
                      </p>
                      {(() => {
                        const checks = [
                          {
                            label: '8 characters',
                            valid: password.length >= 8,
                          },
                          {
                            label: '1 Uppercase',
                            valid: /[A-Z]/.test(password),
                          },
                          {
                            label: '1 Lowercase',
                            valid: /[a-z]/.test(password),
                          },
                          {
                            label: '1 Number',
                            valid: /[0-9]/.test(password),
                          },
                          {
                            label: '1 Special character',
                            valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
                          },
                        ];
                        return (
                          <div className="flex flex-col gap-0.5">
                            {checks.map((item, idx) => (
                              <div key={item.label} className="flex items-center gap-1">
                                {item.valid ? (
                                  <svg width="10.8" height="8.4" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.19618 0.450859C8.38061 0.608935 8.40196 0.886585 8.24389 1.07101L4.00335 6.0183L1.03131 3.54159C0.844707 3.38609 0.819496 3.10876 0.974996 2.92216C1.1305 2.73556 1.40782 2.71035 1.59442 2.86585L3.90005 4.78721L7.57604 0.498563C7.73411 0.314141 8.01176 0.292783 8.19618 0.450859Z" fill="#13C313" />
                                  </svg>
                                ) : (
                                  <svg width="10.8" height="8.4" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="5" r="4" stroke="#F87171" strokeWidth="1.5" fill="none" />
                                    <path d="M3.2 3.2L6.8 6.8M6.8 3.2L3.2 6.8" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
                                  </svg>
                                )}
                                <span className={`font-roboto font-normal text-[10.96px] ${item.valid ? 'text-green-600' : 'text-red-500'}`}>{item.label}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  <div className="relative w-[340.26px] h-[41.81px]">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      className="w-full h-full bg-[#FFFFFF] border border-[#DEE3E9] rounded-[6.19px] px-[10px] py-[15.4px] font-roboto font-normal text-[12.72px] leading-[14.4px] text-[#A0AEBF] focus:outline-none"
                    />
                    {formErrors.confirmPassword && (
                      <div className="input-error mb-3 text-red-500 text-xs font-medium mt-3">
                        {formErrors.confirmPassword}
                      </div>
                    )}
                    <span
                      className="absolute right-[10px] top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <svg
                          width="18"
                          height="16.8"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.24218 5.62055L6.32587 8.53686C5.95124 8.16224 5.7207 7.64929 5.7207 7.0787C5.7207 5.93754 6.64286 5.01538 7.78403 5.01538C8.35461 5.01538 8.86756 5.24592 9.24218 5.62055Z"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.1375 3.488C10.1288 2.72723 8.97615 2.31226 7.78311 2.31226C5.74861 2.31226 3.85242 3.51106 2.53259 5.58591C2.01388 6.39856 2.01388 7.7645 2.53259 8.57715C2.9879 9.29182 3.51814 9.90851 4.09449 10.4042"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.7207 11.4185C6.37774 11.6952 7.07512 11.845 7.78403 11.845C9.81853 11.845 11.7147 10.6462 13.0346 8.57138C13.5533 7.75873 13.5533 6.39279 13.0346 5.58014C12.8444 5.28044 12.6369 4.99803 12.4236 4.73291"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.80694 7.48193C9.65709 8.29458 8.99429 8.95738 8.18164 9.10723"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.32582 8.53687L2.02051 12.8422"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.5465 1.31519L9.24121 5.6205"
                            stroke="#A0AEBF"
                            stroke-width="1.03743"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16.6"
                          height="16.6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                            fill="#A0AEBF"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>

                {/* Policy Checkbox */}
                <div className="flex flex-row items-center gap-[4.8px] w-[336.43px] mt-5">
                  <input
                    type="checkbox"
                    className="w-[16px] h-[16px] border border-[#DADCDE] rounded-[1.85px] accent-[#7A44FF]"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <span className="font-roboto font-normal text-[11.06px] leading-[14.4px] text-[#A0AEBF]">
                    By creating an account you are agreeing to our{" "}
                    <a href="#" className="text-[#16181B] hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#16181B] hover:underline">
                      Electronic Communication Policy
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Button and Footer Links */}
            <div className="flex flex-col items-center gap-[14.22px] w-[339.88px]">
              <button
                className={`w-full h-[38.71px] rounded-[6.19px] px-[144.53px] py-[10.66px] font-roboto font-semibold text-[14.35px] leading-[16.8px] text-[#FFFFFF] hover:bg-purple-700 whitespace-nowrap ${isChecked ? "bg-gradient-to-r from-[#B500EF] to-[#37009A]" : "bg-gray-400 cursor-not-allowed"
                  }`}
                disabled={!isChecked || registerLoading}
                onClick={handleRegister}
              >
                {registerLoading ? "Signing Up..." : "Sign Up"}
              </button>
              {formErrors.registerSuccess && (
                <div className="input-success mb-3 text-green-600 text-xs font-medium mt-3 bg-green-50 p-2 rounded">
                  {formErrors.registerSuccess}
                </div>
              )}
              <div className="flex flex-row gap-[3.55px]">
                <span className="font-roboto font-normal text-[12.17px] leading-[15.6px] text-[#000000]">
                  Already have an account?
                </span>
                <button
                  className="font-roboto font-normal text-[12.17px] leading-[15.6px] text-[#000000] underline hover:text-[#7A44FF] bg-transparent border-none cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-[400px] mx-auto mt-[73.2px] flex flex-col gap-[25.2px]">
            <div className="flex flex-row flex-wrap justify-center items-center gap-x-[67.02px] gap-y-[31.2px] w-full">
              <a
                href="#"
                className="font-roboto font-normal text-[10.27px] leading-[13.2px] text-[#4A5567] text-center"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-roboto font-normal text-[10.27px] leading-[13.2px] text-[#4A5567] text-center"
              >
                Terms and Conditions
              </a>
              {/* <div className="relative">
                <div
                  className="flex flex-row items-center gap-[5.26px] w-[71.72px] h-[20.4px] bg-[#FFFFFF] rounded-[3.6px] px-[2.4px] cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <svg
                    width="14.4"
                    height="14.4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.28354 10.7724C8.80353 10.7724 10.8464 8.72956 10.8464 6.20957C10.8464 3.68958 8.80353 1.64673 6.28354 1.64673C3.76356 1.64673 1.7207 3.68958 1.7207 6.20957C1.7207 8.72956 3.76356 10.7724 6.28354 10.7724Z"
                      stroke="#4A5567"
                      stroke-width="0.821311"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.4581 2.10303H4.91439C4.02463 4.76773 4.02463 7.65144 4.91439 10.3161H4.4581"
                      stroke="#4A5567"
                      stroke-width="0.821311"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.65234 2.10303C8.5421 4.76773 8.5421 7.65144 7.65234 10.3161"
                      stroke="#4A5567"
                      stroke-width="0.821311"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.17676 8.0349V7.57861C4.84146 8.46837 7.72517 8.46837 10.3899 7.57861V8.0349"
                      stroke="#4A5567"
                      stroke-width="0.821311"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.17676 4.8409C4.84146 3.95115 7.72517 3.95115 10.3899 4.8409"
                      stroke="#4A5567"
                      stroke-width="0.821311"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="font-roboto font-normal text-[10.27px] leading-[13.2px] text-[#4A5567]">
                    {selectedLanguage}
                  </span>
                  <svg
                    width="10.51"
                    height="10.51"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#4A5567"
                      strokeWidth="0.657049"
                    />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute mt-1 w-[71.72px] bg-white border border-[#DEE3E9] rounded-[3.6px] shadow-lg z-10">
                    {[
                      "Spanish",
                      "French",
                      "German",
                      "Portuguese",
                      "Japanese",
                    ].map((language) => (
                      <div
                        key={language}
                        className="px-2 py-1 font-roboto font-normal text-[10.27px] leading-[13.2px] text-[#4A5567] hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleLanguageSelect(language)}
                      >
                        {language}
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
            <p className="font-roboto font-normal text-[10.27px] leading-[13.2px] text-[#4A5567] text-center">
              2025 CAPShield. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-r from-[#B500EF] to-[#37009A] flex justify-center items-center px-4 py-4">
          {" "}
          {/* ✨ Updated: responsive padding */}
          <div className="max-w-[500px]">
            <div className="w-full">
              <img
                src={loginIllustration}
                alt="Sign In Illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <OtpModal
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        loading={otpLoading}
        error={formErrors.registerError}
        email={email}
      />
    </>
  );
};

export default SignUpPage;
