const variants = {
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  confirmed: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  completed: 'bg-green-500/15 text-green-400 border-green-500/25',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/25',
  paid: 'bg-green-500/15 text-green-400 border-green-500/25',
  unpaid: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
  failed: 'bg-red-500/15 text-red-400 border-red-500/25',
  admin: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  user: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
  active: 'bg-green-500/15 text-green-400 border-green-500/25',
  suspended: 'bg-red-500/15 text-red-400 border-red-500/25',
}

export default function Badge({ label, variant }) {
  const v = variant?.toLowerCase() || 'user'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium capitalize ${variants[v] || variants.user}`}>
      {label || v}
    </span>
  )
}
