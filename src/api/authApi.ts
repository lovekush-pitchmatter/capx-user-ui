import { axiosInstance } from "../config";

export interface LoginCredentials {
  email: string;
  password: string;
  deviceid?: string;
}

function getOrCreateDeviceId(): string {
  let deviceid = localStorage.getItem('deviceid');
  if (!deviceid) {
    deviceid = Math.random().toString(36).substring(2, 18) + Date.now();
    localStorage.setItem('deviceid', deviceid);
  }
  return deviceid;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber?: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      mobile_number: string;
      is_active?: boolean;
      is_referred?: boolean;
      referral_id: string;
      kyc_status: boolean;
      is_2fa_active: boolean;
      is_kyc_submitted: boolean;
      profile_image: string;
      user_vested_tokens: number;
      wallet_amount: number;
      user_total_tokens_unlocked: number;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

const authApi = {
  sendPasswordOtp: async (email: string) => {
    const response = await axiosInstance.post("/password/send-otp", { email });
    return response.data;
  },
  updatePasswordWithOtp: async (payload: { email: string; otp: string; newpassword: string; confirmpassword: string }) => {
    const response = await axiosInstance.post("/password/update", payload);
    return response.data;
  },
  verifyTwoFactor: async (encryptedData: any) => {
    const response = await axiosInstance.post("/verify-2fa", { encryptedData });
    return response.data;
  },
  login: async (credentials: LoginCredentials) => {
    const deviceid = credentials.deviceid || getOrCreateDeviceId();
    const payload = { ...credentials, deviceid };
    const response = await axiosInstance.post(
      "/login",
      payload
    );
    return response.data;
  },
  metamaskLogin: async (payload: any) => {
    const response = await axiosInstance.post(
      "/walletconnect/signin",
      payload
    );
    return response.data;
  },
  register: async (credentials: RegisterCredentials) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/signup",
      credentials
    );
    return response.data;
  },

  logout: async () => {
    await axiosInstance.head("/logout");
  },

  refreshToken: async () => {
    const response = await axiosInstance.get<AuthResponse>(
      "/refresh-token"
    );
    return response.data.data.tokens;
  },

  checkUserName: async (username: string) => {
    const response = await axiosInstance.post("/check-username", { username });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await axiosInstance.get("/forgot-password", {
      params: { email },
    });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await axiosInstance.post("/reset-password", {
      token,
      password: newPassword,
    });
    return response.data;
  },

  verifyOtp: async (encryptedData: any) => {
    const response = await axiosInstance.post("/verify-otp", {
      encryptedData
    });
    return response.data;
  },

  resendOtp: async (encryptedData: any) => {
    const response = await axiosInstance.post("/resend-otp", {
      encryptedData
    });
    return response.data;
  },

  getUser: async () => {
    const response = await axiosInstance.get("/user");
    return response;
  },

  googleSignIn: async (credential: string, refcode: string, country: string) => {
    console.log("AuthAPI: Google signin called with:", { 
      credential: credential ? "present" : "missing", 
      credentialLength: credential?.length,
      refcode, 
      country 
    });
    
    try {
      const response = await axiosInstance.post("/google/signin", { credential, refcode, country });
      console.log("AuthAPI: Google signin response:", response);
      return response.data;
    } catch (error) {
      console.error("AuthAPI: Google signin error:", error);
      console.error("AuthAPI: Error response:", error.response);
      throw error;
    }
  },
  appleSignIn: async (id_token: string) => {
    const response = await axiosInstance.post("/apple/signin", { id_token });
    return response.data;
  },
};

export default authApi;
