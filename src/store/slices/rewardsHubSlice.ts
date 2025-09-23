import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rewardsHubApi from "../../api/rewardsHubApi";

// Define initial state
interface RewardsHubState {
  userDashboard: any;
  userRewards: null;
  userPoll: null;
  surveys: null;
  spinWheelData: null;
  quizQuestions: null;
  angelLeaderboard: null;
  capxLeaderboard: null;
  loading: boolean;
  error: string | null;
  pollSubmit: null;
  userActivity: any;
  loginActivity: any;
  referralWithdrawals: any;
  referralDetails: any;
  rewardsHubData: any;
  spinWheelRewards: any;
}

const initialState: RewardsHubState = {
  userDashboard: null, // Change from {} to null
  userRewards: null,
  userPoll: null,
  surveys: null,
  quizQuestions: null,
  angelLeaderboard: null,
  capxLeaderboard: null,
  loading: false,
  error: null,
  pollSubmit: null,
  userActivity: null,
  loginActivity: null,
  referralWithdrawals: null,
  referralDetails: null,
  rewardsHubData: null,
  spinWheelData: null,
  spinWheelRewards: null
};

// Async thunks for API calls
// Enhanced fetchDashboard with debugging
export const fetchDashboard = createAsyncThunk(
  "rewardsHub/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.getDashboard();
      return response;
    } catch (error: any) {
      console.error("fetchDashboard error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch dashboards");
    }
  }
);

export const fetchRewardsHubData = createAsyncThunk(
  "rewardsHub/fetchRewardsHubData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.getRewardsHubData();
      return response;
    } catch (error: any) {
      console.error("fetchRewardsHubData error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch rewards hub data");
    }
  }
);

export const getReferralDetails = createAsyncThunk(
  "rewardsHub/getReferralDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.getReferralDetails();
      return response;
    } catch (error: any) {
      console.error("getReferralDetails error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch referral details");
    }
  }
);

export const spinWheelUpdate = createAsyncThunk(
  "rewardsHub/spinWheelUpdate",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.spinWheelUpdate(encryptedData);
      return response;
    } catch (error: any) {
      console.error("spinWheelUpdate error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch spin wheel updates");
    }
  }
);

export const fetchReferralWithdrawals = createAsyncThunk(
  "rewardsHub/fetchReferralWithdrawals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.getReferralWithdrawals();
      return response;
    } catch (error: any) {
      console.error("fetchReferralWithdrawals error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch referral withdrawals");
    }
  }
);

export const fetchActivity = createAsyncThunk(
  "rewardsHub/fetchActivity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.getActivity();
      return response;
    } catch (error: any) {
      console.error("fetchActivity error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch activity");
    }
  }
);

export const fetchLoginActivity = createAsyncThunk(
  "rewardsHub/fetchLoginActivity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.loginActivity();
      return response;
    } catch (error: any) {
      console.error("loginActivity error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch activity");
    }
  }
);


export const fetchUserRewards = createAsyncThunk(
  "rewardsHub/fetchUserRewards",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchUserRewards();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user rewards");
    }
  }
);

export const fetchSurveys = createAsyncThunk(
  "rewardsHub/fetchSurveys",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchSurveys();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch surveys");
    }
  }
);

export const submitSurvey = createAsyncThunk(
  "rewardsHub/submitSurvey",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.submitSurvey(encryptedData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to submit survey");
    }
  }
);

export const fetchSpinWheelData = createAsyncThunk(
  "rewardsHub/fetchSpinWheelData",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchSpinWheelData();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch spin wheel data");
    }
  }
);

export const submitSpinWheel = createAsyncThunk(
  "rewardsHub/submitSpinWheel",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.submitSpinWheel(encryptedData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch spin wheel data");
    }
  }
);

export const fetchQuizQuestions = createAsyncThunk(
  "rewardsHub/fetchQuizQuestions",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchQuizQuestions();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch quiz questions");
    }
  }
);

export const submitQuizAnswer = createAsyncThunk(
  "rewardsHub/submitQuizAnswer",
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.submitQuizAnswers(encryptedData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to submit quiz answers");
    }
  }
);

export const fetchAngelLeaderBoard = createAsyncThunk(
  "rewardsHub/fetchAngelLeaderBoard",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchAngelLeaderBoard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch leaderboard");
    }
  } 
);

export const fetchCapxLeaderBoard = createAsyncThunk(
  "rewardsHub/fetchCapxLeaderBoard",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchCapxLeaderBoard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch leaderboard");
    }
  } 
);

export const fetchUserPoll = createAsyncThunk(
  "rewardsHub/fetchUserPoll",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchUserPoll();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user poll");
    }
  } 
);

export const submitPoll = createAsyncThunk(
  'transaction/submitPoll',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.submitPoll(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const convertCapx = createAsyncThunk(
  'transaction/convertCapx',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await rewardsHubApi.convertCapx(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create slice
const rewardsHubSlice = createSlice({
  name: "rewardsHub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(spinWheelUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(spinWheelUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.spinWheelRewards = action.payload;
      })
      .addCase(spinWheelUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSpinWheelData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpinWheelData.fulfilled, (state, action) => {
        console.log("hello spin wheel", action.payload);
        state.loading = false;
        state.error = null;
        state.spinWheelData = action.payload;
      })
      .addCase(fetchSpinWheelData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(fetchRewardsHubData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewardsHubData.fulfilled, (state, action) => {
        state.loading = false;
        state.rewardsHubData = action.payload;
      })
      .addCase(fetchRewardsHubData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(convertCapx.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(convertCapx.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(convertCapx.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getReferralDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReferralDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.referralDetails = action.payload;
      })
      .addCase(getReferralDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReferralWithdrawals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferralWithdrawals.fulfilled, (state, action) => {
          state.loading = false;
          state.referralWithdrawals = action.payload;
        })
        .addCase(fetchReferralWithdrawals.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

        .addCase(fetchLoginActivity.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLoginActivity.fulfilled, (state, action) => {
          state.loading = false;
          state.loginActivity = action.payload;
        })
        .addCase(fetchLoginActivity.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Fetch dashboards
        .addCase(fetchDashboard.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDashboard.fulfilled, (state, action) => {
          state.loading = false;
          state.userDashboard = action.payload;
        })
        .addCase(fetchDashboard.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

        .addCase(fetchActivity.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchActivity.fulfilled, (state, action) => {
          state.loading = false;
          state.userActivity = action.payload;
        })
        .addCase(fetchActivity.rejected, (state, action) => {
          state.loading = false;
          state.error = null;
        })

        .addCase(submitPoll.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(submitPoll.fulfilled, (state, action) => {
          state.loading = false;
          state.pollSubmit = action.payload;
        })
        .addCase(submitPoll.rejected, (state, action) => {
           state.loading = true;
          state.error = null;
        })

        .addCase(fetchUserPoll.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserPoll.fulfilled, (state, action) => {
          state.loading = false;
          state.userPoll = action.payload;
        })
        .addCase(fetchUserPoll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

      // Fetch user rewards
      .addCase(fetchUserRewards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.userRewards = action.payload;
      })
      .addCase(fetchUserRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch surveys
      .addCase(fetchSurveys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.loading = false;
        state.surveys = action.payload;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Submit survey
      .addCase(submitSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSurvey.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch quiz questions
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.quizQuestions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Submit quiz answers
      .addCase(submitQuizAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuizAnswer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitQuizAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCapxLeaderBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCapxLeaderBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.capxLeaderboard = action.payload;
      })
      .addCase(fetchCapxLeaderBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch leaderboard
      .addCase(fetchAngelLeaderBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAngelLeaderBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.angelLeaderboard = action.payload;
      })
      .addCase(fetchAngelLeaderBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });


  },
});

export default rewardsHubSlice.reducer;
