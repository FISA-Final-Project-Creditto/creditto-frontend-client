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
      console.log("status:", error.response?.status);
      console.log("data:", error.response?.data);

      console.error("message:", error.response?.data?.message);
      console.error("error:", error.response?.data?.error);
    } else {
      console.error(error);
    }

    throw error;
  }
};
