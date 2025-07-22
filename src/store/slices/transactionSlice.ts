import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionApi from "../../api/transactionApi";

interface ReportState {
  loading: boolean;
  error: string | null;
  data: any;
} 

interface TransactionState {
  loading: boolean;
  error: string | null;
  transaction: any;
  tokenPlans: any[];
  buyPlan: ReportState;
  walletConnect: ReportState;
  coinsPayment: ReportState;
  nowPayments: ReportState;
  manualPayments: any[] | null;
  completeOrder: ReportState;
  failedOrder: ReportState;
  depositHistory: any[] | null;
  referralHistory: any[] | null;
  tokenPurchaseHistory: any[] | null;
  saveManualTransaction: any[] | null;
  verifyUserName: any[] | null;
  transferAmount: any[] | null;
  balanceDetails: any[] | null;
  sendTransferOtp: ReportState;
}

const initialState: TransactionState = {
  loading: false,
  error: null,
  transaction: null,
  tokenPlans: [],
  buyPlan: { loading: false, error: null, data: null },
  walletConnect: { loading: false, error: null, data: null },
  coinsPayment: { loading: false, error: null, data: null },
  nowPayments: { loading: false, error: null, data: null },
  completeOrder: { loading: false, error: null, data: null },
  failedOrder: { loading: false, error: null, data: null },
  depositHistory: [],
  referralHistory: [],
  tokenPurchaseHistory: [],
  manualPayments: [],
  saveManualTransaction: [],
  verifyUserName: [],
  transferAmount: [],
  balanceDetails: [],
  sendTransferOtp: { loading: false, error: null, data: null },
};

export const getTokenPlanThunk = createAsyncThunk(
  'transaction/getTokenPlanThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionApi.getTokenPurchasePlan();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const balanceDetailsThunk = createAsyncThunk(
  'transaction/balanceDetailsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionApi.getBalanceDetails();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const buyTokenPlanThunk = createAsyncThunk(
  'transaction/buyTokenPlan',
  async (data: { planId: string; amount: number }, { rejectWithValue }) => {
    try {
      const response = await transactionApi.buyTokenPlan(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const walletConnectDepositThunk = createAsyncThunk(
  'transaction/walletConnectDeposit',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.walletConnectDeposit(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const coinsPaymentDepositThunk = createAsyncThunk(
  'transaction/coinsPaymentDeposit',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.coinsPaymentDeposit(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeOrder = createAsyncThunk(
  'transaction/completeOrder',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.completeOrder(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
); 

export const failedOrder = createAsyncThunk(
  'transaction/failedOrder',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.failedOrder(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const depositReport = createAsyncThunk(
  'transaction/depositReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionApi.depositReport();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tokenReport = createAsyncThunk(
  'transaction/tokenReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionApi.tokenReport();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const referralReport = createAsyncThunk(
  'transaction/referralReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionApi.referralReport();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const nowPaymentsDepositThunk = createAsyncThunk(
  'transaction/nowPaymentsDeposit',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.nowPaymentsDeposit(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const dispatchManualThunk = createAsyncThunk(
  'transaction/dispatchManualThunk',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.manualPayment(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const dispatchSaveManualTransaction = createAsyncThunk(
  'transaction/dispatchSaveManualTransaction',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.saveManualTransaction(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyUsername = createAsyncThunk(
  'transaction/verifyUsername',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await transactionApi.verifyUsername(username);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const transferAmount = createAsyncThunk(
  'transaction/transferAmount',
  async (encryptedData: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.transferAmount(encryptedData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendTransferOtpThunk = createAsyncThunk(
  'transaction/sendTransferOtp',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionApi.sendTransferOtp();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearTransactionState: (state) => {
      state.loading = false;
      state.error = null;
      state.transaction = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTokenPlanThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTokenPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tokenPlans = action.payload.req;
      })
      .addCase(getTokenPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(buyTokenPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.buyPlan.data = null;
      })
      .addCase(buyTokenPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.buyPlan.data = action.payload;
      })
      .addCase(buyTokenPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(walletConnectDepositThunk.pending, (state) => {
        state.loading = true; 
        state.error = null;
        state.walletConnect.data = null;
      })
      .addCase(walletConnectDepositThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.walletConnect.data = action.payload;
      })
      .addCase(walletConnectDepositThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(coinsPaymentDepositThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.coinsPayment.data = null;
      })
      .addCase(coinsPaymentDepositThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coinsPayment.data = action.payload;
      })
      .addCase(coinsPaymentDepositThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(completeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.completeOrder.data = null;
      })
      .addCase(completeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.completeOrder.data = action.payload;

      })
      .addCase(completeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(failedOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        if (state.failedOrder) {
          state.failedOrder.data = null;
        }
      })
      .addCase(failedOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (state.failedOrder) {
          state.failedOrder.data = action.payload;
        }
      })
      .addCase(failedOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(depositReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(depositReport.fulfilled, (state, action) => {
        state.loading = false;
        state.depositHistory = action.payload.data;
      })
      .addCase(depositReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(referralReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(referralReport.fulfilled, (state, action) => {
        state.loading = false;
        state.referralHistory = action.payload.data;
      })
      .addCase(referralReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(nowPaymentsDepositThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.nowPayments = { loading: false, error: null, data: null };
      })
      .addCase(nowPaymentsDepositThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPayments = { loading: false, error: null, data: action.payload };
      })
      .addCase(nowPaymentsDepositThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.nowPayments = { loading: false, error: action.payload as string, data: null };
      })
      .addCase(tokenReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tokenReport.fulfilled, (state, action) => {
        state.loading = false;
        state.tokenPurchaseHistory = action.payload.data;
      })
      .addCase(tokenReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       .addCase(dispatchManualThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.manualPayments = null;
      })
      .addCase(dispatchManualThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.manualPayments = action.payload;
      })
      .addCase(dispatchManualThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.manualPayments = null;
      })
      .addCase(dispatchSaveManualTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveManualTransaction = null;
      })
      .addCase(dispatchSaveManualTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.saveManualTransaction = action.payload;
      })
      .addCase(dispatchSaveManualTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.saveManualTransaction = null;
      })
      .addCase(verifyUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifyUserName = null;
      })
      .addCase(verifyUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyUserName = action.payload;
      })
      .addCase(verifyUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.verifyUserName = null;
      })
      .addCase(transferAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.transferAmount = null;
      })
      .addCase(transferAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.transferAmount = action.payload;
      })
      .addCase(transferAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.transferAmount = null;
      })
      .addCase(balanceDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.balanceDetails = [];
      })
      .addCase(balanceDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.balanceDetails = action.payload.data || [];
      })
      .addCase(balanceDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.balanceDetails = [];
      })
      .addCase(sendTransferOtpThunk.pending, (state) => {
        state.sendTransferOtp.loading = true;
        state.sendTransferOtp.error = null;
        state.sendTransferOtp.data = null;
      })
      .addCase(sendTransferOtpThunk.fulfilled, (state, action) => {
        state.sendTransferOtp.loading = false;
        state.sendTransferOtp.data = action.payload;
      })
      .addCase(sendTransferOtpThunk.rejected, (state, action) => {
        state.sendTransferOtp.loading = false;
        state.sendTransferOtp.error = action.payload as string;
        state.sendTransferOtp.data = null;
      });
  },
});

export const { clearTransactionState, setError } = transactionSlice.actions;
export default transactionSlice.reducer;
