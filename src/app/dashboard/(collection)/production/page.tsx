"use client";

import React, { useEffect, useState } from "react";
import LargeModal from "../../../../components/LargeModal";
import StaticWorkflow from "../../../../components/StaticWorkflow";

import { Node, Edge } from "reactflow";

type NodeData = {
  label: string;
  icon?: string;
  nodes?: NodeData[];
};

type SavedStructure = {
  name: string;
  description: string;
  nodes: NodeData[];
};

const ProductionPage = () => {
  const [structures, setStructures] = useState<SavedStructure[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStructure, setSelectedStructure] =
    useState<SavedStructure | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedStructure) {
      const convertToReactFlowNodes = (
        nodeDataList: NodeData[],
        parentId: string | null = null,
      ): Node[] => {
        return nodeDataList.map((nodeData, index) => {
          const id = parentId ? `${parentId}_${index}` : `node_${index}`;
          const xPosition = (index % 3) * 300;
          const yPosition = Math.floor(index / 3) * 200;

          return {
            id,
            position: { x: xPosition, y: yPosition },
            data: { ...nodeData },
          };
        });
      };

      const transformedNodes = convertToReactFlowNodes(selectedStructure.nodes);

      const generateEdges = (nodeList: Node[]): Edge[] => {
        return nodeList.slice(0, -1).map((node, index) => ({
          id: `edge_${index}`,
          source: node.id,
          target: nodeList[index + 1].id,
          type: "smoothstep",
        }));
      };

      setNodes(transformedNodes);
      setEdges(generateEdges(transformedNodes));
    }
  }, [selectedStructure]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const loadedStructures: SavedStructure[] = keys
      .filter((key) => key.startsWith("workflowStructure_"))
      .map((key) => {
        const savedStructure = localStorage.getItem(key);
        if (savedStructure) {
          try {
            return {
              name: key.replace("workflowStructure_", ""),
              ...JSON.parse(savedStructure),
            };
          } catch (error) {
            console.error(`Erreur lors de la lecture de la clé ${key} :`, error);
          }
        }
        return null;
      })
      .filter(Boolean) as SavedStructure[];

    setStructures(loadedStructures);
  }, []);

  const filteredStructures = structures.filter((structure) =>
    structure.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClickStructure = (structure: SavedStructure) => {
    setSelectedStructure(structure);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStructure(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-10 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Barre de recherche */}
      <div className="mx-auto mb-8 w-full max-w-lg">
        <input
          type="text"
          placeholder="Rechercher une structure..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-4 text-gray-900 shadow-md focus:border-purple-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Liste des structures */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStructures.length > 0 ? (
          filteredStructures.map((structure, index) => (
            <div
              key={index}
              onClick={() => handleClickStructure(structure)}
              className="cursor-pointer rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:bg-purple-50 dark:bg-gray-800"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {structure.name || `Structure ${index + 1}`}
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {structure.description?.substring(0, 100) ||
                  "Aucune description disponible."}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            Aucune structure sauvegardée pour le moment.
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedStructure && (
        <LargeModal onClose={handleCloseModal}>
          <h3 className="mb-4 text-2xl font-bold">{selectedStructure.name}</h3>
          <p className="mb-6">{selectedStructure.description}</p>
          <div className="relative mb-6 h-[600px] w-full">
            <StaticWorkflow nodes={nodes} edges={edges} />
          </div>
          <button
            onClick={handleCloseModal}
            className="rounded-lg bg-purple-500 px-6 py-3 text-white shadow-md hover:bg-purple-600"
          >
            Fermer
          </button>
        </LargeModal>
      )}
    </div>
  );
};

export default ProductionPage;
