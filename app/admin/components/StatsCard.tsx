type Color = 'blue' | 'yellow' | 'green' | 'violet' | 'gray'

const styles: Record<Color, string> = {
  blue: 'bg-blue-50 border-blue-100 text-blue-700',
  yellow: 'bg-yellow-50 border-yellow-100 text-yellow-700',
  green: 'bg-green-50 border-green-100 text-green-700',
  violet: 'bg-violet-50 border-violet-100 text-violet-700',
  gray: 'bg-gray-50 border-gray-100 text-gray-700',
}

export function StatsCard({
  label,
  value,
  color = 'blue',
  suffix,
}: {
  label: string
  value: number | string
  color?: Color
  suffix?: string
}) {
  return (
    <div className={`${styles[color]} border rounded-xl p-5`}>
      <p className="text-xs font-medium opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-bold">
        {value}
        {suffix && <span className="text-base font-normal ml-1 opacity-60">{suffix}</span>}
      </p>
    </div>
  )
}
