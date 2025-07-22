import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileApi from "../../api/profileApi";

interface ProfileState {
  profile_image: string | null;
  updateLoading: boolean;
  updateError: string | null;
  socialMediaLinks: any[];
  socialLinksLoading: boolean;
}

const initialState: ProfileState = {
  profile_image: null,
  updateLoading: false,
  updateError: null,
  socialMediaLinks: [],
  socialLinksLoading: false,
};

export const updateProfilePicture = createAsyncThunk(
  "profile/updateProfilePicture",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateDashboardProfileImage(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to upload profile image");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateUserProfile(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async (encryptedData:any, { rejectWithValue }) => {
    try {
      const response = await profileApi.updatePassword(encryptedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (encryptedData:any, { rejectWithValue }) => {
    try {
      const response = await profileApi.deleteAccount(encryptedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete account");
    }
  }
);

export const updateTwoFA = createAsyncThunk(
  "profile/updateTwoFA",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateTwoFA(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update 2FA");
    }
  }
);

export const sendEmailOtp = createAsyncThunk(
  "profile/sendEmailOtp",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateEmail(encryptedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP.");
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
  "profile/verifyEmailOtp",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await profileApi.verifyEmailOtp(encryptedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Invalid OTP.");
    }
  }
);

export const saveProfileLinks = createAsyncThunk(
  "profile/saveProfileLinks",
  async (profileLink: any[], { rejectWithValue }) => {
    try {
      const response = await profileApi.saveProfileLinks(profileLink);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to save profile links");
    }
  }
);

export const getProfileLinks = createAsyncThunk(
  "profile/getProfileLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileApi.getProfileLinks();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to get profile links");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.profile_image = action.payload.profileImage;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.profile_image = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateError = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string || "Failed to update profile";
      })
      .addCase(updatePassword.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateError = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string || "Failed to update password";
      })
      .addCase(deleteAccount.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateError = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string || "Failed to delete account";
      })
      .addCase(updateTwoFA.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateTwoFA.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateError = null;
      })
      .addCase(updateTwoFA.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string || "Failed to update 2FA";
      })
      .addCase(sendEmailOtp.fulfilled, (state) => {
        state.updateError = null;
      })
      .addCase(sendEmailOtp.rejected, (state, action) => {
        state.updateError = action.payload as string || "Failed to send OTP.";
      })
      .addCase(verifyEmailOtp.fulfilled, (state) => {
        state.updateError = null;
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.updateError = action.payload as string || "Invalid OTP.";
      })
      .addCase(saveProfileLinks.pending, (state) => {
        state.socialLinksLoading = true;
        state.updateError = null;
      })
      .addCase(saveProfileLinks.fulfilled, (state, action) => {
        state.socialLinksLoading = false;
        state.socialMediaLinks = action.payload.data || [];
        state.updateError = null;
      })
      .addCase(saveProfileLinks.rejected, (state, action) => {
        state.socialLinksLoading = false;
        state.updateError = action.payload as string || "Failed to save profile links";
      })
      .addCase(getProfileLinks.pending, (state) => {
        state.socialLinksLoading = true;
      })
      .addCase(getProfileLinks.fulfilled, (state, action) => {
        state.socialLinksLoading = false;
        state.socialMediaLinks = action.payload.data || [];
      })
      .addCase(getProfileLinks.rejected, (state, action) => {
        state.socialLinksLoading = false;
        state.updateError = action.payload as string || "Failed to get profile links";
      });
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
