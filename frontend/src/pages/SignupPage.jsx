import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore.js";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import loginImage from "../assets/loginLogo.png";
import Input from "../components/Input";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const stopLoading = false;
  const navigate = useNavigate();

  // handler to signup and navigate to verify email if everything went fine
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Missmatch pass");
      isLoading === stopLoading;
      return error;
    }

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gradient-to-r from-slate-50 from-40% via-slame-400 to-teal-400 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex justify-center mb-4">
          <img src={loginImage} className=" w-48 h-24" />
        </div>
        <div className="border-t-2 border-t-teal-500"></div>
        <h2 className="p-4 text-3xl text-center">Signup</h2>

        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            icon={Mail}
            type="email"
            placeholder="Email address:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm password:"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {password !== confirmPassword && (
            <p className="text-red-500 font-semibold mb-4 -mt-8 text-sm">
              Password has to match
            </p>
          )}
          {error && <p className="text-red-500 font-semibold">{error}</p>}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-teal-300 to-teal-800 text-white font-bold rounded-lg shadow-lg hover:from-teal-300 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:ring-ffset-gray-900 transition duration-200"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || password !== confirmPassword}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Create account"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-slate-50 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{"  "}
          <Link
            to="/login"
            className="text-teal-700 hover:underline hover:text-teal-300"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
