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
      initial={{ opacity: 0, x: 140 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col justify-start items-center p-4 mt-8 lg:mt-32 z-10 "
    >
      <div className="relative mt-8 mb-8 mx-auto w-3/4 bg-slate-50 rounded-2xl border-2 border-slate-400 flex flex-col p-2">
        <h1 className="font-bold flex justify-center mt-1">Table legend</h1>
        <div className="flex-col lg:flex-row lg:justify-between p-3">
          <div className="flex text-sm lg:gap-1 font-bold gap-1 my-2">
            <img src={exclamationoff} className="gap-1 w-5 h-5" />- Indicator of
            order's deadline
          </div>
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={exclamation2} className="gap-1 w-5 h-5" />- Indicator of
            order's deadline is close to an end
          </div>
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={locker} className="gap-1 w-5 h-5" />- Indicator is order
            locked [Remote Managment, Bios Password, Apple ID]
          </div>
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={fireorange} className="gap-1 w-5 h-5" />- Indicator that
            means, order is not in priorority
          </div>
          <div className="text-sm font-bold flex gap-1 my-2">
            <img src={firered} className="gap-1 w-5 h-5" />- Indicator that
            means, order is in priorority
          </div>
          <div className="text-sm font-bold flex gap-1 my-2">
            <span className=" bg-green-500 rounded-lg font-bold">Finished</span>-
            Indicator that means, is Notebook/System status is finished
          </div>
        </div>
        <img src={minion} className="hidden z-1" />
      </div>
    </motion.div>
  );
};

export default DashboardLegend;
