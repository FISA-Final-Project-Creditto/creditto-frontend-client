// src/lib/axios.js
import axios from "axios";

// 1. 기본 API 서버용 인스턴스
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. 다른 서버용 인스턴스 (예: 인증 서버)
//    .env.local 파일에 NEXT_PUBLIC_AUTH_URL=https://auth.example.com 와 같이 추가해야 합니다.
export const credittoApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CREDITTO_URL,
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

// authApi 인스턴스에도 필요하다면 별도의 인터셉터를 추가할 수 있습니다.
credittoApi.interceptors.request.use((config) => {
  console.log("인증 API 요청 전송:", config.url);
  return config;
});


// 기존 코드와의 호환성을 위해 기본 인스턴스를 default로 export 합니다.
// 다른 파일에서 import api from '...' 형태로 계속 사용할 수 있습니다.
export default api;




// 유저 등록
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/user/register", userData);
    console.log("유저등록 API 성공 응답값:", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// 인증서 발급 API
export const issueCertificate = async (requestBody) => {
  try {
    const response = await api.post("/api/certificate/issue", requestBody);
    console.log("인증서 발급 API 성공 응답값:", response.data);
    return response.data;
  } catch (error) {}
};
