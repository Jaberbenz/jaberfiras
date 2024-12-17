"use client";

import React, { useState, useCallback } from "react";
import NodeLibrary from "../NodeLibrary";
import ReactFlowCanvas from "../ReactFlowCanva";
import Modal from "../Modal"; // Assurez-vous que le chemin est correct pour le composant Modal
import { Node, Edge, MarkerType, Position } from "reactflow";
import NodeContainer from "../NodeContainer";

type NodeData = {
  label: string | React.ReactNode;
  icon?: string;
  apcuEnabled?: boolean;
  opcacheEnabled?: boolean;
  mailFunctionEnabled?: boolean;
  smtp?: string;
  port?: number;
  nodes?: NodeData[];
};

type SavedStructure = {
  name: string;
  description: string;
  nodes: (Node<NodeData> & { position: { x: number; y: number } })[];
};

export default function WorkflowWithImageCardsLimited() {
  const [nodes, setNodes] = useState<Node<NodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [structureName, setStructureName] = useState("");
  const [structureDescription, setStructureDescription] = useState("");
  const [savedStructures, setSavedStructures] = useState<SavedStructure[]>([]);

  const onDragStart = (event: React.DragEvent, node: Node<NodeData>) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "move";
  };

  // Ouvrir la modal pour sauvegarder
  const handleOpenSaveModal = () => {
    setIsSaveModalOpen(true);
  };

  // Ouvrir la modal pour charger
  const handleOpenLoadModal = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("workflowStructure_"),
    );
    const loadedStructures: SavedStructure[] = keys.map((key) => {
      const structure = JSON.parse(localStorage.getItem(key) || "");
      return { name: key.replace("workflowStructure_", ""), ...structure };
    });
    setSavedStructures(loadedStructures);
    setIsLoadModalOpen(true);
  };

  // Fermer la modal
  const handleCloseModal = () => {
    setIsSaveModalOpen(false);
    setIsLoadModalOpen(false);
    setStructureName(""); // Réinitialiser le nom de la structure
    setStructureDescription(""); // Réinitialiser la description de la structure
  };

  // Sauvegarder la structure dans LocalStorage
  const handleSaveStructure = useCallback(() => {
    if (!structureName) return;

    const structure = nodes.map((node) => {
      const { data, position } = node;
      if (!data) return {};

      // Extraire les informations nécessaires pour chaque nœud, y compris la position
      return {
        id: node.id,
        label: typeof data.label === "string" ? data.label : "",
        position,
        nodes: data.nodes?.map((childNode) => ({
          label: childNode.label,
          icon: childNode.icon,
          apcuEnabled: childNode.apcuEnabled,
          opcacheEnabled: childNode.opcacheEnabled,
          mailFunctionEnabled: childNode.mailFunctionEnabled,
          smtp: childNode.smtp,
          port: childNode.port,
        })),
      };
    });

    // Sauvegarder la structure avec son nom et sa description
    const structureToSave = {
      description: structureDescription,
      nodes: structure,
    };

    // Sauvegarder la structure dans le LocalStorage avec le nom donné par l'utilisateur
    localStorage.setItem(
      `workflowStructure_${structureName}`,
      JSON.stringify(structureToSave),
    );

    console.log(
      `Structure "${structureName}" saved successfully to LocalStorage.`,
    );
    setIsSaveModalOpen(false);
    setStructureName(""); // Réinitialiser le champ de saisie
    setStructureDescription(""); // Réinitialiser le champ de description
  }, [nodes, structureName, structureDescription]);

  // Charger la structure à partir du LocalStorage
  const handleLoadStructure = useCallback(
    (selectedName: string) => {
      const savedStructure = localStorage.getItem(
        `workflowStructure_${selectedName}`,
      );
      if (savedStructure) {
        const parsedStructure: { description: string; nodes: NodeData[] } =
          JSON.parse(savedStructure);

        if (parsedStructure && parsedStructure.nodes.length > 0) {
          const loadedNodes: Node<NodeData>[] = [];
          const loadedEdges: Edge[] = [];

          parsedStructure.nodes.forEach((data, index) => {
            const position = data.position || { x: index * 300, y: 0 }; // Utilisez la position sauvegardée ou définissez une position par défaut

            const parentNode: Node<NodeData> = {
              id: data.id || `node_${index}`, // Utilisez l'ID sauvegardé ou un ID par défaut
              position,
              data: {
                label: (
                  <NodeContainer
                    nodes={data.nodes || []}
                    onDeleteNode={(nodeIndex) =>
                      handleDeleteNestedNode(`node_${index}`, nodeIndex)
                    }
                    onDeleteParent={() => handleDeleteNode(`node_${index}`)}
                  />
                ),
                nodes: data.nodes,
              },
              type: "default",
              style: {
                backgroundColor: "#1E293B",
                border: "2px solid #444",
                color: "#ffffff",
                padding: "10px",
                borderRadius: "12px",
              },
              sourcePosition: Position.Right,
              targetPosition: Position.Left,
            };

            loadedNodes.push(parentNode);

            if (index > 0) {
              loadedEdges.push({
                id: `edge_node_${index - 1}_node_${index}`,
                source: `node_${index - 1}`,
                target: `node_${index}`,
                markerEnd: { type: MarkerType.Arrow },
              });
            }
          });

          setNodes(loadedNodes);
          setEdges(loadedEdges);

          console.log(
            `Structure "${selectedName}" loaded successfully from LocalStorage.`,
          );
          setIsLoadModalOpen(false);
        } else {
          console.error("No valid structure found in LocalStorage.");
        }
      } else {
        console.error("No structure found in LocalStorage.");
      }
    },
    [setNodes, setEdges],
  );

  // Supprimer une structure spécifique du LocalStorage
  const handleDeleteStructure = useCallback((name: string) => {
    localStorage.removeItem(`workflowStructure_${name}`);
    setSavedStructures((prevStructures) =>
      prevStructures.filter((structure) => structure.name !== name),
    );
    console.log(`Structure "${name}" deleted successfully from LocalStorage.`);
  }, []);

  return (
    <div className="p-4">
      <button
        onClick={handleOpenSaveModal}
        className="mb-4 rounded bg-blue-500 p-2 text-white"
      >
        Save Structure
      </button>
      <button
        onClick={handleOpenLoadModal}
        className="mb-4 ml-2 rounded bg-green-500 p-2 text-white"
      >
        Load Structure
      </button>

      {/* Modal pour Sauvegarder la Structure */}
      {isSaveModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h3 className="mb-4 text-lg font-bold">Save Structure</h3>
          <input
            type="text"
            placeholder="Enter structure name"
            value={structureName}
            onChange={(e) => setStructureName(e.target.value)}
            className="mb-4 w-full border bg-gray-700 p-2 text-white"
          />
          <textarea
            placeholder="Enter structure description"
            value={structureDescription}
            onChange={(e) => setStructureDescription(e.target.value)}
            className="mb-4 w-full border bg-gray-700 p-2 text-white"
          />
          <button
            onClick={handleSaveStructure}
            className="mr-2 rounded bg-blue-500 p-2 text-white"
          >
            Save
          </button>
          <button
            onClick={handleCloseModal}
            className="rounded bg-gray-300 p-2"
          >
            Cancel
          </button>
        </Modal>
      )}

      {/* Modal pour Charger la Structure */}
      {isLoadModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h3 className="mb-4 text-lg font-bold">Load Structure</h3>
          {savedStructures.length === 0 ? (
            <p>No saved structures available.</p>
          ) : (
            <ul>
              {savedStructures.map((structure) => (
                <li key={structure.name} className="mb-2 flex items-center">
                  <button
                    onClick={() => handleLoadStructure(structure.name)}
                    className="mr-2 flex-grow rounded bg-green-500 p-2 text-white"
                  >
                    {structure.name}
                  </button>
                  <button
                    onClick={() => handleDeleteStructure(structure.name)}
                    className="ml-2 rounded bg-red-500 p-2 text-white"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleCloseModal}
            className="mt-4 rounded bg-gray-300 p-2"
          >
            Close
          </button>
        </Modal>
      )}

      <div className="relative mb-4 h-[600px] w-[1000px]">
        <ReactFlowCanvas
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </div>
      <div className="mb-4">
        <NodeLibrary onDragStart={onDragStart} />
      </div>
    </div>
  );
}
