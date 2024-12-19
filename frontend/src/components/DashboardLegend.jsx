import React from "react";
import minion from "../assets/minionek.png"

import exclamation2 from "../assets/exclamation2.png"
import exclamationoff from "../assets/exclamationoff.png"
import fireorange from "../assets/fire.png"
import firered from "../assets/firered.png"
import locker from "../assets/lock2.png"

const DashboardLegend = () => {
  return (
    <div className="mt-8 2xl:mt-32 2xl:mx-16 xl:mx-12 mx-1 px-2 mb-8 lg:w-1/2 bg-slate-50 rounded-2xl border-2 border-slate-400 shadow-2xl shadow-teal-400 z-10">
      <h1 className="py-2 font-bold flex justify-center">Table legend</h1>
      <div className="flex-col lg:flex-row lg:justify-between">
          <div className="flex text-sm lg:gap-1 font-bold gap-1 my-2"><img src={exclamationoff} className="gap-1 w-5 h-5"/>- Indicator of order's deadline</div>
          <div className="text-sm font-bold flex gap-1 my-2"><img src={exclamation2} className="gap-1 w-5 h-5"/>- Indicator of order's deadline is close to an end</div>
          <div className="text-sm font-bold flex gap-1 my-2"><img src={locker} className="gap-1 w-5 h-5" />- Indicator is order locked [Remote Managment, Bios Password, Apple ID]</div>
          <div className="text-sm font-bold flex gap-1 my-2"><img src={fireorange} className="gap-1 w-5 h-5" />- Indicator that means, order is not in priorority</div>
          <div className="text-sm font-bold flex gap-1 my-2"><img src={firered} className="gap-1 w-5 h-5" />- Indicator that means, order is in priorority</div>
      </div>
      <img src={minion} className="hidden z-1" />
    </div>
  );
};

export default DashboardLegend;
