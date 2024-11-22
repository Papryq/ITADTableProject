import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";

import { useAuthStore } from "../store/authStore";
import loginImage from "../assets/loginLogo.png";
import Input from "../components/Input";
import minion from "../assets/auraminon.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDeafult();
    await login(email, password);
  };

  return (
    <>
      <motion.img
        src={minion}
        className="rounded-full fixed top-1/4 left-[33rem] max-xl:invisible"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

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
          <h2 className="p-4 text-3xl text-center">LOGIN</h2>

          <form onSubmit={handleLogin}>
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

            <div className="flex items-center -mt-8 mb-48">
              <Link
                to="/forgot-password"
                className="text-sm text-teal-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <motion.button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-teal-300 to-teal-800 text-white font-bold rounded-lg shadow-lg hover:from-teal-300 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:ring-ffset-gray-900 transition duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
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
    </>
  );
};

export default LoginPage;
