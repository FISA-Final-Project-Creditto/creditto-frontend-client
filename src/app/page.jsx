'use client'

import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, addBy, reset } from '@/src/store/features/counter/counterSlice'

export default function HomePage() {
  const value = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <main style={{ padding: 24 }}>
      <h1>Counter: {value}</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(addBy(5))}>+5</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </main>
  )
}
