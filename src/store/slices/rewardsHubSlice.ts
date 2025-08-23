import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rewardsHubApi from "../../api/rewardsHubApi";

// Define initial state
interface RewardsHubState {
  userDashboard: any[];
  userRewards: any[];
  surveys: any[];
  quizQuestions: any[];
  leaderboard: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RewardsHubState = {
  userDashboard: [],
  userRewards: [],
  surveys: [],
  quizQuestions: [],
  leaderboard: [],
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchDashboard = createAsyncThunk(
  "rewardsHub/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.getDashboard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch dashboards");
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
  async ({ surveyId, answers }: { surveyId: string; answers: Record<string, any> }, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.submitSurvey(surveyId, answers);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to submit survey");
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

export const submitQuizAnswers = createAsyncThunk(
  "rewardsHub/submitQuizAnswers",
  async ({ quizId, answers }: { quizId: string; answers: Record<string, any> }, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.submitQuizAnswers(quizId, answers);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to submit quiz answers");
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  "rewardsHub/fetchLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      return await rewardsHubApi.fetchLeaderboard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch leaderboard");
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
      .addCase(submitQuizAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuizAnswers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitQuizAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch leaderboard
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rewardsHubSlice.reducer;
