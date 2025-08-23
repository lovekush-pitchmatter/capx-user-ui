import { axiosInstance } from "../config";

const BASE_URL = "/capx";

const rewardsHubApi = {
  // Fetch user rewards
  getDashboard: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/dashboard`);
    return response.data;
  },

  fetchUserRewards: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/user-rewards`);
    return response.data;
  },

  // Fetch available surveys
  fetchSurveys: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/surveys`);
    return response.data;
  },

  // Submit survey response
  submitSurvey: async (surveyId: string, answers: Record<string, any>) => {
    const response = await axiosInstance.post(`${BASE_URL}/surveys/${surveyId}/submit`, answers);
    return response.data;
  },

  // Fetch quiz questions
  fetchQuizQuestions: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/quiz-questions`);
    return response.data;
  },

  // Submit quiz answers
  submitQuizAnswers: async (quizId: string, answers: Record<string, any>) => {
    const response = await axiosInstance.post(`${BASE_URL}/quiz/${quizId}/submit`, answers);
    return response.data;
  },

  // Fetch leaderboard data
  fetchLeaderboard: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/leaderboard`);
    return response.data;
  },
};

export default rewardsHubApi;
