const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isVerificationRequired: false, // 비밀번호 확인이 필요한지 여부
  redirectPath: null, // 성공 후 이동할 경로
  mode: null, // 'setting', 'login' 등 특수 모드 관리
};

const simplepwSlice = createSlice({
  name: "simplepw",
  initialState,
  reducers: {
    // payload가 boolean일 경우 해당 값으로, 아닐 경우 true로 설정
    // 비밀번호 확인을 요구하고, 성공 시 이동할 경로를 설정하는 액션
    requireVerification: (state, action) => {
      state.isVerificationRequired = true;
      state.redirectPath = action.payload; // payload로 이동할 경로를 받음
      state.mode = 'verify'; // 일반 검증 모드
    },
    // 비밀번호 '설정' 모드로 진입하는 액션
    startSettingMode: (state) => {
      state.mode = 'setting';
    },
    // 모든 상태를 초기 상태로 리셋하는 액션
    resetVerification: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const { requireVerification, startSettingMode, resetVerification } = simplepwSlice.actions;
export default simplepwSlice.reducer;
