import { Node, Edge } from "@xyflow/react";

export const generateGallery = (imageUrls: string[]): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [
    {
      id: "center",
      type: "centerNode",
      position: { x: 0, y: 0 },
      data: { 
        title: "Family Event", 
        date: "12th April, 2026",
        location: "Ayyappa Nivas, Hyderabad",
        imageUrl: "/gallery/Main.jpeg"
      },
      className: "z-50",
    },
  ];
  const edges: Edge[] = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const index = i + 1;
    // Spiral math so images spread out organically
    const angle = index * 137.5 * (Math.PI / 180);
    const radius = 200 + Math.sqrt(index) * 150; 
    const x = Math.round(Math.cos(angle) * radius);
    const y = Math.round(Math.sin(angle) * radius);

    nodes.push({
      id: `img-${index}`,
      type: "imageNode",
      position: { x, y },
      data: { url: imageUrls[i], id: index }, // Dynamically assigns your local image URLs
    });

    edges.push({
      id: `e-center-${index}`,
      source: "center",
      target: `img-${index}`,
      animated: true,
      interactionWidth: 0, // Removes the invisible click boundary
      style: { 
        stroke: "#00ffff", 
        strokeWidth: 1, 
        opacity: 0.3,
        filter: "drop-shadow(0 0 3px #00ffff)",
        pointerEvents: "none" // Makes the visual line ignore touch events
      }, // Neon cyan colored web
    });
  }
  return { nodes, edges };
};