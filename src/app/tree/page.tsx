'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Activity, AlertTriangle, Cloud, Code, Lock, Server, Settings, ChevronRight } from 'lucide-react'
import * as d3 from 'd3'

interface TreeNode extends d3.SimulationNodeDatum {
  id: string
  name: string
  children?: TreeNode[]
  _children?: TreeNode[]
  x?: number
  y?: number
  labelWidth?: number
  labelHeight?: number
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

const wrapText = (text: string, maxWidth: number) => {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = getTextWidth(currentLine + " " + word)
    if (width < maxWidth) {
      currentLine += " " + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}

const getTextWidth = (text: string) => {
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      context.font = '14px Arial'
      return context.measureText(text).width
    }
  }
  return 0
}

const TreeNode: React.FC<{ node: TreeNode; onNodeClick: (node: TreeNode) => void }> = ({ node, onNodeClick }) => {
  const IconComponent = getNodeIcon(node.name)
  const lines = wrapText(node.name, 150)
  const lineHeight = 20

  return (
    <g transform={`translate(${node.x},${node.y})`} onClick={() => onNodeClick(node)} style={{ cursor: 'pointer' }}>
      <circle r={15} fill="#FF6B6B" />
      <foreignObject width={20} height={20} x={-10} y={-10}>
        <div className="flex items-center justify-center w-full h-full">
          <IconComponent size={16} color="#1a202c" />
        </div>
      </foreignObject>
      {lines.map((line, index) => (
        <text key={index} fill="white" x={25} y={5 + index * lineHeight} style={{ fontSize: '14px' }}>
          {line}
        </text>
      ))}
      {node._children && (
        <g transform="translate(15, 15)">
          <circle r={10} fill="#4A5568" />
          <ChevronRight size={16} color="white" style={{ transform: 'translate(-8px, -8px)' }} />
        </g>
      )}
    </g>
  )
}

const LinkCurve: React.FC<{ link: d3.SimulationLinkDatum<TreeNode> }> = ({ link }) => {
  const source = link.source as TreeNode
  const target = link.target as TreeNode

  if (!source.x || !source.y || !target.x || !target.y) return null

  const dx = target.x - source.x
  const dy = target.y - source.y
  const dr = Math.sqrt(dx * dx + dy * dy)

  return (
    <path
      d={`M${source.x},${source.y}A${dr},${dr} 0 0,1 ${target.x},${target.y}`}
      fill="none"
      stroke="#FF6B6B"
      strokeWidth={2}
    />
  )
}

export default function Component() {
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const [links, setLinks] = useState<d3.SimulationLinkDatum<TreeNode>[]>([])
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(0.5)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const processTree = useCallback((node: TreeNode, depth: number = 0, parent: TreeNode | null = null) => {
    node.depth = depth
    node.parent = parent || undefined

    if (depth >= 2 && node.children) {
      node._children = node.children
      node.children = undefined
    }

    if (node.children) {
      node.children.forEach(child => processTree(child, depth + 1, node))
    }
  }, [])

  const flattenTree = useCallback((node: TreeNode, nodes: TreeNode[] = [], links: { source: string; target: string }[] = []) => {
    nodes.push(node)
    if (node.children) {
      node.children.forEach(child => {
        links.push({ source: node.id, target: child.id })
        flattenTree(child, nodes, links)
      })
    }
    return { nodes, links }
  }, [])

  const updateGraph = useCallback(() => {
    const { nodes: flatNodes, links: flatLinks } = flattenTree(treeData)
    
    flatNodes.forEach(node => {
      const lines = wrapText(node.name, 150)
      node.labelWidth = Math.max(...lines.map(line => getTextWidth(line))) + 30
      node.labelHeight = lines.length * 20 + 10
    })

    setNodes(flatNodes)
    setLinks(flatLinks)

    const simulation = d3.forceSimulation(flatNodes)
      .force("link", d3.forceLink(flatLinks).id((d: any) => d.id).distance(200))
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide().radius((d: TreeNode) => Math.max(d.labelWidth || 0, d.labelHeight || 0) / 2 + 30))
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.1))

    simulation.force("depth", (alpha: number) => {
      flatNodes.forEach(node => {
        if (node.depth !== undefined) {
          node.y = (node.y || 0) + (node.depth * 200 - (node.y || 0)) * alpha
        }
      })
    })

    simulation.on("tick", () => {
      setNodes([...flatNodes])
    })

    return () => simulation.stop()
  }, [flattenTree])

  useEffect(() => {
    processTree(treeData)
    updateGraph()
  }, [processTree, updateGraph])

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

  const handleNodeClick = useCallback((clickedNode: TreeNode) => {
    if (clickedNode._children) {
      clickedNode.children = clickedNode._children
      clickedNode._children = undefined
    } else if (clickedNode.children) {
      clickedNode._children = clickedNode.children
      clickedNode.children = undefined
    }
    updateGraph()
  }, [updateGraph])

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

  useEffect(() => {
    const svg = svgRef.current
    if (svg) {
      svg.addEventListener('wheel', handleWheel as any)
      return () => svg.removeEventListener('wheel', handleWheel as any)
    }
  }, [handleWheel])

  return (
    <div ref={containerRef} className="w-screen h-screen bg-gray-900 overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
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
          {links.map((link, index) => (
            <LinkCurve key={index} link={link} />
          ))}
          {nodes.map(node => (
            <TreeNode key={node.id} node={node} onNodeClick={handleNodeClick} />
          ))}
        </g>
      </svg>
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-2xl font-bold mb-2">The Tree of SRE</h1>
        <p>Explore the Site Reliability Engineering landscape</p>
      </div>
    </div>
  )
}