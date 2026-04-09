import { motion } from 'framer-motion'

export default function StatCard({ title, value, sub, icon: Icon, color = 'amber', trend }) {
  const colors = {
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-white/10 rounded-xl p-5 flex items-start gap-4"
    >
      {Icon && (
        <div className={`p-2.5 rounded-lg border ${colors[color]} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <p className="text-gray-100 text-2xl font-semibold tabular-nums">{value ?? '—'}</p>
        {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
        {trend !== undefined && (
          <p className={`text-xs mt-1 font-medium ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this month
          </p>
        )}
      </div>
    </motion.div>
  )
}
