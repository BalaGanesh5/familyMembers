import React from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

export const CenterNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 text-center w-[280px] sm:w-[320px] overflow-hidden">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        {/* Hero Image Section */}
        <div className="h-56 w-full relative">
          <img src={data.imageUrl} alt="Main Event" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
          <h1 className="absolute bottom-4 left-0 right-0 text-2xl font-extrabold tracking-tight text-white drop-shadow-md">
            {data.title}
          </h1>
        </div>
        
        {/* Details Section */}
        <div className="px-6 py-6 flex flex-col gap-4 items-center bg-white">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {data.location}
          </div>
          
          <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm bg-slate-100 px-4 py-2 rounded-full shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {data.date}
          </div>
        </div>
      </motion.div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="source" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
};