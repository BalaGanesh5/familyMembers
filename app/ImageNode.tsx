import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Handle, Position, useStore } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";

// Gets the current zoom level
const zoomSelector = (s: any) => s.transform[2];

export const ImageNode = ({ data }: { data: any }) => {
  const currentZoom = useStore(zoomSelector);
  const showDetails = currentZoom >= 1.2; // Trigger details when zoomed in
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensures the portal is only rendered on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden shadow-lg bg-white border border-slate-200 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (data.id % 10) * 0.05 }} // Deterministic stagger effect on load to avoid hydration mismatch
      style={{
        width: showDetails ? "280px" : "60px",
        height: showDetails ? "auto" : "60px",
        transition: "width 0.4s ease, height 0.4s ease"
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      {/* Image behaves differently based on zoom */}
      <img
        src={data.url}
        alt="Gallery"
        className="object-cover w-full transition-all duration-500"
        style={{ height: showDetails ? "200px" : "60px" }}
      />

      {/* Smoothly reveal details when zoomed in */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-white"
          >
            <p className="text-sm text-slate-600 font-medium mb-3">Memory #{data.id}</p>
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevents ReactFlow from dragging the node when clicking
                  setIsOpen(true);
                }}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                View Full Image
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen Portal Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                className="relative max-w-5xl w-full max-h-[90vh] p-4 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent clicks on the image from closing the modal
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 transition-all z-50"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <img src={data.url} alt="Full View" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};