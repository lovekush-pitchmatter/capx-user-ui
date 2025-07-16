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
import { useDispatch } from "react-redux";
import { metamaskLoginThunk, googleLoginThunk, appleLoginThunk } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

// const projectId = "ad069583f9dd4f242a83d33ff462a15a";
// const clientId =
//   "142955849396-llsu26h5650poa898j1s9rtspbfs7gom.apps.googleusercontent.com";
// const networks = [mainnet];
// const metadata = {
//   name: "CAPX",
//   description: "CAPX",
//   url: "https://zynking.com",
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

export default function SignInOptions({ refcode }) {
  const projectId = "ad069583f9dd4f242a83d33ff462a15a";
  const clientId = "142955849396-llsu26h5650poa898j1s9rtspbfs7gom.apps.googleusercontent.com";
  const networks = [mainnet];
  const metadata = {
    name: "CAPX",
    description: "CAPX",
    url: "https://zynking.com",
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
  const { open } = useAppKit();
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    loginError: "",
  });

  const [iamconnect, setIamConnecting] = useState(false);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      if (!credential) throw new Error("Google credential missing");
      const resultAction = await dispatch(googleLoginThunk({ credential, refcode }));
      const payload = resultAction.payload;
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
        setFormErrors({ ...formErrors, loginError: payload?.message || "Google login failed" });
      }
    } catch (error) {
      console.error("Google login error:", error);
      setFormErrors({ ...formErrors, loginError: "Google login failed. Please try again." });
    }
  };

  const handleAppleLogin = async (response) => {
    try {
      const id_token = response.authorization?.id_token;
      if (!id_token) throw new Error("Apple ID token missing");
      const resultAction = await dispatch(appleLoginThunk(id_token));
      const payload = resultAction.payload;
      if (resultAction.type === appleLoginThunk.fulfilled.type && payload?.status === "ok") {
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
        setFormErrors({ ...formErrors, loginError: payload?.message || "Apple login failed" });
      }
    } catch (error) {
      setFormErrors({ ...formErrors, loginError: "Apple login failed or cancelled by user. Please try again." });
    }
  };

  const callMetamask = async () => {
    try {
      if (isConnected && iamconnect) {

        const payloadmain = {
          walletaddress: address,
          refcode: refcode,
        };
        const resultAction = await dispatch(metamaskLoginThunk(payloadmain))
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
          localStorage.removeItem("@appkit/connection_status");
          localStorage.removeItem("wagmi.store");
          setFormErrors({ ...formErrors, loginError: payload?.message });
        }

      }
    } catch (error) {
      localStorage.removeItem("@appkit/connection_status");
      localStorage.removeItem("wagmi.store");
      setFormErrors({ ...formErrors, loginError: "Metamask login failed or cancelled by user. Please try again." });
    }
  };
  if (isConnected && address) {
    callMetamask();
  }

  return (
    <div className="flex flex-col items-center gap-[16.6px] w-full">
      <div className="w-full">
        {formErrors.loginError && (
          <div className="input-error w-full mb-2 mt-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded px-3 py-2 animate-fade-in">
            {formErrors.loginError}
          </div>
        )}
      </div>

      <div className="flex flex-row items-center gap-[12.38px] w-full">
        {/* <button onClick={() => handleRedirect("google")} className="flex items-center justify-center w-[161.66px] h-[46.2px] bg-[#FFFFFF] border border-[#DEE3E9] rounded-[6.19px] hover:bg-gray-50">
                    <img src={googleImg} alt="Google Sign In" width="30" height="30" />
                </button> */}
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse);
            }}
            onError={(error) => {
              setFormErrors({ ...formErrors, loginError: "Google login failed. Please try again." });
            }}
            useOneTap={false}
            auto_select={false}
            cancel_on_tap_outside={true}
            theme="outline"
            size="large"
            width="46"
            type="standard"
          />
        </GoogleOAuthProvider>
        {/* <AppleLogin
          clientId="com.capshield.token"
          redirectURI="https://capshield.token/apple/callback"
          callback={handleAppleLogin}
          scope="name email"
          responseMode="form_post"
          usePopup={false}
          render={(renderProps) => (
            <button
              {...renderProps}
              className="flex items-center justify-center w-[46.2px] h-[46.2px] bg-[#FFFFFF] border border-[#DEE3E9] rounded-[6.19px] hover:bg-gray-50"
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
      <div className="flex flex-row items-center gap-[6.97px] w-[321.88px]">
        <hr className="w-[114.97px] border-[0.78px] border-[#BED0C4]" />
        <span className="font-roboto font-normal text-[10.66px] whitespace-nowrap leading-[12px] text-[rgba(0,0,0,0.38)]">
          Or continue with
        </span>
        <hr className="w-[114.97px] border-[0.78px] border-[#BED0C4]" />
      </div>
    </div>
  );
}
