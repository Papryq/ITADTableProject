import { Routes, Route } from "react-router-dom"

import FloatingImage from "./components/FloatingImage"
import FloatingShape from "./components/FloatingShape"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Navbar from "./components/Navbar"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import DashboardPage from "./pages/DashboardPage"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 from-40% via-slate-200 to-slate-50 flex items-center justify-center relative overflow-hidden">
      <Navbar />
      <FloatingShape
        
        color="bg-teal-500"
        size="w-96 h-96"
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
        delay={0}
      />

      <Routes>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        <Route path="verify-email" element={<EmailVerificationPage />} />
      </Routes>
    </div>
  )
}

export default App
