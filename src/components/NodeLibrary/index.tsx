"use client";

import React, { useState } from "react";
import Modal from "../Modal";

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

const NodeLibrary: React.FC = () => {
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
    <div className="node-library rounded-md bg-light-background dark:bg-dark-background p-4">
      {/* Barre de recherche */}
      <input
        type="text"
        className="mb-4 w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-dark-card dark:text-gray-100"
        placeholder="Rechercher des nœuds..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Grille des nodes */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "application/reactflow",
                JSON.stringify(node)
              );
              e.dataTransfer.effectAllowed = "move";
            }}
            className="relative flex flex-col items-center justify-center rounded-lg bg-light-card p-4 shadow-lg transition hover:scale-105 dark:bg-dark-card"
          >
            <img
              src={`/${node.icon}`}
              alt={node.label}
              className="mb-2 h-12 w-12 rounded-md"
            />
            <span className="text-sm font-semibold text-light-text dark:text-dark-text">
              {node.label}
            </span>
            <button
              onClick={() => openModal(node)}
              className="absolute right-2 top-2 rounded-full bg-violet-600 p-2 text-white"
            >
              …
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedNode && (
        <Modal onClose={closeModal}>
          <div className="rounded-lg bg-light-card p-6 shadow-lg dark:bg-dark-card">
            <h2 className="mb-4 text-center text-2xl font-bold text-light-text dark:text-dark-text">
              Modifier {selectedNode.label}
            </h2>
            {/* Toggle Options */}
            <div className="space-y-4">
              {[
                { name: "Enable APCu", feature: "apcuEnabled" },
                { name: "Enable OPCache", feature: "opcacheEnabled" },
                {
                  name: "Enable Mail Function",
                  feature: "mailFunctionEnabled",
                },
              ].map((item) => (
                <div
                  key={item.feature}
                  className="flex items-center justify-between"
                >
                  <label className="text-sm text-light-text dark:text-dark-text">
                    {item.name}
                  </label>
                  <button
                    onClick={() => toggleFeature(item.feature as keyof Node)}
                    className={`h-6 w-12 rounded-full ${
                      selectedNode[item.feature as keyof Node]
                        ? "bg-violet-600"
                        : "bg-gray-500"
                    }`}
                  >
                    <div
                      className={`h-6 w-6 transform rounded-full bg-white transition ${
                        selectedNode[item.feature as keyof Node]
                          ? "translate-x-6"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
              {/* SMTP Input */}
              <div>
                <label className="block text-sm text-light-text dark:text-dark-text">
                  SMTP
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-dark-background dark:text-gray-100"
                  value={selectedNode.smtp}
                  onChange={(e) =>
                    setSelectedNode({ ...selectedNode, smtp: e.target.value })
                  }
                />
              </div>
              {/* Port Input */}
              <div>
                <label className="block text-sm text-light-text dark:text-dark-text">
                  Port
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-dark-background dark:text-gray-100"
                  value={selectedNode.port}
                  onChange={(e) =>
                    setSelectedNode({
                      ...selectedNode,
                      port: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            {/* Boutons */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="rounded-md bg-gray-500 px-4 py-2 text-white"
              >
                Annuler
              </button>
              <button
                onClick={saveChanges}
                className="rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
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
