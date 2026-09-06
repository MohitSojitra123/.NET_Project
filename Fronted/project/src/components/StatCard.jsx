const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-600', text: 'text-blue-600', trend: 'text-blue-500' },
  green: { bg: 'bg-emerald-50', icon: 'bg-emerald-600', text: 'text-emerald-600', trend: 'text-emerald-500' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-500', text: 'text-amber-600', trend: 'text-amber-500' },
  rose: { bg: 'bg-rose-50', icon: 'bg-rose-600', text: 'text-rose-600', trend: 'text-rose-500' },
  teal: { bg: 'bg-teal-50', icon: 'bg-teal-600', text: 'text-teal-600', trend: 'text-teal-500' },
  violet: { bg: 'bg-violet-50', icon: 'bg-violet-600', text: 'text-violet-600', trend: 'text-violet-500' },
};

export default function StatCard({ title, value, icon, color, subtitle, trend }) {
  const c = colorMap[color] || colorMap.blue;
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${c.text}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-2 font-medium ${c.trend}`}>
              {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className={`${c.bg} p-3 rounded-xl`}>
          <div className={`${c.text}`}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
