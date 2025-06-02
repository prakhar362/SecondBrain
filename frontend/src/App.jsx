import { useState } from 'react'
import { Button } from "@/components/ui/button"
import './App.css'

function App() {
  
  return (
    <>
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <div className="flex min-h-svh flex-col items-center justify-center">
      <Button className="bg-black text-amber-50">Click me</Button>
    </div>
    </>
  )
}

export default App
