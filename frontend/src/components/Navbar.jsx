import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../../public/navbarLogo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 bg-teal-100 w-full h-16 flex border-b-2 border-b-black">
      <div className="flex items-ceter lg:justify-end w-3/4 lg:w-1/2 ml-16 lg:ml-0">
        <Link to="/">
          <motion.img
            src={logo}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          />
        </Link>
      </div>
      <div className="hidden lg:block bg-gradient-to-r from-teal-900 to-teal-400 w-1/2">
        <div className="w-20 h-20  rounded-full"></div>
      </div>
    </nav>
  );
};

export default Navbar;
