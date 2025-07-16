import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getRefreshToken, logout } from "../store/slices/authSlice";
import { store } from "../store";
import { ENV_CONSTANTS } from "../constants";

const API_BASE_URL = ENV_CONSTANTS.API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const accessToken = state.auth.tokens?.accessToken;
    const refreshToken = state.auth.tokens?.refreshToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const dispatch = store.dispatch;

    console.log("error", error);

    if (error.status === 401 || error.response?.status === 401) {

      dispatch(logout());
      // try {
      //   const state = store.getState();
      //   const refreshToken = state.auth.tokens?.refreshToken;

      //   if (!refreshToken) {
      //     dispatch(logout());
      //     return Promise.reject(error);
      //   }

      //   const result = await dispatch(getRefreshToken()).unwrap();

      //   if (result) {
      //     const newAccessToken = result.accessToken;
      //     const newRefreshToken = result.refreshToken;

      //     originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      //     originalRequest.headers["x-refresh-token"] = newRefreshToken;
      //     return axiosInstance(originalRequest);
      //   } else {
      //     dispatch(logout());
      //     return Promise.reject(error);
      //   }
      // } catch (refreshError) {
      //   dispatch(logout());
      //   try {
      //     const state = store.getState();
      //     const refreshToken = state.auth.tokens?.refreshToken;
      //     const accessToken = state.auth.tokens?.accessToken;

      //     if (refreshToken && accessToken) {
      //       await axios.head(`${API_BASE_URL}/auth/logout`, {
      //         headers: {
      //           Authorization: `Bearer ${accessToken}`,
      //           "x-refresh-token": refreshToken,
      //         },
      //       });
      //     }
      //   } catch (logoutError) {
      //     console.error("Logout API error:", logoutError);
      //   }

      //   return Promise.reject(error);
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
