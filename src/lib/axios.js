// src/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// 유저 등록
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/user/register", userData);
    console.log("유저등록 API 성공 응답값:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error message:", error.message); // ★ 여기엔 'Network Error'
      console.log("Axios error code:", error.code); // ★ ERR_NETWORK 같은 값

      if (error.response) {
        // HTTP 응답은 왔는데 4xx, 5xx일 때
        console.log("status:", error.response.status);
        console.log("data:", error.response.data);
      } else if (error.request) {
        // 요청은 나갔는데 응답이 아예 안 옴(지금 케이스)
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
    } else {
      console.error("Non-Axios error:", error);
    }

    throw error;
  }
};

// 인증서 발급 API
export const issueCertificate = async (requestBody) => {
  try {
    const response = await api.post("/api/certificate/issue", requestBody);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error message:", error.message); // ★ 여기엔 'Network Error'
      console.log("Axios error code:", error.code); // ★ ERR_NETWORK 같은 값

      if (error.response) {
        // HTTP 응답은 왔는데 4xx, 5xx일 때
        console.log("status:", error.response.status);
        console.log("data:", error.response.data);
      } else if (error.request) {
        // 요청은 나갔는데 응답이 아예 안 옴(지금 케이스)
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
    } else {
      console.error("Non-Axios error:", error);
    }

    throw error;
  }
};
