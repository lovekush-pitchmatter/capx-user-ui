import { axiosInstance } from "../config";

const generalApi = {
  getDashboard: async () => {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
  },
  getCapxPlans: async () => {
    const response = await axiosInstance.get("/token/plan");
    return response.data;
  },
  buyCapx: async ({ planId, orderAmount }: { planId: string; orderAmount: number }) => {
    const response = await axiosInstance.post("/order/purchase/token", { planId, orderAmount });
    return response.data;
  },
  supportRequest: async ({ subject, message }: { subject: string; message: string }) => {
    const response = await axiosInstance.post("/user/support", { subject, message });
    return response.data;
  },
};

export default generalApi;
