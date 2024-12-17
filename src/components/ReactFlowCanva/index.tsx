"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  addEdge,
  ReactFlowInstance,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  XYPosition,
  Position,
  NodeChange,
  EdgeChange,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import NodeContainer from "../NodeContainer";

type ReactFlowCanvasProps = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

const ReactFlowCanvas: React.FC<ReactFlowCanvasProps> = ({
  nodes,
  setNodes,
  edges,
  setEdges,
}) => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, eds),
      );
    },
    [setEdges],
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const nodeDataString = event.dataTransfer.getData(
        "application/reactflow",
      );

      if (!nodeDataString) {
        return;
      }

      const nodeData = JSON.parse(nodeDataString);
      const position: XYPosition = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }) || { x: 0, y: 0 };

      const targetNode = nodes.find((node) => {
        const nodeX = node.position.x;
        const nodeY = node.position.y;
        const nodeWidth = node.width || 200;
        const nodeHeight = node.height || 250;

        return (
          position.x >= nodeX &&
          position.x <= nodeX + nodeWidth &&
          position.y >= nodeY &&
          position.y <= nodeY + nodeHeight
        );
      });

      if (targetNode) {
        // Insertion dans un nœud parent existant
        const existingNodes = targetNode.data?.nodes || [];
        const updatedNode = {
          ...targetNode,
          data: {
            ...targetNode.data,
            nodes: [
              ...existingNodes,
              {
                label: nodeData.label,
                icon: nodeData.icon,
                apcuEnabled: nodeData.apcuEnabled,
                opcacheEnabled: nodeData.opcacheEnabled,
                mailFunctionEnabled: nodeData.mailFunctionEnabled,
                smtp: nodeData.smtp,
                port: nodeData.port,
              },
            ],
            label: (
              <NodeContainer
                nodes={[
                  ...existingNodes,
                  {
                    label: nodeData.label,
                    icon: nodeData.icon,
                    apcuEnabled: nodeData.apcuEnabled,
                    opcacheEnabled: nodeData.opcacheEnabled,
                    mailFunctionEnabled: nodeData.mailFunctionEnabled,
                    smtp: nodeData.smtp,
                    port: nodeData.port,
                  },
                ]}
                onDeleteNode={(nodeIndex) =>
                  handleDeleteNestedNode(targetNode.id, nodeIndex)
                }
                onDeleteParent={() => handleDeleteNode(targetNode.id)}
              />
            ),
          },
        };
        setNodes((nds) =>
          nds.map((node) => (node.id === updatedNode.id ? updatedNode : node)),
        );
      } else {
        // Création d'un nouveau nœud
        const newNodeId = `node_${nodes.length}`;
        const newNode: Node = {
          id: newNodeId,
          type: "default",
          position,
          data: {
            ...nodeData,
            nodes: [
              {
                label: nodeData.label,
                icon: nodeData.icon,
                apcuEnabled: nodeData.apcuEnabled,
                opcacheEnabled: nodeData.opcacheEnabled,
                mailFunctionEnabled: nodeData.mailFunctionEnabled,
                smtp: nodeData.smtp,
                port: nodeData.port,
              },
            ],
            label: (
              <NodeContainer
                nodes={[
                  {
                    label: nodeData.label,
                    icon: nodeData.icon,
                    apcuEnabled: nodeData.apcuEnabled,
                    opcacheEnabled: nodeData.opcacheEnabled,
                    mailFunctionEnabled: nodeData.mailFunctionEnabled,
                    smtp: nodeData.smtp,
                    port: nodeData.port,
                  },
                ]}
                onDeleteNode={(nodeIndex) =>
                  handleDeleteNestedNode(newNodeId, nodeIndex)
                }
                onDeleteParent={() => handleDeleteNode(newNodeId)}
              />
            ),
          },
          width: 200,
          height: 250,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          style: {
            backgroundColor: "#1E293B",
            border: "2px solid #444",
            color: "#ffffff",
            padding: "10px",
            borderRadius: "12px",
          },
        };

        setNodes((nds) => nds.concat(newNode));

        // Ajouter une connexion avec le dernier nœud ajouté
        if (nodes.length > 0) {
          const lastNodeId = nodes[nodes.length - 1].id;
          const newEdge: Edge = {
            id: `edge_${lastNodeId}_${newNodeId}`,
            source: lastNodeId,
            target: newNodeId,
            markerEnd: { type: MarkerType.Arrow },
          };
          setEdges((eds) => [...eds, newEdge]);
        }
      }
    },
    [reactFlowInstance, nodes, setNodes, edges],
  );

  const handleDeleteImage = useCallback(
    (nodeId: string, imageIndex: number) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            const updatedImages = [...(node.data.images || [])];
            updatedImages.splice(imageIndex, 1);
            return {
              ...node,
              data: {
                ...node.data,
                label: (
                  <NodeContainer
                    label={node.data.label}
                    images={updatedImages}
                    apcuEnabled={node.data.apcuEnabled}
                    opcacheEnabled={node.data.opcacheEnabled}
                    mailFunctionEnabled={node.data.mailFunctionEnabled}
                    smtp={node.data.smtp}
                    port={node.data.port}
                    onDeleteImage={(index) => handleDeleteImage(node.id, index)}
                    onDeleteNode={() => handleDeleteNode(node.id)}
                    onDeleteParent={() => handleDeleteNode(node.id)}
                  />
                ),
                images: updatedImages,
              },
            };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  // Handle deleting a nested node instead of deleting the entire container node.
  const handleDeleteNestedNode = useCallback(
    (parentId: string, nodeIndex: number) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === parentId) {
            const updatedNodes = [...(node.data.nodes || [])];
            updatedNodes.splice(nodeIndex, 1);

            return {
              ...node,
              data: {
                ...node.data,
                nodes: updatedNodes,
                label: (
                  <NodeContainer
                    nodes={updatedNodes}
                    onDeleteNode={(index) =>
                      handleDeleteNestedNode(node.id, index)
                    }
                    onDeleteParent={() => handleDeleteNode(node.id)}
                  />
                ),
              },
            };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      );
    },
    [setNodes, setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(changes: NodeChange[]) =>
        setNodes((nds) => applyNodeChanges(changes, nds))
      }
      onEdgesChange={(changes: EdgeChange[]) =>
        setEdges((eds) => applyEdgeChanges(changes, eds))
      }
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      fitView
      className="h-full w-full"
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default ReactFlowCanvas;
