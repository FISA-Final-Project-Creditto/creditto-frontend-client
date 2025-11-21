import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null, // 이름
  birthdate: null, // 생년월일
  phoneNumber: null, // 전화번호
  address: null, // 주소
  externalUserId: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      // action.payload에 들어있는 값들을 한 번에 state에 복사
      // 예: { name: "홍길동", birthday: "2000-01-01", phoneNumber: "010-0000-0000" }
      Object.assign(state, action.payload);
    },
    clearUserData: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserData } = UserSlice.actions;

export default UserSlice.reducer;
