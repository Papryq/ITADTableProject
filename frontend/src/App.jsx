import { Routes, Route } from "react-router-dom"

import FloatingImage from "./components/FloatingImage"
import FloatingShape from "./components/FloatingShape"
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 from-40% via-slate-200 to-slate-50 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        
        color="bg-teal-500"
        size="w-64 h-64"
        top='65%'
        left='65%'
        delay={0}
      />
      
      <FloatingImage
        size="w-128 h-128"
        top="45%"
        left="-15%"
        delay={0}
      />

      <FloatingImage
        rotateStart={0}
        rotateEnd={10}
        size="w-128 h-128"
        top="-50%"
        left="65%"
        delay={2}
      />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
