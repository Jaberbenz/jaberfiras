"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import NginxIcon from "@/assets/nginx.svg";
import ApacheIcon from "@/assets/apache.svg";
import MariaDBIcon from "@/assets/mariadb.svg";
import PhpIcon from "@/assets/php.svg";

type Node = {
  id: string;
  label: string;
  icon: string;
  apcuEnabled: boolean;
  opcacheEnabled: boolean;
  mailFunctionEnabled: boolean;
  smtp: string;
  port: number;
};

type NodeLibraryProps = {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, node: Node) => void;
};

const availableNodes: Node[] = [
  {
    id: "nginx",
    label: "Nginx - v1.1",
    icon: "nginx.svg",
    apcuEnabled: false,
    opcacheEnabled: false,
    mailFunctionEnabled: false,
    smtp: "localhost",
    port: 25,
  },
  {
    id: "apache",
    label: "Apache - v1.1",
    icon: "apache.svg",
    apcuEnabled: false,
    opcacheEnabled: false,
    mailFunctionEnabled: false,
    smtp: "localhost",
    port: 25,
  },
  {
    id: "mariadb",
    label: "MariaDB - v1.1",
    icon: "mariadb.svg",
    apcuEnabled: false,
    opcacheEnabled: false,
    mailFunctionEnabled: false,
    smtp: "localhost",
    port: 25,
  },
  {
    id: "php",
    label: "PHP - v1.1",
    icon: "php.svg",
    apcuEnabled: true,
    opcacheEnabled: true,
    mailFunctionEnabled: true,
    smtp: "localhost",
    port: 25,
  },
];

const NodeLibrary: React.FC<NodeLibraryProps> = ({ onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>(availableNodes);

  const filteredNodes = nodes.filter((node) =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (node: Node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

  const toggleFeature = (feature: keyof Node) => {
    if (selectedNode) {
      setSelectedNode({ ...selectedNode, [feature]: !selectedNode[feature] });
    }
  };

  const saveChanges = () => {
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id ? selectedNode : node
        )
      );
      closeModal();
    }
  };

  return (
    <div className="node-library rounded-md bg-gray-900 p-4">
      <input
        type="text"
        className="search-bar mb-4 w-full rounded-md p-2 text-black"
        placeholder="Rechercher des nœuds..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="node-grid grid grid-cols-3 gap-4">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            draggable
            onDragStart={(e) => {
              // Transfert des données du nœud complet
              e.dataTransfer.setData(
                "application/reactflow",
                JSON.stringify(node)
              );
              e.dataTransfer.effectAllowed = "move";
            }}
            className="node-card relative flex cursor-move flex-col items-center justify-center rounded-md bg-gray-800 p-4 text-white"
          >
            <img
              src={`/${node.icon}`}
              alt={node.label}
              className="mb-2 h-12 w-12 rounded-md"
            />
            <span>{node.label}</span>
            <button
              onClick={() => openModal(node)}
              className="absolute right-2 top-2 text-white"
            >
              …
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && selectedNode && (
        <Modal onClose={closeModal}>
          <div className="modal-content p-4">
            <h2 className="mb-4 text-center text-2xl font-bold">
              Modifier {selectedNode.label}
            </h2>
            <div className="mb-4 flex items-center justify-between">
              <label className="mb-2 block">Enable APCu</label>
              <button
                onClick={() => toggleFeature("apcuEnabled")}
                className={`h-6 w-12 rounded-full ${
                  selectedNode.apcuEnabled ? "bg-purple-600" : "bg-gray-500"
                }`}
              >
                <div
                  className={`h-6 w-6 transform rounded-full bg-white transition-transform ${
                    selectedNode.apcuEnabled ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="mb-2 block">Enable OPCache</label>
              <button
                onClick={() => toggleFeature("opcacheEnabled")}
                className={`h-6 w-12 rounded-full ${
                  selectedNode.opcacheEnabled ? "bg-purple-600" : "bg-gray-500"
                }`}
              >
                <div
                  className={`h-6 w-6 transform rounded-full bg-white transition-transform ${
                    selectedNode.opcacheEnabled ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="mb-2 block">Enable Mail Function</label>
              <button
                onClick={() => toggleFeature("mailFunctionEnabled")}
                className={`h-6 w-12 rounded-full ${
                  selectedNode.mailFunctionEnabled
                    ? "bg-purple-600"
                    : "bg-gray-500"
                }`}
              >
                <div
                  className={`h-6 w-6 transform rounded-full bg-white transition-transform ${
                    selectedNode.mailFunctionEnabled ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block">SMTP</label>
              <input
                type="text"
                className="w-full rounded-md p-2 text-black"
                value={selectedNode.smtp}
                onChange={(e) =>
                  setSelectedNode({ ...selectedNode, smtp: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block">Port</label>
              <input
                type="number"
                className="w-full rounded-md p-2 text-black"
                value={selectedNode.port}
                onChange={(e) =>
                  setSelectedNode({
                    ...selectedNode,
                    port: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white"
              >
                Annuler
              </button>
              <button
                onClick={saveChanges}
                className="rounded-md bg-purple-600 px-4 py-2 text-white"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NodeLibrary;
