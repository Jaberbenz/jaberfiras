// ProductionPage/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import LargeModal from "../../../../components/LargeModal";
import StaticWorkflow from "../../../../components/StaticWorkflow";

import { Node, Edge } from "reactflow";

// Déclaration des types de données

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

  // Charger la structure sélectionnée dans le modal
  useEffect(() => {
    if (selectedStructure) {
      console.log(
        "Vérifiez la structure des nœuds sélectionnés:",
        selectedStructure.nodes,
      );

      // Conversion des NodeData à Node pour reactflow
      const convertToReactFlowNodes = (
        nodeDataList: NodeData[],
        parentId: string | null = null,
      ): Node[] => {
        return nodeDataList.map((nodeData, index) => {
          const id = parentId ? `${parentId}_${index}` : `node_${index}`;

          // Calcul de position en grille
          const xPosition = (index % 3) * 300; // 300 pixels de séparation horizontale
          const yPosition = Math.floor(index / 3) * 200; // 200 pixels de séparation verticale

          return {
            id,
            position: { x: xPosition, y: yPosition }, // Positionnement en grille
            data: { ...nodeData },
          };
        });
      };

      const transformedNodes = convertToReactFlowNodes(selectedStructure.nodes);

      // Génération d'arêtes pour relier chaque nœud au suivant (pour simplifier)
      const generateEdges = (nodeList: Node[]): Edge[] => {
        let generatedEdges: Edge[] = [];
        for (let i = 0; i < nodeList.length - 1; i++) {
          generatedEdges.push({
            id: `edge_${i}`,
            source: nodeList[i].id,
            target: nodeList[i + 1].id,
            type: "smoothstep",
          });
        }
        return generatedEdges;
      };

      const transformedEdges = generateEdges(transformedNodes);

      setNodes(transformedNodes);
      setEdges(transformedEdges); // Ajouter les arêtes générées
    }
  }, [selectedStructure]);

  // Charger toutes les structures à partir du LocalStorage
  useEffect(() => {
    const keys = Object.keys(localStorage);
    const loadedStructures: SavedStructure[] = [];

    keys.forEach((key) => {
      if (key.startsWith("workflowStructure_")) {
        const savedStructure = localStorage.getItem(key);
        if (savedStructure) {
          try {
            const parsedStructure = JSON.parse(savedStructure);
            loadedStructures.push({
              name: key.replace("workflowStructure_", ""),
              ...parsedStructure,
            });
          } catch (error) {
            console.error(
              `Erreur lors de la lecture de la clé ${key} :`,
              error,
            );
          }
        }
      }
    });

    setStructures(loadedStructures);
  }, []);

  // Filtrer les structures en fonction du terme de recherche
  const filteredStructures = structures.filter((structure) =>
    structure.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Fonction pour gérer le clic sur une structure
  const handleClickStructure = (structure: SavedStructure) => {
    setSelectedStructure(structure);
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modal
  const handleCloseModal = () => {
    setSelectedStructure(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col p-10 text-gray-900 dark:text-gray-100">
      {/* Barre de recherche */}
      <div className="mx-auto mb-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="Rechercher une structure..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        />
      </div>

      {/* Liste des structures */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStructures.length > 0 ? (
          filteredStructures.map((structure, index) => (
            <div
              key={index}
              onClick={() => handleClickStructure(structure)}
              className="cursor-pointer rounded-lg bg-white p-6 shadow-md transition-all hover:bg-gray-700 dark:bg-gray-800"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {structure.name || `Structure ${index + 1}`}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {structure.description?.substring(0, 100) ||
                  "Aucune description."}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Aucune structure sauvegardée pour le moment.
          </p>
        )}
      </div>

      {/* Large Modal pour Afficher le Workflow */}
      {isModalOpen && selectedStructure && (
        <LargeModal onClose={handleCloseModal}>
          <h3 className="mb-4 text-lg font-bold">{selectedStructure.name}</h3>
          <p className="mb-4">{selectedStructure.description}</p>
          <div className="relative mb-4 h-[600px] w-[900px]">
            {/* Passer nodes, edges, setNodes, et setEdges à StaticWorkflow */}
            <StaticWorkflow nodes={nodes} edges={edges} />
          </div>
          <button
            onClick={handleCloseModal}
            className="mt-4 rounded bg-gray-300 p-2"
          >
            Fermer
          </button>
        </LargeModal>
      )}
    </div>
  );
};

export default ProductionPage;
