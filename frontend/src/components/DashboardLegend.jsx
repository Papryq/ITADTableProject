import React from "react";
import { motion } from "framer-motion";

// UI
import DashboardLegendContent from "./ui/DashboardLegendContent";


const DashboardLegend = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 140 }} // Initial state for animation
      animate={{ opacity: 1, x: 0 }} // Animation to opacity and position change
      transition={{ duration: 0.5, delay: 0.3 }} // Transition properties
      className="flex flex-col justify-start items-center mt-8 lg:mt-32 mx-2 lg:mx-0 z-10"
    >
      <DashboardLegendContent />
    </motion.div>
  );
};

export default DashboardLegend;
