// NodeContainer/index.tsx
"use client";

import React, { useEffect } from "react";

type NodeData = {
  label: string;
  icon?: string;
  apcuEnabled?: boolean;
  opcacheEnabled?: boolean;
  mailFunctionEnabled?: boolean;
  smtp?: string;
  port?: number;
};

type NodeContainerProps = {
  nodes: NodeData[];
  onDeleteNode?: (nodeIndex: number) => void;
  onDeleteParent?: () => void;
};

const NodeContainer: React.FC<NodeContainerProps> = ({
  nodes,
  onDeleteNode,
  onDeleteParent,
}) => {
  // Filtrer les nœuds qui n'ont pas de label ou un label vide
  const filteredNodes = nodes.filter(
    (node) => node.label && node.label.trim() !== ""
  );

  // Log les données initiales que NodeContainer reçoit
  useEffect(() => {
    console.log("NodeContainer received nodes (useEffect):", filteredNodes);
  }, [filteredNodes]);

  // Une fois avant chaque rendu pour voir si le composant reçoit bien les données correctes
  console.log("NodeContainer received nodes (before render):", filteredNodes);

  if (!filteredNodes || filteredNodes.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border bg-gray-800 p-5 text-white shadow-md">
        No nodes available to display.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-gray-800 p-5 shadow-md">
      {filteredNodes.map((node, nodeIndex) => {
        console.log("Rendering node:", node); // Log chaque node pour vérifier qu'il est bien rendu

        return (
          <div
            key={nodeIndex}
            className="mb-6 w-full rounded-lg bg-gray-700 p-4"
          >
            <div className="mb-4 flex w-full justify-between">
              <span className="text-lg font-bold text-gray-100">
                {node.label}
              </span>
              {onDeleteNode && (
                <button
                  className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-gray-100 hover:bg-gray-600"
                  onClick={() => onDeleteNode(nodeIndex)}
                >
                  x
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {node.icon && (
                <div className="relative">
                  <img
                    src={`/${node.icon}`}
                    alt={node.icon}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 text-left text-gray-100">
              <p className="text-sm">
                <strong>APCu Enabled:</strong>{" "}
                <span>{node.apcuEnabled ? "Yes" : "No"}</span>
              </p>
              <p className="text-sm">
                <strong>OPCache Enabled:</strong>{" "}
                <span>{node.opcacheEnabled ? "Yes" : "No"}</span>
              </p>
              <p className="text-sm">
                <strong>Mail Function Enabled:</strong>{" "}
                <span>{node.mailFunctionEnabled ? "Yes" : "No"}</span>
              </p>
              <p className="text-sm">
                <strong>SMTP Server:</strong> <span>{node.smtp}</span>
              </p>
              <p className="text-sm">
                <strong>Port:</strong> <span>{node.port}</span>
              </p>
            </div>
          </div>
        );
      })}
      {onDeleteParent && (
        <button
          className="mt-2 rounded bg-red-500 p-2 text-white"
          onClick={onDeleteParent}
        >
          Delete Parent
        </button>
      )}
    </div>
  );
};

export default NodeContainer;
