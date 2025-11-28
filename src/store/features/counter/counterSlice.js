import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    addBy: (state, action) => { state.value += action.payload },
    reset: () => initialState,
  },
})

export const { increment, decrement, addBy, reset } = counterSlice.actions
export default counterSlice.reducer
