import { axiosInstance } from "../config";

const BASE_URL = "/capx"; 

const rewardsHubApi = {
  // Fetch user rewards
  getDashboard: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/dashboard`);
    return response.data;
  },
  getRewardsHubData: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/rewards/hub`);
    return response.data;
  },

  fetchUserRewards: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/user-rewards`);
    return response.data;
  },

  fetchSpinWheelData: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/spin/wheel`);
    return response.data;
  },

  getActivity: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/user/activity`);
    return response.data;
  },

  getReferralDetails: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/referral/details`);
    return response.data;
  },

  fetchUserPoll: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/poll`);
    return response.data;
  },

   submitPoll: async (encryptedData: any) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`${BASE_URL}/poll`, { encryptedData }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    },

   spinWheelUpdate: async (encryptedData: any) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`${BASE_URL}/spin/wheel/update`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    },

   submitSpinWheel: async (encryptedData: any) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`${BASE_URL}/spin/wheel`, { encryptedData }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    },
   convertCapx: async (encryptedData: any) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`${BASE_URL}/convert/capx`, { encryptedData }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    },

  // Fetch available surveys
  fetchSurveys: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/survey`);
    return response.data;
  },

  // Submit survey response
  submitSurvey: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`${BASE_URL}/survey`, { encryptedData }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
  },

  // Fetch quiz questions
  fetchQuizQuestions: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/quiz`);
    return response.data;
  },

  // Submit quiz answers
  submitQuizAnswers: async (encryptedData: any) => {
    const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`${BASE_URL}/quiz`, { encryptedData }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  // Fetch leaderboard data
  fetchAngelLeaderBoard: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/angel/leaderboard`);
    return response.data;
  },

  fetchCapxLeaderBoard: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/capx/leaderboard`);
    return response.data;
  },

  loginActivity: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/login/activity`);
    return response.data;
  },
  getReferralWithdrawals: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/referral/withdrawals`);
    return response.data;
  },
};

export default rewardsHubApi;
