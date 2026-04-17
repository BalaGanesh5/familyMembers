"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CenterNode } from "./CenterNode";
import { ImageNode } from "./ImageNode";
import { generateGallery } from "./generateGallery";

const nodeTypes = {
  centerNode: CenterNode,
  imageNode: ImageNode,
};

// ---------------------------------------------------------
// RESET VIEW BUTTON COMPONENT
// ---------------------------------------------------------
function ResetViewButton() {
  const { fitView } = useReactFlow();
  return (
    <Panel position="bottom-right" className="mb-4 mr-4 sm:mb-6 sm:mr-6">
      <button
        onClick={() => fitView({ padding: 0.2, duration: 800 })}
        className="bg-slate-900 text-white p-3 rounded-full shadow-2xl border border-slate-700 font-semibold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
        title="Reset View"
        aria-label="Reset View"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M3 12h3"></path>
          <path d="M18 12h3"></path>
          <path d="M12 3v3"></path>
          <path d="M12 18v3"></path>
        </svg>
      </button>
    </Panel>
  );
}

export default function GalleryClient({ imageUrls }: { imageUrls: string[] }) {
  // Generate the gallery dynamically using the fetched image URLs
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => generateGallery(imageUrls), [imageUrls]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: "100vw", height: "100dvh", backgroundColor: "#000000" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={3}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#222222" gap={20} size={2} />
        <Controls showInteractive={false} />
        <ResetViewButton />
        <Panel position="bottom-right" className="text-white/40 text-xs mb-1 mr-2 tracking-widest font-medium pointer-events-none">
          Bala
        </Panel>
      </ReactFlow>
    </div>
  );
}