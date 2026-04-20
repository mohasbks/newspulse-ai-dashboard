'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AnalysisResponse } from '@/lib/groq';

interface Props {
  mapData: AnalysisResponse['mapData'];
}

export default function NewsMap({ mapData }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    // Convert Groq mapData to React Flow Format
    const newNodes: Node[] = mapData.nodes.map((n, i) => ({
      id: n.id,
      position: { x: (i % 3) * 200, y: Math.floor(i / 3) * 150 }, // simple grid layout
      data: { label: n.label },
      style: {
        background: n.group === 'company' ? '#1e293b' : n.group === 'person' ? '#334155' : '#0f172a',
        color: '#f8fafc',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '12px',
        fontWeight: 'bold',
      }
    }));

    const newEdges: Edge[] = mapData.edges.map((e, index) => ({
      id: `e-${e.source}-${e.target}-${index}`,
      source: e.source,
      target: e.target,
      label: e.label,
      animated: true,
      style: { stroke: '#475569' },
      labelStyle: { fill: '#94a3b8', fontWeight: 600, fontSize: 10 },
      labelBgStyle: { fill: '#0f172a' }
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [mapData, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-[500px] border border-border/50 rounded-xl overflow-hidden bg-surface">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls showInteractive={false} className="bg-surface border-border !fill-tx-muted" />
        <Background gap={16} size={1} color="#334155" />
      </ReactFlow>
    </div>
  );
}
