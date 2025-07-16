import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import generalApi from "../../api/generalApi";

export interface GeneralState {
  dashboard: Record<string, any> | null;
  plans: any[];
  plansLoading: boolean;
  plansError: string | null;
  buyCapxStatus: 'idle' | 'loading' | 'success' | 'error';
  buyCapxError: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: GeneralState = {
  dashboard: null,
  plans: [],
  plansLoading: false,
  plansError: null,
  buyCapxStatus: 'idle',
  buyCapxError: null,
  loading: false,
  error: null,
};

export const fetchDashboard = createAsyncThunk(
  "general/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await generalApi.getDashboard();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard data."
      );
    }
  }
);

export const fetchCapxPlans = createAsyncThunk(
  "general/fetchCapxPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await generalApi.getCapxPlans();
      // handle encrypted payload if needed
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch CAPX plans."
      );
    }
  }
);

export const buyCapx = createAsyncThunk(
  "general/buyCapx",
  async ({ planId, orderAmount }: { planId: string; orderAmount: number }, { rejectWithValue }) => {
    try {
      const response = await generalApi.buyCapx({ planId, orderAmount });
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to buy CAPX."
      );
    }
  }
);

export const supportThunk = createAsyncThunk(
  'general/supportThunk',
  async (data: { subject: string; message: string }, { rejectWithValue }) => {
    try {
      const response = await generalApi.supportRequest(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
      state.plansError = null;
      state.buyCapxError = null;
      state.buyCapxStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "Failed to fetch dashboard data.";
      })
      // CAPX Plans
      .addCase(fetchCapxPlans.pending, (state) => {
        state.plansLoading = true;
        state.plansError = null;
      })
      .addCase(fetchCapxPlans.fulfilled, (state, action) => {
        state.plansLoading = false;
        state.plans = action.payload?.req || [];
        state.plansError = null;
      })
      .addCase(fetchCapxPlans.rejected, (state, action) => {
        state.plansLoading = false;
        state.plansError = typeof action.payload === 'string' ? action.payload : "Failed to fetch CAPX plans.";
      })
      // Buy CAPX
      .addCase(buyCapx.pending, (state) => {
        state.buyCapxStatus = 'loading';
        state.buyCapxError = null;
      })
      .addCase(buyCapx.fulfilled, (state) => {
        state.buyCapxStatus = 'success';
        state.buyCapxError = null;
      })
      .addCase(buyCapx.rejected, (state, action) => {
        state.buyCapxStatus = 'error';
        state.buyCapxError = typeof action.payload === 'string' ? action.payload : "Failed to buy CAPX.";
      })
      .addCase(supportThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(supportThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(supportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearErrors } = generalSlice.actions;
export default generalSlice.reducer;
