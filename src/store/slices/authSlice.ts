import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import authApi, {
  type LoginCredentials,
  type RegisterCredentials,
  type AuthResponse,
  type TokensResponse,
} from "../../api/authApi";
import { updateProfilePicture } from "./profileSlice";

interface User {
  id: number;
  email: string;
  fullname: string;
  username: string;
  country: string;
  country_code: string;
  is_email_verified: boolean;
  is_email_updated: boolean;
  is_phone_verified: boolean;
  is_token_purchased: boolean;
  mobile_number: string;
  current_level: string;
  is_active?: boolean;
  is_referred?: boolean;
  referral_id: string;
  kyc_status: boolean;
  is_2fa_active: boolean;
  is_kyc_submitted: boolean;
  profile_image: string;
  user_vested_tokens: number;
  user_total_tokens_unlocked: number;
  wallet_amount: number;
  twokey: Object | null;
  referral_code: string;
  social_auth_login_type?: "LOCAL" | "GOOGLE" | "APPLE";
  userWallet: Object | null;
}

interface AuthState {
  user: User | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  show2FAModal: boolean;
  twoFAEmail: string | null;
  twoFAUserId: string | null;
}

const initialState: AuthState = {
  user: null,
  tokens: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  },
  isAuthenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  error: null,
  show2FAModal: false,
  twoFAEmail: null,
  twoFAUserId: null,
};
import { decryptData } from '../../utils/decryptData';

export const login = createAsyncThunk<
  any,
  LoginCredentials, 
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    return {
      status: "ok",
      is_active: response.is_active,
      user: response.user,
      tokens: {
        accessToken: response.token.accessToken,
        refreshToken: response.token.refreshToken,
      },
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    return await authApi.register(credentials);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    } catch (error: any) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const getRefreshToken = createAsyncThunk<
  TokensResponse,
  void,
  { rejectValue: string; state: { auth: AuthState } }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const tokens = await authApi.refreshToken();
    return tokens;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Refresh token failed"
    );
  }
});


export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyOtp(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Invalid OTP");
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await authApi.resendOtp(encryptedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getUser();
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

// New async thunk for sending password OTP
export const sendPasswordOtpThunk = createAsyncThunk(
  "auth/sendPasswordOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authApi.sendPasswordOtp(email);
      return response;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to send OTP.");
    }
  }
);

// New async thunk for updating password with OTP
export const updatePasswordWithOtpThunk = createAsyncThunk(
  "auth/updatePasswordWithOtp",
  async (
    payload: { email: string; otp: string; newpassword: string; confirmpassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.updatePasswordWithOtp(payload);
      return response;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to update password.");
    }
  }
);



export const verifyTwoFactor = createAsyncThunk(
  "auth/verifyTwoFactor",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyTwoFactor(encryptedData);
      return response;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to verify 2FA code.");
    }
  }
);

export const metamaskLoginThunk = createAsyncThunk(
  'auth/metamaskLogin',
  async (data: { address: string; caipAddress: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.metamaskLogin(data);
      console.log("Metamask login response:", response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
); 

export const googleLoginThunk = createAsyncThunk(
  'auth/googleLogin',
  async ({ credential, refcode, country }: { credential: string; refcode: string; country: string }, { rejectWithValue }) => {
    try {
      // console.log("Auth slice: Google login attempt with:", { 
      //   credential: credential ? "present" : "missing", 
      //   credentialLength: credential?.length,
      //   refcode, 
      //   country 
      // });
      
      const response = await authApi.googleSignIn(credential, refcode, country);
      // console.log("Auth slice: Google login API response:", response);
      return response;
    } catch (error: any) {
      // console.error("Auth slice: Google login error:", error);
      // console.error("Auth slice: Error response:", error.response);
      // console.error("Auth slice: Error data:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Google login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const appleLoginThunk = createAsyncThunk(
  'auth/appleLogin',
  async (id_token:any, { rejectWithValue }) => {
    try {
      const response = await authApi.appleSignIn(id_token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Apple login failed');
    }
  }
);

export const checkUserNameThunk = createAsyncThunk(
  'auth/checkUserName',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await authApi.checkUserName(username);
      if (response.status === "ok") {
        return { status: "ok", message: response.message };
      } else {
        return rejectWithValue(response.message || "Username is not available");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check username availability"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshTokens(state, action: PayloadAction<TokensResponse>) {
      state.tokens.accessToken = action.payload.accessToken;
      state.tokens.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE, (state, action) => {
        const rehydrateAction = action as typeof action & { payload?: any };
        if (rehydrateAction.payload && rehydrateAction.payload.auth) {
          const auth = rehydrateAction.payload.auth;
          if (auth.tokens.accessToken) {
            localStorage.setItem("accessToken", auth.tokens.accessToken);
          }
          if (auth.tokens.refreshToken) {
            localStorage.setItem("refreshToken", auth.tokens.refreshToken);
          }
          if (auth.tokens.registrationToken) {
            localStorage.setItem(
              "registrationToken",
              auth.tokens.registrationToken
            );
          }
          state.isAuthenticated = !!auth.tokens.accessToken;
        }
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.show2FAModal = false;
        state.twoFAEmail = null;
        state.user = action.payload.user;
        state.tokens.accessToken = action.payload.token.accessToken;
        state.tokens.refreshToken = action.payload.token.refreshToken;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
      builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, tokens, is_active } = action.payload;
        if (!is_active) {
          state.loading = false;
          state.user = user;
          state.tokens.accessToken = tokens.accessToken;
          state.tokens.refreshToken = tokens.refreshToken;
          state.isAuthenticated = true;
          state.error = null;
      
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);
        } else {
          state.show2FAModal = true;
          state.twoFAEmail = user.email;
          state.twoFAUserId = user.id;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
        state.user = null;
        state.tokens.accessToken = null;
        state.tokens.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.tokens.accessToken = null;
        state.tokens.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.tokens.accessToken = null;
        state.tokens.refreshToken = null;
        state.isAuthenticated = false;
      });

    builder
    .addCase(getUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    })
    .addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    builder
      .addCase(getRefreshToken.pending, (state) => {
        state.error = null;
      })
      .addCase(getRefreshToken.fulfilled, (state, action) => {
        state.tokens.accessToken = action.payload.accessToken;
        state.tokens.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(getRefreshToken.rejected, (state, action) => {
        state.user = null;
        state.tokens.accessToken = null;
        state.tokens.refreshToken = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Token refresh failed";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
    builder
      .addCase(sendPasswordOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPasswordOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendPasswordOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to send OTP.";
      });
    builder
      .addCase(updatePasswordWithOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePasswordWithOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePasswordWithOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to update password.";
      });
    builder
      .addCase(verifyTwoFactor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyTwoFactor.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.tokens.accessToken = action.payload.token.accessToken;
        state.tokens.refreshToken = action.payload.token.refreshToken;
        localStorage.setItem("accessToken", action.payload.token.accessToken);
        localStorage.setItem(
            "refreshToken",
            action.payload.token.refreshToken
        );
        state.show2FAModal = false;
        state.twoFAEmail = null;
        state.twoFAUserId = null;
        state.error = null;
      })
      .addCase(verifyTwoFactor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profile_image = action.payload.profileImage;
        }
      });
       builder
      .addCase(metamaskLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(metamaskLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.tokens.accessToken = action.payload.token.accessToken;
        state.tokens.refreshToken = action.payload.token.refreshToken;
        localStorage.setItem("accessToken", action.payload.token.accessToken);
        localStorage.setItem(
            "refreshToken",
            action.payload.token.refreshToken
        );
        state.error = null;
      })
      .addCase(metamaskLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        const { user, token, is_active } = action.payload;
        if (!is_active) {
          state.loading = false;
          state.user = user;
          state.tokens.accessToken = token.accessToken;
          state.tokens.refreshToken = token.refreshToken;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("accessToken", token.accessToken);
          localStorage.setItem("refreshToken", token.refreshToken);
        } else {
          state.show2FAModal = true;
          state.twoFAEmail = user.email;
          state.twoFAUserId = user.id;
        }
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Google login failed";
        state.isAuthenticated = false;
        state.user = null;
        state.tokens.accessToken = null;
        state.tokens.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(appleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appleLoginThunk.fulfilled, (state, action) => {
        const { user, token, is_active } = action.payload;
        if (!is_active) {
          state.loading = false;
          state.user = user;
          state.tokens.accessToken = token.accessToken;
          state.tokens.refreshToken = token.refreshToken;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("accessToken", token.accessToken);
          localStorage.setItem("refreshToken", token.refreshToken);
        } else {
          state.show2FAModal = true;
          state.twoFAEmail = user.email;
          state.twoFAUserId = user.id;
        }
      })
      .addCase(appleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Apple login failed";
        state.isAuthenticated = false;
        state.user = null;
        state.tokens.accessToken = null;
        state.tokens.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
      builder
      .addCase(checkUserNameThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserNameThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkUserNameThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to check username availability";
      });
  },
});

export const { refreshTokens, clearErrors } = authSlice.actions;
export default authSlice.reducer;
