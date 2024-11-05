import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import loginImage from "../assets/loginImage.jpeg"
import Input from "../components/Input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDeafult();
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
        <img src={loginImage} className=" w-48 h-24"/>
        </div>
        <div className="border-t-2 border-t-teal-500"></div>
        <h2 className="p-4 text-3xl text-center">LOGIN</h2>

        <forn onSubmit={handleLogin}>
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

          <div className="flex items-center -mt-6 mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-teal-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </forn>
      </div>
      <div className="px-8 py-4 bg-slate-50 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don`t have an account?{"  "}
          <Link
            to="/signup"
            className="text-teal-700 hover:underline hover:text-teal-300"
          >
            Signup
          </Link>
          &nbsp;now!
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
