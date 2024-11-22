import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-2xl border border-black focus:border-teal-400 focus:ring-2 focus:ring-teal-400 placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};

export default Input;
