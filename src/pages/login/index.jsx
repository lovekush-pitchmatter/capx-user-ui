import React, { useState, useEffect } from "react";
import AppleLogin from "react-apple-login";
import axios from "axios";
import { API_CONSTANTS, ENV_CONSTANTS } from "../../constants";
import googleImg from "../../assets/images/google_logo.png";
import appleImg from "../../assets/images/apple_logo.png";
import metamaskImg from "../../assets/images/metamask_logo.png";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet } from "@reown/appkit/networks";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  metamaskLoginThunk,
  googleLoginThunk,
  appleLoginThunk,
} from "../../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import "../../styles/input.css";
import SignInOptions from "../../components/auth";
import loginIllustration from '../../assets/images/login_illustaration.png';
import lightLogo from "../../assets/images/capshield_logo_dark.png";
import darkLogo from "../../assets/images/capshield_logo_light.png";
import Loader from "../loader";

const LoginPage = () => {

  // const projectId = "ad069583f9dd4f242a83d33ff462a15a";
  // const clientId =
  //   "142955849396-llsu26h5650poa898j1s9rtspbfs7gom.apps.googleusercontent.com";
  // const networks = [mainnet];
  // const metadata = {
  //   name: "CAPX",
  //   description: "CAPX",
  //   url: "https://dashboard.capshield.io/",
  //   icons: ["https://avatars.zynking.com/"],
  // };

  // createAppKit({
  //   adapters: [new EthersAdapter()],
  //   networks,
  //   metadata,
  //   projectId,
  //   features: {
  //     analytics: true,
  //   },
  // });

  const projectId = "ad069583f9dd4f242a83d33ff462a15a";
  const clientId = "142955849396-llsu26h5650poa898j1s9rtspbfs7gom.apps.googleusercontent.com";
  const networks = [mainnet];
  const metadata = {
    name: "CAPX",
    description: "CAPX",
    url: "https://dashboard.capshield.io",
    icons: ["https://avatars.zynking.com/"],
  };

  createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
      analytics: true,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // Add preloader state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [formErrors, setFormErrors] = useState({ email: "", password: "", loginError: "" });
  const { open } = useAppKit();
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const storedTheme = localStorage.getItem("theme");
  const [iamconnect, setIamConnecting] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [userCountry, setUserCountry] = useState('UAE');
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


  const { error } = useSelector(
    (state) => state.auth
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Preloader effect - show loader for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  //useeffect add countries restriction here
  useEffect(() => {
    const checkLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json");
        const data = await res.json();
        if (BLOCKED_COUNTRIES.includes(data.country)) {
          setBlocked(true);
        }
        // Set user country for login
        if (data.country_name) {
          setUserCountry(data.country_name);
        }
      } catch (err) {
        console.error("Geolocation check failed:", err);
        setUserCountry('United Arab Emirates'); // fallback
      }
    };

    checkLocation();
  }, []);

  useEffect(() => {
    if (formErrors.loginError) {
      const timer = setTimeout(() => {
        setFormErrors((prev) => ({ ...prev, loginError: "" }));
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [formErrors.loginError]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  const fillEmail = (e) => {
    setEmail(e.target.value);
    setFormErrors({ ...formErrors, email: "" });
  };

  const fillPassword = (e) => {
    setPassword(e.target.value);
    setFormErrors({ ...formErrors, password: "" });
  };

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const clearReownWalletSession = () => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("@appkit/") ||
        key.startsWith("CBWSDK:") ||
        key === "reown__account"
      ) {
        localStorage.removeItem(key);
      }
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    let errors = { email: "", password: "" };
    let valid = true;


    // if (!validateEmail(email)) {
    //   setLoading(false);
    //   errors.email = "Please enter a valid email address.";
    //   valid = false;
    // }

    if (!password) {
      setLoading(false);
      errors.password = "Password cannot be empty.";
      valid = false;
    }
    setFormErrors(errors);
    if (!valid) return;

    const resultAction = await dispatch(login({ email, password }));
    const payload = resultAction.payload;
    if (resultAction.type === login.fulfilled.type && payload?.status === "ok") {
      if (payload.is_active) {
        setLoading(false);
        navigate("/two-factor", { state: { email: payload.email, user: payload.user, req: payload.req } });
      } else {
        setLoading(false);
        navigate("/dashboard");
      }
    } else {
      
      setLoading(false);
      const errorMessage =
        typeof payload === "string"
          ? payload
          : "Invalid email or password!";
      setFormErrors({ ...formErrors, loginError: errorMessage });
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      // console.log("Google login initiated:", credentialResponse);
      
      if (!credentialResponse?.credential) {
        throw new Error("No credential received from Google");
      }
      
      const credential = credentialResponse.credential;
      const refcode = "";
      const country = userCountry;
      
      // console.log("Google login payload:", { 
      //   credential: credential ? "present" : "missing", 
      //   credentialLength: credential?.length,
      //   refcode, 
      //   country 
      // });
      
      const resultAction = await dispatch(googleLoginThunk({ credential, refcode, country }));
      const payload = resultAction.payload;
      
      // console.log("Google login result action:", resultAction);
      // console.log("Google login payload:", payload);
      
      if (resultAction.type === googleLoginThunk.fulfilled.type && payload?.status === "ok") {
        if (payload.is_active) {
          navigate("/two-factor", {
            state: {
              email: payload.email,
              user: payload.user,
              req: payload.req,
            },
          });
        } else {
          navigate("/dashboard");
        }
      } else {
        // console.error("Google login error - fulfilled but status not ok:", resultAction);
        const errorMessage = payload?.message || payload || "Google login failed! Please create an account with referral link or try again.";
        setFormErrors({
          ...formErrors,
          loginError: errorMessage,
        });
      }
    } catch (error) {
      console.error("Google login error - catch block:", error);
      setFormErrors({
        ...formErrors,
        loginError: "Google login failed or cancelled. Please try again.",
      });
    }
  };

  const handleAppleLogin = async (response) => {
    try {
      const id_token = response.authorization?.id_token;
      if (!id_token) throw new Error("Apple ID token missing");
      const resultAction = await dispatch(appleLoginThunk(id_token));
      const payload = resultAction.payload;
      if (
        resultAction.type === appleLoginThunk.fulfilled.type &&
        payload?.status === "ok"
      ) {
        if (payload.is_active) {
          navigate("/two-factor", {
            state: {
              email: payload.email,
              user: payload.user,
              req: payload.req,
            },
          });
        } else {
          navigate("/dashboard");
        }
      } else {
        setFormErrors({
          ...formErrors,
          loginError: payload?.message || "Apple login failed",
        });
      }
    } catch (error) {
      setFormErrors({
        ...formErrors,
        loginError: "Apple login failed or cancelled. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (isConnected && address && iamconnect) {
      const payload = {
        walletaddress: address,
        refcode: "",
      };
      dispatch(metamaskLoginThunk(payload))
        .then((resultAction) => {
          const payload = resultAction.payload;
          if (
            resultAction.type === metamaskLoginThunk.fulfilled.type &&
            payload?.status === "ok"
          ) {
            if (payload.is_active) {
              navigate("/two-factor", {
                state: {
                  email: payload.email,
                  user: payload.user,
                  req: payload.req,
                },
              });
            } else {
              navigate("/dashboard");
            }
          } else {
            clearReownWalletSession();
            localStorage.removeItem("@appkit/connection_status");
            localStorage.removeItem("wagmi.store");
            setFormErrors({ ...formErrors, loginError: payload?.message });
          }
        })
        .catch((error) => {
          clearReownWalletSession();
          localStorage.removeItem("@appkit/connection_status");
          localStorage.removeItem("wagmi.store");
          setFormErrors({
            ...formErrors,
            loginError: "Failed to login. Please try again later.",
          });
        });
    }
  }, [isConnected, address, dispatch, navigate]);

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

  // Show preloader for 3 seconds
  if (pageLoading) return <Loader />;

  return (
    <>
      <div className="min-h-screen w-full flex flex-col lg:flex-row font-roboto">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-[#FFFFFF] py-8 px-4 flex flex-col items-start">
          {/* Logo */}
          <div className="w-full max-w-[150px] ml-4 mb-8">
            {" "}
            {/* ✨ Updated: made padding responsive */}
            <img
              src={storedTheme === "dark" ? darkLogo : lightLogo}
              alt="CapShield Logo"
              className="h-15 w-full object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="w-full max-w-[400px] mx-auto flex flex-col items-center gap-12 px-4">
            {" "}
            {/* ✨ Updated: added max-width and centered */}
            {/* Heading */}
            <div className="text-center">
              {" "}
              {/* ✨ Updated: centralized heading */}
              <h2 className="font-semibold text-[32px] text-black leading-[38px]">
                Sign in to CAPShield
              </h2>
              <p className="text-[16px] text-gray-500 mt-1">
                Access smarter investing tools and protection.
              </p>
            </div>
            {/* Social Sign-in Buttons */}
            <div className="flex flex-col items-center gap-4 w-full" style={{ marginTop: "-20px" }}>
              <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
                {" "}
                {/* ✨ Updated: stacked vertically on mobile, row on desktop */}
                {/* <GoogleOAuthProvider clientId={clientId}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      handleGoogleLogin(credentialResponse);
                    }}
                    onError={(error) => {
                      setFormErrors({
                        ...formErrors,
                        loginError: error.message,
                      });
                    }}
                    render={(renderProps) => (
                      <button
                        {...renderProps}
                        className="flex items-center justify-center w-full md:w-[159px] h-[46px] bg-white border border-[#DEE3E9] rounded hover:bg-gray-50"
                      >
                        <img
                          src={googleImg}
                          alt="Google"
                          width="30"
                          height="30"
                        />
                      </button>
                    )}
                  />
                </GoogleOAuthProvider> */}
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        handleGoogleLogin(credentialResponse);
                      }}
                      onError={(error) =>
                        setFormErrors({
                          ...formErrors,
                          loginError: error.message || "Google login failed",
                        })
                      }
                      useOneTap
                      ux_mode="popup"
                      auto_select={false}
                      data-use_fedcm_for_prompt="true"
                      theme="outline"
                      size="large"
                    />
                </GoogleOAuthProvider>

                {/* <AppleLogin
                  clientId="com.capshield.token"
                  redirectURI="https://capshield.token/apple/callback"
                  callback={handleAppleLogin}
                  scope="name email"
                  responseMode="form_post"
                  usePopup={true}
                  render={(renderProps) => (
                    <button
                      {...renderProps}
                      className="flex items-center justify-center w-full md:w-[140px] h-[40px] bg-white border border-[#DEE3E9] rounded hover:bg-gray-50"
                    >
                      <img src={appleImg} alt="Apple" width="26" height="26" />
                    </button>
                  )}
                /> */}
                <button
                  onClick={(e) => { open(); setIamConnecting(true); }}
                  className="flex items-center justify-center w-full md:w-[140px] h-[40px] bg-white border border-[#DEE3E9] rounded hover:bg-gray-50"
                >
                  <img
                    src={metamaskImg}
                    alt="Metamask"
                    width="26"
                    height="26"
                  />
                </button>
              </div>
              <div className="flex items-center gap-2 w-full">
                <hr className="flex-grow border-[#BED0C4]" />
                <span className="text-xs text-gray-500">Or continue with</span>
                <hr className="flex-grow border-[#BED0C4]" />
              </div>
            </div>
            {/* Error Message */}
            {formErrors.loginError && (
              <div className="w-full text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded px-3 py-2 animate-fade-in">
                {formErrors.loginError}
              </div>
            )}
            {/* Email and Password Fields */}
            <div className="flex flex-col gap-3 w-full" style={{ marginTop: "-20px" }}>
              <input
                type="email"
                placeholder="Username or email"
                value={email}
                onChange={(e) => fillEmail(e)}
                className="w-full h-[42px] border border-[#DEE3E9] rounded px-3 py-2 text-sm focus:outline-none"
              />
              {formErrors.email && (
                <div className="text-red-500 text-xs font-medium">
                  {formErrors.email}
                </div>
              )}

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => fillPassword(e)}
                  className="w-full h-[42px] border border-[#DEE3E9] rounded px-3 py-2 text-sm focus:outline-none"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.1375 3.488C10.1288 2.72723 8.97615 2.31226 7.78311 2.31226C5.74861 2.31226 3.85242 3.51106 2.53259 5.58591C2.01388 6.39856 2.01388 7.7645 2.53259 8.57715C2.9879 9.29182 3.51814 9.90851 4.09449 10.4042"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.7207 11.4185C6.37774 11.6952 7.07512 11.845 7.78403 11.845C9.81853 11.845 11.7147 10.6462 13.0346 8.57138C13.5533 7.75873 13.5533 6.39279 13.0346 5.58014C12.8444 5.28044 12.6369 4.99803 12.4236 4.73291"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.80694 7.48193C9.65709 8.29458 8.99429 8.95738 8.18164 9.10723"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.32582 8.53687L2.02051 12.8422"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5465 1.31519L9.24121 5.6205"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                        d="M12 4.5C7.30558 4.5 3.42532 7.26832 1.18132 11.25C0.939558 11.7111 0.939558 12.2889 1.18132 12.75C3.42532 16.7317 7.30558 19.5 12 19.5C16.6944 19.5 20.5747 16.7317 22.8187 12.75C23.0604 12.2889 23.0604 11.7111 22.8187 11.25C20.5747 7.26832 16.6944 4.5 12 4.5Z"
                        stroke="#A0AEBF"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#A0AEBF"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {formErrors.password && (
                <div className="text-red-500 text-xs font-medium mt-1">
                  {formErrors.password}
                </div>
              )}

              <div className="flex justify-between items-center text-xs mt-2">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="accent-[#7A44FF]" />{" "}
                  Remember me
                </label>
                <button
                  className="text-[#7A44FF] underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            {/* Login Button */}
            <div className="w-full" style={{ marginTop: "-20px" }}>
              <button
                className="w-full h-[44px] bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white font-semibold rounded hover:bg-purple-700"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-[400px] mx-auto mt-10 flex flex-col items-center gap-4 px-4 text-xs text-[#4A5567]">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms and Conditions</a>
            </div>
            <p>© 2025 CAPShield. All Rights Reserved.</p>
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
    </>
  );
};

export default LoginPage;
