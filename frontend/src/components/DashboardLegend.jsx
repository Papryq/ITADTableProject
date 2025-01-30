import React from "react";
import minion from "../assets/minionek.png";
import { motion } from "framer-motion";

import exclamation2 from "../assets/exclamation2.png";
import exclamationoff from "../assets/exclamationoff.png";
import fireorange from "../assets/fire.png";
import firered from "../assets/firered.png";
import locker from "../assets/lock2.png";

const DashboardLegend = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 140 }} // Initial state for animation
      animate={{ opacity: 1, x: 0 }} // Animation to opacity and position change
      transition={{ duration: 0.5, delay: 0.3 }} // Transition properties
      className="flex flex-col justify-start items-center mt-8 lg:mt-32 z-10"
    >
      {/* Legend container */}
      <div className="relative mt-8 mb-8 mx-auto w-3/4 bg-slate-50 rounded-2xl border-2 border-slate-400 flex flex-col">
        <h1 className="font-bold flex justify-center mt-1">Table legend</h1>
        
        {/* Legend items (description and corresponding icons) */}
        <div className="flex-col lg:flex-row lg:justify-between p-3">
          {/* Indicator for order deadline */}
          <div className="flex text-sm lg:gap-1 font-bold gap-1 my-2">
            <img src={exclamationoff} className="gap-1 w-5 h-5" />- Indicator of order's deadline
          </div>
          
          {/* Indicator for order deadline approaching */}
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={exclamation2} className="gap-1 w-5 h-5" />- Indicator that order's deadline is close to an end
          </div>
          
          {/* Indicator for locked order */}
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={locker} className="gap-1 w-5 h-5" />- Indicator that order is locked [Remote Management, Bios Password, Apple ID]
          </div>
          
          {/* Indicator for non-priority order */}
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={fireorange} className="gap-1 w-5 h-5" />- Indicator that means, order is not in priority
          </div>
          
          {/* Indicator for priority order */}
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={firered} className="gap-1 w-5 h-5" />- Indicator that means, order is in priority
          </div>
          
          {/* Finished status indicator */}
          <div className="text-sm font-bold flex gap-1 my-2">
            <span className="rounded-lg font-bold">✓</span>-
            Indicator that means, the notebook/system status is finished
          </div>
        </div>

        {/* Optional decorative image */}
        <img src={minion} className="hidden z-1" />
      </div>
    </motion.div>
  );
};

export default DashboardLegend;
