// src/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거합니다.
    // 응답 데이터가 있는 작업 수행
    console.log("API 성공 응답값:", response.data);
    return response;
  },
  (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거합니다.
    // 응답 오류가 있는 작업 수행
    if (axios.isAxiosError(error)) {
      console.log("Axios error message:", error.message);
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log("status:", error.response.status);
        console.log("data:", error.response.data);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        console.log("No response received:", error.request);
      }
    } else {
      console.error("Non-Axios error:", error);
    }
    return Promise.reject(error);
  }
);
export default api;

// 유저 등록
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/user/register", userData);
    console.log("유저등록 API 성공 응답값:", response.data);
    return response.data;
  } catch (error) {}
};

// 인증서 발급 API
export const issueCertificate = async (requestBody) => {
  try {
    const response = await api.post("/api/certificate/issue", requestBody);
    console.log("인증서 발급 API 성공 응답값:", response.data);
    return response.data;
  } catch (error) {}
};
