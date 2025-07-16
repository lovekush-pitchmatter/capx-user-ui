import { axiosInstance } from "../config";


const profileApi = {
  updateDashboardProfileImage: async (formData: FormData) => {
    const response = await axiosInstance.put<{ message: string; profileImage: string }>("/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  updateUserProfile: async (encryptedData: any) => {
    const response = await axiosInstance.post("/user/update", { encryptedData });
    return response.data;
  },
  updatePassword: async (encryptedData: any) => {
    return axiosInstance.post("/user/update/password", { encryptedData }).then(res => res.data);
  },

  updateEmail: async (encryptedData: any) => {
    return axiosInstance.post("/user/update/email", { encryptedData }).then(res => res.data);
  },

  verifyEmailOtp: async (encryptedData: any) => {
    return axiosInstance.post("/user/email/otp-verify", { encryptedData }).then(res => res.data);
  },

  deleteAccount: async (encryptedData: any) => {
    return axiosInstance.post("/user/delete/account", { encryptedData }).then(res => res.data);
  },
  updateTwoFA: async (encryptedData: any) => {
    return await axiosInstance.post("user/update/2fa", { encryptedData }).then(res => res.data);
  },
};

export default profileApi;
