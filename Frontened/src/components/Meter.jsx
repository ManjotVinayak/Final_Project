import React from 'react'

export default function Meter({ value = 50, size = 255, label = 'CI/CD Risk' }) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = size / 2 - 15
  const center = size / 2
  const startAngle = Math.PI
  const endAngle = 0
  const angle = startAngle + (clamped / 100) * (endAngle - startAngle)
  const needleLength = radius - 20

  const startX = center - radius * Math.cos(startAngle)
  const startY = center - radius * Math.sin(startAngle)
  const endX = center - radius * Math.cos(endAngle)
  const endY = center - radius * Math.sin(endAngle)

  const x2 = center + needleLength * Math.cos(angle)
  const y2 = center + needleLength * Math.sin(angle)

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <defs>
          <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e53935" />
            <stop offset="50%" stopColor="#ffeb3b" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
        </defs>
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
          fill="none"
          stroke="url(#riskGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${clamped} ${100 - clamped}`}
          pathLength="100"
        />
        <line
          x1={center}
          y1={center}
          x2={x2}
          y2={y2}
          stroke="#111827"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx={center} cy={center} r={6} fill="#111827" />
      </svg>
      <div className="text-gray-700 text-sm mt-2">{label}</div>
      <div className="text-black text-xl font-semibold">{clamped}%</div>
    </div>
  )
}