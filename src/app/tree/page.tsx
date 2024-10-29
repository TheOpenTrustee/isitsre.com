'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Activity, AlertTriangle, Cloud, Code, Lock, Server, Settings, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'
import * as d3 from 'd3'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
  _children?: TreeNode[]
  x?: number
  y?: number
  depth?: number
  parent?: TreeNode
}

const treeData: TreeNode = {
  id: "root",
  name: "SRE",
  children: [
    {
      id: "observability",
      name: "Observability",
      children: [
        {
          id: "telemetry",
          name: "Telemetry",
          children: [
            { id: "data-engineering", name: "Data Engineering" },
            { id: "metrics-collection", name: "Metrics Collection" },
            { id: "distributed-tracing", name: "Distributed Tracing" }
          ]
        },
        {
          id: "logging",
          name: "Logging",
          children: [
            { id: "log-aggregation", name: "Log Aggregation" },
            { id: "log-analysis", name: "Log Analysis" },
            { id: "elk-stack", name: "ELK Stack" }
          ]
        },
        {
          id: "monitoring",
          name: "Monitoring",
          children: [
            { id: "alerting", name: "Alerting" },
            { id: "slis", name: "Service Level Indicators (SLIs)" },
            { id: "slos", name: "Service Level Objectives (SLOs)" }
          ]
        }
      ]
    },
    {
      id: "incident-management",
      name: "Incident Management",
      children: [
        {
          id: "postmortems",
          name: "Postmortems",
          children: [
            { id: "root-cause-analysis", name: "Root Cause Analysis" },
            { id: "blameless-culture", name: "Blameless Culture" }
          ]
        },
        {
          id: "on-call-management",
          name: "On-call Management",
          children: [
            { id: "rotations", name: "Rotations" },
            { id: "escalation-policies", name: "Escalation Policies" }
          ]
        }
      ]
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      children: [
        {
          id: "cloud-providers",
          name: "Cloud Providers",
          children: [
            { id: "aws", name: "AWS" },
            { id: "gcp", name: "GCP" },
            { id: "azure", name: "Azure" }
          ]
        },
        {
          id: "containerization",
          name: "Containerization",
          children: [
            { id: "docker", name: "Docker" },
            { id: "kubernetes", name: "Kubernetes" }
          ]
        },
        {
          id: "networking",
          name: "Networking",
          children: [
            { id: "load-balancers", name: "Load Balancers" },
            { id: "cdns", name: "CDNs" },
            { id: "dns-management", name: "DNS Management" }
          ]
        }
      ]
    },
    {
      id: "automation",
      name: "Automation",
      children: [
        {
          id: "infrastructure-as-code",
          name: "Infrastructure as Code",
          children: [
            { id: "terraform", name: "Terraform" },
            { id: "ansible", name: "Ansible" }
          ]
        },
        {
          id: "ci-cd",
          name: "Continuous Integration/Continuous Deployment (CI/CD)",
          children: [
            { id: "jenkins", name: "Jenkins" },
            { id: "gitlab-ci", name: "GitLab CI" }
          ]
        }
      ]
    },
    {
      id: "security",
      name: "Security",
      children: [
        {
          id: "incident-response",
          name: "Incident Response",
          children: [
            { id: "threat-modeling", name: "Threat Modeling" },
            { id: "vulnerability-management", name: "Vulnerability Management" }
          ]
        },
        {
          id: "compliance",
          name: "Compliance",
          children: [
            { id: "gdpr", name: "GDPR" },
            { id: "soc2", name: "SOC 2" }
          ]
        }
      ]
    }
  ]
}

const getNodeIcon = (nodeName: string) => {
  switch (nodeName) {
    case 'SRE':
      return Settings
    case 'Observability':
      return Activity
    case 'Incident Management':
      return AlertTriangle
    case 'Infrastructure':
      return Server
    case 'Automation':
      return Code
    case 'Security':
      return Lock
    default:
      return Cloud
  }
}

const TreeNode: React.FC<{ node: d3.HierarchyPointNode<TreeNode>; onNodeClick: (node: d3.HierarchyPointNode<TreeNode>) => void }> = ({ node, onNodeClick }) => {
  const IconComponent = getNodeIcon(node.data.name)
  const isRoot = node.depth === 0
  const hasHiddenChildren = node.data._children && node.data._children.length > 0
  const isClickable = hasHiddenChildren

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={() => isClickable && onNodeClick(node)}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
    >
      <circle r={isRoot ? 30 : 20} fill="#FF6B6B" />
      <foreignObject width={isRoot ? 50 : 30} height={isRoot ? 50 : 30} x={isRoot ? -25 : -15} y={isRoot ? -25 : -15}>
        <div className="flex items-center justify-center w-full h-full">
          <IconComponent size={isRoot ? 30 : 20} color="#1a202c" />
        </div>
      </foreignObject>
      <text
        fill="white"
        x={isRoot ? 40 : 30}
        y={0}
        dy=".35em"
        style={{ fontSize: isRoot ? '18px' : '14px', fontWeight: 'bold' }}
        textAnchor="start"
        dominantBaseline="middle"
      >
        {node.data.name}
      </text>
    </g>
  )
}

const LinkLine: React.FC<{ link: d3.HierarchyPointLink<TreeNode> }> = ({ link }) => {
  const sourceX = link.source.x
  const sourceY = link.source.y
  const targetX = link.target.x
  const targetY = link.target.y

  return (
    <path
      d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
      fill="none"
      stroke="#FF6B6B"
      strokeWidth={2}
    />
  )
}

export default function Component() {
  const [root, setRoot] = useState<d3.HierarchyPointNode<TreeNode> | null>(null)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const updateTree = useCallback(() => {
    const hierarchy = d3.hierarchy(treeData)
    
    const treeLayout = d3.tree<TreeNode>()
      .nodeSize([250, 150])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)

    const newRoot = treeLayout(hierarchy)

    // Adjust positions to prevent label overlaps
    const nodeRadius = 20
    const labelPadding = 10
    const minSeparation = 30

    newRoot.each(node => {
      if (node.parent) {
        const siblings = node.parent.children || []
        const index = siblings.indexOf(node)
        if (index > 0) {
          const prevSibling = siblings[index - 1]
          const minY = (prevSibling.y || 0) + nodeRadius * 2 + labelPadding + minSeparation
          if (node.y < minY) {
            node.y = minY
          }
        }
      }
      
      // Add some randomness to x position
      node.x += (Math.random() - 0.5) * 50
    })

    setRoot(newRoot)
  }, [])

  useEffect(() => {
    updateTree()
  }, [updateTree])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleNodeClick = useCallback((clickedNode: d3.HierarchyPointNode<TreeNode>) => {
    if (clickedNode.children) {
      clickedNode.data._children = clickedNode.children
      clickedNode.children = null
    } else if (clickedNode.data._children) {
      clickedNode.children = clickedNode.data._children
      clickedNode.data._children = undefined
    }
    updateTree()
  }, [updateTree])

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault()
    const scaleChange = event.deltaY * -0.001
    setScale(prevScale => Math.max(0.1, Math.min(2, prevScale + scaleChange)))
  }, [])

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    setDragging(true)
    setDragStart({ x: event.clientX, y: event.clientY })
  }, [])

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (dragging) {
      const dx = event.clientX - dragStart.x
      const dy = event.clientY - dragStart.y
      setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }))
      setDragStart({ x: event.clientX, y: event.clientY })
    }
  }, [dragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setDragging(false)
  }, [])

  const handleZoomIn = useCallback(() => {
    setScale(prevScale => Math.min(2, prevScale + 0.1))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale(prevScale => Math.max(0.1, prevScale - 0.1))
  }, [])

  const handleReset = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (svg) {
      svg.addEventListener('wheel', handleWheel as any)
      return () => svg.removeEventListener('wheel', handleWheel as any)
    }
  }, [handleWheel])

  if (!root) return null

  return (
    <div ref={containerRef} className="flex flex-1 flex w-full h-full bg-gray-900 overflow-hidden relative">
      <svg
        ref={svgRef}
        style={{flex: "1 0 auto", width: "auto", height: "auto"}}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2D3748" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#2D3748" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <g transform={`translate(${translate.x + dimensions.width / 2},${translate.y + dimensions.height / 2}) scale(${scale})`}>
          {root.links().map((link, index) => (
            <LinkLine key={`link-${index}`} link={link} />
          ))}
          {root.descendants().map((node, index) => (
            <TreeNode key={`node-${index}`} node={node} onNodeClick={handleNodeClick} />
          ))}
        </g>
      </svg>
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-2xl font-bold mb-2">The Tree of SRE</h1>
        <p>Explore the Site Reliability Engineering landscape</p>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button onClick={handleZoomIn} className="bg-blue-500 text-white p-2 rounded">
          <ZoomIn size={24} />
        </button>
        <button onClick={handleZoomOut} className="bg-blue-500 text-white p-2 rounded">
          <ZoomOut size={24} />
        </button>
        <button onClick={handleReset} className="bg-blue-500 text-white p-2 rounded">
          <RefreshCw size={24} />
        </button>
      </div>
    </div>
  )
}