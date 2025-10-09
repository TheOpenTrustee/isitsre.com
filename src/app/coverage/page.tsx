'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Clock, Globe, AlertTriangle, CheckCircle2, Edit2, Check, ArrowRightLeft } from 'lucide-react'

interface TimezoneEntry {
  id: string
  offset: number | null
  startHour: number
  endHour: number
  name: string
  inputMode: 'offset' | 'timezone'
  timezoneString: string
}

// Common timezone mappings to UTC offset
const timezoneMap: Record<string, number> = {
  'PST': -8, 'PDT': -7, 'Pacific': -8,
  'MST': -7, 'MDT': -6, 'Mountain': -7,
  'CST': -6, 'CDT': -5, 'Central': -6,
  'EST': -5, 'EDT': -4, 'Eastern': -5,
  'GMT': 0, 'UTC': 0, 'London': 0,
  'CET': 1, 'CEST': 2, 'Paris': 1, 'Berlin': 1,
  'EET': 2, 'EEST': 3,
  'MSK': 3, 'Moscow': 3,
  'IST': 5.5, 'India': 5.5, 'Kolkata': 5.5,
  'CST_China': 8, 'China': 8, 'Beijing': 8, 'Shanghai': 8, 'HKT': 8, 'Hong Kong': 8,
  'JST': 9, 'Japan': 9, 'Tokyo': 9,
  'AEST': 10, 'AEDT': 11, 'Sydney': 10, 'Australia': 10,
  'NZST': 12, 'NZDT': 13, 'Auckland': 12, 'New Zealand': 12,
}

// Function to parse timezone input
const parseTimezoneInput = (input: string): number | null => {
  const trimmed = input.trim()
  
  // Check if it's a direct offset like +5, -7, etc.
  const offsetMatch = trimmed.match(/^([+-]?)(\d+(?:\.\d+)?)$/)
  if (offsetMatch) {
    const sign = offsetMatch[1] === '-' ? -1 : 1
    return sign * parseFloat(offsetMatch[2])
  }
  
  // Check if it's in our timezone map
  const normalized = trimmed.replace(/[_\s]/g, ' ').toLowerCase()
  for (const [key, offset] of Object.entries(timezoneMap)) {
    if (key.toLowerCase() === normalized || key.replace('_', ' ').toLowerCase() === normalized) {
      return offset
    }
  }
  
  return null
}

export default function CoverageVisualizer() {
  const [timezones, setTimezones] = useState<TimezoneEntry[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const addTimezone = () => {
    const newId = (Math.max(...timezones.map(tz => parseInt(tz.id)), 0) + 1).toString()
    const newTimezone: TimezoneEntry = { 
      id: newId, 
      offset: null, 
      startHour: 8, 
      endHour: 17, 
      name: '',
      inputMode: 'offset',
      timezoneString: ''
    }
    setTimezones([...timezones, newTimezone])
    setEditingId(newId)
  }

  const removeTimezone = (id: string) => {
    setTimezones(timezones.filter(tz => tz.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const toggleInputMode = (id: string) => {
    setTimezones(timezones.map(tz => {
      if (tz.id === id) {
        return {
          ...tz,
          inputMode: tz.inputMode === 'offset' ? 'timezone' : 'offset'
        }
      }
      return tz
    }))
  }

  const updateTimezone = (id: string, field: keyof TimezoneEntry, value: number | string) => {
    setTimezones(timezones.map(tz => {
      if (tz.id === id) {
        const updated = { ...tz, [field]: value }
        
        if (field === 'offset') {
          const offsetValue = value === '' ? null : parseFloat(value as string)
          updated.offset = offsetValue
          updated.name = offsetValue !== null ? `UTC${offsetValue >= 0 ? '+' : ''}${offsetValue}` : ''
        } else if (field === 'timezoneString') {
          updated.timezoneString = value as string
          const parsedOffset = parseTimezoneInput(value as string)
          if (parsedOffset !== null) {
            updated.offset = parsedOffset
            updated.name = `UTC${parsedOffset >= 0 ? '+' : ''}${parsedOffset}`
          } else {
            updated.offset = null
            updated.name = ''
          }
        }
        
        return updated
      }
      return tz
    }))
  }

  const calculateCoverage = () => {
    const coverage = new Array(24).fill(0)
    
    timezones.forEach(tz => {
      if (tz.offset === null) return
      for (let localHour = tz.startHour; localHour < tz.endHour; localHour++) {
        const utcHour = (localHour - tz.offset + 24) % 24
        coverage[utcHour]++
      }
    })
    
    return coverage
  }

  const coverage = calculateCoverage()

  const getUTCHours = (tz: TimezoneEntry) => {
    if (tz.offset === null) return []
    const hours = []
    for (let localHour = tz.startHour; localHour < tz.endHour; localHour++) {
      const utcHour = (localHour - tz.offset + 24) % 24
      hours.push(utcHour)
    }
    return hours
  }

  const hasValidTimezones = timezones.some(tz => tz.offset !== null)

  const timezoneColors = [
    { bg: 'bg-blue-600', text: 'text-blue-200', border: 'border-blue-600/30' },
    { bg: 'bg-purple-600', text: 'text-purple-200', border: 'border-purple-600/30' },
    { bg: 'bg-pink-600', text: 'text-pink-200', border: 'border-pink-600/30' },
    { bg: 'bg-emerald-600', text: 'text-emerald-200', border: 'border-emerald-600/30' },
    { bg: 'bg-cyan-600', text: 'text-cyan-200', border: 'border-cyan-600/30' },
    { bg: 'bg-amber-600', text: 'text-amber-200', border: 'border-amber-600/30' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#E2E8F0]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="space-y-3">
                <h1 className="text-4xl mb-6 font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] bg-clip-text text-transparent">
                  Coverage Visualizer
                </h1>
                <p className="mx-auto max-w-[700px] text-[#A0AEC0] text-lg">
                  Visualize your team's global coverage and identify gaps in your SRE on-call roster
                </p>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-[#2C2C2C] to-[#1C1C1C] border-[#3C3C3C] rounded-2xl shadow-2xl overflow-hidden">
              <CardHeader className="border-b border-[#3C3C3C] bg-[#1C1C1C]/50">
                <CardTitle className="text-[#E2E8F0] flex items-center text-xl">
                  <Clock className="mr-3 h-6 w-6 text-[#D97706]" />
                  24-Hour Coverage Map
                </CardTitle>
                <p className="text-sm text-[#A0AEC0] mt-1">Click on any timezone to edit • All times in UTC</p>
              </CardHeader>
              <CardContent className="p-6">
                {timezones.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D97706]/10 mb-4">
                      <Globe className="h-8 w-8 text-[#D97706]" />
                    </div>
                    <p className="text-[#A0AEC0] text-lg mb-2">No timezones configured yet</p>
                    <p className="text-[#6B7280] text-sm mb-6">Add your first timezone to start analyzing coverage</p>
                    <Button
                      onClick={addTimezone}
                      className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white rounded-xl px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Add First Timezone
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {timezones.map((tz, index) => {
                      const utcHours = getUTCHours(tz)
                      const colors = timezoneColors[index % timezoneColors.length]
                      const isEditing = editingId === tz.id
                      const isValid = tz.offset !== null
                      
                      return (
                        <div 
                          key={tz.id} 
                          className="group relative"
                        >
                          <div className={`p-4 bg-[#0A0A0A] rounded-xl border transition-all duration-200 ${
                            isEditing ? `${colors.border} border-2` : 'border-[#3C3C3C] hover:border-[#D97706]/30'
                          }`}>
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-3 h-3 rounded-full ${colors.bg} flex-shrink-0`}></div>
                              
                              {isEditing ? (
                                <div className="flex items-center gap-2 flex-1 flex-wrap">
                                  {tz.inputMode === 'offset' ? (
                                    <>
                                      <span className="text-xs text-[#6B7280] whitespace-nowrap">UTC</span>
                                      <Input
                                        type="number"
                                        step="0.5"
                                        min="-12"
                                        max="14"
                                        value={tz.offset ?? ''}
                                        onChange={(e) => updateTimezone(tz.id, 'offset', e.target.value)}
                                        placeholder="-7"
                                        className="w-16 h-8 bg-[#1C1C1C] border-[#3C3C3C] text-[#E2E8F0] rounded-lg text-sm px-2"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-xs text-[#6B7280] whitespace-nowrap">TZ</span>
                                      <Input
                                        type="text"
                                        value={tz.timezoneString}
                                        onChange={(e) => updateTimezone(tz.id, 'timezoneString', e.target.value)}
                                        placeholder="PST, Tokyo, +5.5"
                                        className="w-32 h-8 bg-[#1C1C1C] border-[#3C3C3C] text-[#E2E8F0] rounded-lg text-sm px-2"
                                      />
                                    </>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleInputMode(tz.id)}
                                    className="h-8 w-8 p-0 hover:bg-[#D97706]/20 hover:text-[#D97706] rounded-lg"
                                    title="Switch input mode"
                                  >
                                    <ArrowRightLeft className="h-3 w-3" />
                                  </Button>
                                  <span className="text-xs text-[#6B7280]">•</span>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={tz.startHour}
                                    onChange={(e) => updateTimezone(tz.id, 'startHour', parseInt(e.target.value))}
                                    className="w-14 h-8 bg-[#1C1C1C] border-[#3C3C3C] text-[#E2E8F0] rounded-lg text-sm px-2"
                                  />
                                  <span className="text-xs text-[#6B7280]">to</span>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={tz.endHour}
                                    onChange={(e) => updateTimezone(tz.id, 'endHour', parseInt(e.target.value))}
                                    className="w-14 h-8 bg-[#1C1C1C] border-[#3C3C3C] text-[#E2E8F0] rounded-lg text-sm px-2"
                                  />
                                  <span className="text-xs text-[#6B7280]">local</span>
                                  
                                  <div className="ml-auto flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setEditingId(null)}
                                      className="h-8 w-8 p-0 hover:bg-green-900/20 hover:text-green-400 rounded-lg"
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeTimezone(tz.id)}
                                      className="h-8 w-8 p-0 hover:bg-red-900/20 hover:text-red-400 rounded-lg"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div 
                                  className="flex items-center gap-3 flex-1 cursor-pointer"
                                  onClick={() => setEditingId(tz.id)}
                                >
                                  {isValid ? (
                                    <>
                                      <span className={`text-sm font-medium ${colors.text}`}>
                                        {tz.name}
                                      </span>
                                      <span className="text-xs text-[#6B7280]">
                                        {String(tz.startHour).padStart(2, '0')}:00 - {String(tz.endHour).padStart(2, '0')}:00 local
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-sm text-[#6B7280] italic">
                                      Click to configure timezone...
                                    </span>
                                  )}
                                  
                                  <div className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setEditingId(tz.id)
                                      }}
                                      className="h-8 w-8 p-0 hover:bg-[#D97706]/20 hover:text-[#D97706] rounded-lg"
                                    >
                                      <Edit2 className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        removeTimezone(tz.id)
                                      }}
                                      className="h-8 w-8 p-0 hover:bg-red-900/20 hover:text-red-400 rounded-lg"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-0.5 h-12 rounded-lg overflow-hidden bg-[#1C1C1C] p-1">
                              {Array.from({ length: 24 }).map((_, hour) => (
                                <div
                                  key={hour}
                                  className={`flex-1 rounded transition-all duration-200 ${
                                    isValid && utcHours.includes(hour)
                                      ? `${colors.bg} shadow-lg`
                                      : 'bg-[#0A0A0A]'
                                  }`}
                                  title={`${String(hour).padStart(2, '0')}:00 UTC`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    
                    <Button
                      onClick={addTimezone}
                      className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white rounded-xl py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Add Timezone
                    </Button>

                    <div className="flex justify-between text-xs text-[#6B7280] px-5 pt-2">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const hour = i * 3
                        return <span key={hour}>{String(hour).padStart(2, '0')}:00</span>
                      })}
                    </div>
                    
                    <div className="mt-4 p-4 bg-[#1C1C1C] rounded-xl border border-[#3C3C3C]">
                      <p className="text-xs text-[#6B7280] mb-2 font-medium">Supported timezone formats:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-[#A0AEC0]">
                        <div>• UTC offsets: <span className="text-[#D97706]">-7, +5.5, +10</span></div>
                        <div>• US: <span className="text-[#D97706]">PST, EST, CST</span></div>
                        <div>• Cities: <span className="text-[#D97706]">Tokyo, London</span></div>
                        <div>• Regions: <span className="text-[#D97706]">India, China</span></div>
                        <div>• Europe: <span className="text-[#D97706]">CET, GMT</span></div>
                        <div>• Pacific: <span className="text-[#D97706]">Sydney, Auckland</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {hasValidTimezones && (
              <>
                <Card className="bg-gradient-to-br from-[#2C2C2C] to-[#1C1C1C] border-[#3C3C3C] rounded-2xl shadow-2xl overflow-hidden mt-8">
                  <CardHeader className="border-b border-[#3C3C3C] bg-[#1C1C1C]/50">
                    <CardTitle className="text-[#E2E8F0] text-xl">Combined Coverage Analysis</CardTitle>
                    <p className="text-sm text-[#A0AEC0] mt-1">Overall team coverage across all timezones</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex gap-0.5 h-20 rounded-lg overflow-hidden bg-[#0A0A0A] p-1">
                        {coverage.map((count, hour) => (
                          <div
                            key={hour}
                            className={`flex-1 rounded flex items-center justify-center text-base font-bold transition-all duration-200 ${
                              count === 0
                                ? 'bg-gradient-to-b from-red-900 to-red-950 text-red-200'
                                : count === 1
                                ? 'bg-gradient-to-b from-yellow-600 to-yellow-800 text-yellow-100'
                                : 'bg-gradient-to-b from-green-600 to-green-800 text-green-100'
                            }`}
                            title={`${String(hour).padStart(2, '0')}:00 UTC - ${count} timezone(s) covering`}
                          >
                            {count}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-[#6B7280] px-1">
                        {Array.from({ length: 8 }).map((_, i) => {
                          const hour = i * 3
                          return <span key={hour}>{String(hour).padStart(2, '0')}:00 UTC</span>
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-[#2C2C2C] to-[#1C1C1C] border-[#3C3C3C] rounded-2xl shadow-2xl mt-8">
                  <CardHeader className="border-b border-[#3C3C3C] bg-[#1C1C1C]/50">
                    <CardTitle className="text-[#E2E8F0] text-xl">Coverage Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-[#0A0A0A] rounded-xl border border-red-900/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-gradient-to-b from-red-900 to-red-950 rounded-full"></div>
                          <span className="text-sm font-medium text-red-200">No Coverage</span>
                        </div>
                        <div className="text-2xl font-bold text-red-400">
                          {coverage.filter(c => c === 0).length}
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1">hours uncovered</div>
                      </div>
                      <div className="p-4 bg-[#0A0A0A] rounded-xl border border-yellow-700/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full"></div>
                          <span className="text-sm font-medium text-yellow-200">Single Coverage</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {coverage.filter(c => c === 1).length}
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1">hours with one person</div>
                      </div>
                      <div className="p-4 bg-[#0A0A0A] rounded-xl border border-green-700/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-gradient-to-b from-green-600 to-green-800 rounded-full"></div>
                          <span className="text-sm font-medium text-green-200">Multiple Coverage</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">
                          {coverage.filter(c => c >= 2).length}
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1">hours with redundancy</div>
                      </div>
                    </div>
                    {coverage.some(c => c === 0) ? (
                      <div className="p-5 bg-gradient-to-r from-red-900/20 to-red-950/20 border border-red-900/50 rounded-xl flex items-start gap-4">
                        <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-200 mb-1">
                            Coverage Gaps Detected
                          </p>
                          <p className="text-xs text-red-300/80">
                            Your team has {coverage.filter(c => c === 0).length} hours without coverage. Consider adding team members in different timezones to ensure 24/7 availability.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 bg-gradient-to-r from-green-900/20 to-green-950/20 border border-green-900/50 rounded-xl flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-200 mb-1">
                            Full Coverage Achieved
                          </p>
                          <p className="text-xs text-green-300/80">
                            Excellent! Your team has complete 24/7 coverage with no gaps.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}