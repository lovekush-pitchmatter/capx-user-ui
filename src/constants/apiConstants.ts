const API_CONSTANTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    PROFILE: "/auth/profile",
    LOGOUT: "/auth/logout",
    CHANGE_PASSWORD: "/auth/change-password",
    VERIFY: "/auth/verify",
    SEND_OTP: "/auth/send-otp",
    RESEND_OTP: "/auth/resend-otp",
    VERIFY_OTP: "/auth/verify-otp",
    OAUTH: {
      GOOGLE_CALLBACK: "/auth/get/google",
      APPLE_CALLBACK: "/auth/get/apple",
      LINKEDIN_CALLBACK: "/auth/get/linkedin",
    },
  },
};

export default API_CONSTANTS;
