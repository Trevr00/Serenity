/**
 * Simple SVG bar chart — no external dependencies.
 * data: [{ label, value }]
 */
export default function BarChart({ data = [], color = '#f59e0b', height = 160, formatValue = (v) => v }) {
  if (!data.length) return <div className="h-40 flex items-center justify-center text-gray-600 text-sm">No data</div>

  const max = Math.max(...data.map((d) => d.value), 1)
  const barWidth = Math.max(4, Math.floor((100 / data.length) * 0.65))
  const gap = Math.floor((100 / data.length) * 0.35)

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
      >
        {data.map((d, i) => {
          const barH = Math.max(1, (d.value / max) * (height - 20))
          const x = i * (barWidth + gap) + gap / 2
          return (
            <g key={i}>
              <rect
                x={x}
                y={height - barH - 16}
                width={barWidth}
                height={barH}
                fill={color}
                opacity="0.8"
                rx="1"
              />
            </g>
          )
        })}
      </svg>
      {/* X-axis labels — show first, middle, last */}
      <div className="flex justify-between text-gray-600 text-xs mt-1 px-0.5">
        <span>{data[0]?.label}</span>
        <span>{data[Math.floor(data.length / 2)]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  )
}
