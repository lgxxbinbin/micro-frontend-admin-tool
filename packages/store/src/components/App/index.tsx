import React from 'react'
import './index.css'
import { useBearStore } from './../../stores'

export default function App() {
  const bears = useBearStore((state) => state.bears)
  const increaseBears = useBearStore((state) => state.increaseBears)
  const removeAllBears = useBearStore((state) => state.removeAllBears)

  return (
    <>
      <h1>we have {bears} candy</h1>

      <button onClick={increaseBears}>one up</button>

      <button onClick={removeAllBears}>remove store</button>
    </>
  )
}
