import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../assets/navbarLogo.png";
import home from "../assets/home.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 bg-teal-100 w-full h-20 flex border-b-2 border-b-black">
      <div className="flex justify-between w-1/2">
        <Link to="/">
          <motion.img
            src={home}
            className="w-12 h-12 rounded-2xl bg-gray-200 p-2 ml-6 mt-4 shadow-lg hover:from-gray-200 hover:to-white focus:ring-2 focus:ring-teal-200 transition duration-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </Link>
        <img src={logo} />
      </div>
      <div className="bg-gradient-to-r from-teal-900 to-teal-400 w-1/2">
        <div className="w-20 h-20  rounded-full"></div>
      </div>
    </nav>
  );
};

export default Navbar;
