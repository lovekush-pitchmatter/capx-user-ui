import { axiosInstance } from "../config";
import { nowPaymentsDepositThunk } from "../store/slices/transactionSlice";
 
const transactionApi = {
  getTokenPurchasePlan: async () => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.get("/token/plan", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
  getBalanceDetails: async () => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.get("/wallet/details", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  buyTokenPlan: async (data: { planId: string; amount: number }) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/purchase/token", data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  walletConnectDeposit: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/create", { encryptedData }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  coinsPaymentDeposit: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/create/coinspayment", { encryptedData }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  completeOrder: async (data: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/complete", data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  failedOrder: async (data: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/failed", data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  depositReport: async () => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.get("/report/deposit", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  tokenReport: async () => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.get("/report/token/purchase", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  referralReport: async () => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.get("/report/referral", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
  nowPaymentsDeposit: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/create/nowpayments", { encryptedData }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
  manualPayment: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/create/manual/deposit", { encryptedData }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
  transferAmount: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/wallet/transfer", { encryptedData }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
  saveManualTransaction: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/order/create/manual/confirm", { encryptedData }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
  verifyUsername: async (username: string) => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/verify/username", username, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
  sendTransferOtp: async () => {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post("/wallet/transfer/send-otp", {}, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
}

export default transactionApi;
