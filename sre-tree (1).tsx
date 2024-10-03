"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Activity, AlertTriangle, BarChart, Box, Cpu, Database, GitBranch, GitMerge, LineChart, Monitor, Server, Settings, Zap, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

interface TreeNode {
  id: string
  label: string
  icon: React.ReactNode
  children?: TreeNode[]
}

const treeData: TreeNode = {
  id: 'sre',
  label: 'SRE',
  icon: <Settings />,
  children: [
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: <Monitor />,
      children: [
        { id: 'metrics', label: 'Metrics Collection', icon: <BarChart /> },
        { id: 'alerting', label: 'Alerting', icon: <AlertTriangle /> },
        { id: 'logging', label: 'Logging', icon: <Database /> },
      ],
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: <Zap />,
      children: [
        { id: 'ci-cd', label: 'CI/CD', icon: <GitBranch /> },
        { id: 'infrastructure-as-code', label: 'Infrastructure as Code', icon: <Box /> },
      ],
    },
    {
      id: 'reliability',
      label: 'Reliability',
      icon: <Activity />,
      children: [
        { id: 'fault-tolerance', label: 'Fault Tolerance', icon: <GitMerge /> },
        { id: 'disaster-recovery', label: 'Disaster Recovery', icon: <Server /> },
        { id: 'scalability', label: 'Scalability', icon: <Cpu /> },
      ],
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: <LineChart />,
      children: [
        { id: 'latency-optimization', label: 'Latency Optimization', icon: <Zap /> },
        { id: 'capacity-planning', label: 'Capacity Planning', icon: <BarChart /> },
      ],
    },
  ],
}

const TreeNodeLabels: React.FC<{ node: TreeNode; x: number; y: number }> = ({ node, x, y }) => {
  const verticalLineLength = 60
  const labelOffset = verticalLineLength / 2 + 12 // Half of verticalLineLength plus circleRadius

  return (
    <g>
      <foreignObject x={x - 60} y={y + labelOffset} width={120} height={20}>
        <div className={`${roboto.className} bg-[#0A0A0A] px-1 py-1 rounded text-center flex items-center justify-center h-full`}>
          <span className="text-xs text-[#E2E8F0] leading-none uppercase font-bold">{node.label}</span>
        </div>
      </foreignObject>
      {node.children?.map((child, index) => {
        const childX = x + (index - (node.children.length - 1) / 2) * 200
        const childY = y + 180
        return (
          <TreeNodeLabels
            key={child.id}
            node={child}
            x={childX}
            y={childY}
          />
        )
      })}
    </g>
  )
}

export default function SRETree() {
  const [hoveredNode, setHoveredNode] = useState('')
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const TreeNode: React.FC<{ node: TreeNode; x: number; y: number; onHover: (id: string) => void; isRoot?: boolean; isLeaf?: boolean }> = ({
    node,
    x,
    y,
    onHover,
    isRoot = false,
    isLeaf = false,
  }) => {
    const verticalLineLength = 60
    const childrenSpacing = 200
    const levelSpacing = 180
    const circleRadius = 12

    return (
      <g>
        {!isRoot && (
          <line
            x1={x}
            y1={y - verticalLineLength}
            x2={x}
            y2={y - circleRadius}
            stroke="#D97706"
            strokeWidth={2}
          />
        )}
        <circle
          cx={x}
          cy={y}
          r={circleRadius}
          fill="none"
          stroke="#D97706"
          strokeWidth={2}
          onMouseEnter={() => onHover(node.id)}
          onMouseLeave={() => onHover('')}
        />
        <foreignObject x={x - 8} y={y - 8} width={16} height={16}>
          <div className="flex items-center justify-center w-full h-full text-white">
            {node.icon}
          </div>
        </foreignObject>
        {!isLeaf && (
          <line
            x1={x}
            y1={y + circleRadius}
            x2={x}
            y2={y + verticalLineLength}
            stroke="#D97706"
            strokeWidth={2}
          />
        )}
        {node.children?.map((child, index) => {
          const childX = x + (index - (node.children.length - 1) / 2) * childrenSpacing
          const childY = y + levelSpacing
          const isChildLeaf = !child.children || child.children.length === 0
          return (
            <React.Fragment key={child.id}>
              <line
                x1={x}
                y1={y + verticalLineLength}
                x2={childX}
                y2={childY - verticalLineLength}
                stroke="#D97706"
                strokeWidth={2}
              />
              <TreeNode
                node={child}
                x={childX}
                y={childY}
                onHover={onHover}
                isLeaf={isChildLeaf}
              />
            </React.Fragment>
          )
        })}
      </g>
    )
  }

  return (
    <div ref={containerRef} className={`w-screen h-screen bg-[#0A0A0A] relative overflow-hidden ${roboto.className}`}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
        pinch={{ step: 5 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
              <button onClick={() => zoomIn()} className="bg-[#1C1C1C] text-white p-2 rounded hover:bg-[#2C2C2C]" aria-label="Zoom In">
                <ZoomIn size={24} />
              </button>
              <button onClick={() => zoomOut()} className="bg-[#1C1C1C] text-white p-2 rounded hover:bg-[#2C2C2C]" aria-label="Zoom Out">
                <ZoomOut size={24} />
              </button>
              <button onClick={() => resetTransform()} className="bg-[#1C1C1C] text-white p-2 rounded hover:bg-[#2C2C2C]" aria-label="Reset Zoom">
                <RotateCcw size={24} />
              </button>
            </div>
            <TransformComponent wrapperClass="!w-full !h-full">
              <svg width={dimensions.width} height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
                <rect width="100%" height="100%" fill="#0A0A0A" />
                <g transform={`translate(${dimensions.width / 2}, 100)`}>
                  <TreeNode node={treeData} x={0} y={0} onHover={setHoveredNode} isRoot={true} />
                  <TreeNodeLabels node={treeData} x={0} y={0} />
                </g>
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-4 bg-[#1C1C1C] text-[#E2E8F0] px-4 py-2 rounded"
        >
          Selected: {hoveredNode}
        </motion.div>
      )}
    </div>
  )
}