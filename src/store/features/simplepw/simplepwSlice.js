const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  settingMode: false,
  loginMode: false,
};

const simplepwSlice = createSlice({
  name: "simplepw",
  initialState,
  reducers: {
    settingMode: (state) => {
      state.settingMode = true;
    },
    loginMode: (state) => {
      state.loginMode = true;
    },
  },
});
export const {settingMode,  loginMode} = simplepwSlice.actions;
export default simplepwSlice.reducer;

