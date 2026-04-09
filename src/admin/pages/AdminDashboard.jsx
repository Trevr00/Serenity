import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MdPeople,
  MdCalendarToday,
  MdAttachMoney,
  MdTrendingUp,
} from 'react-icons/md'
import api from '../../api'
import StatCard from '../components/StatCard'
import BarChart from '../components/BarChart'
import Badge from '../components/Badge'

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null)
  const [trend, setTrend] = useState([])
  const [breakdown, setBreakdown] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/analytics/overview'),
      api.get('/admin/analytics/bookings-trend?days=14'),
      api.get('/admin/analytics/service-breakdown'),
      api.get('/bookings?limit=8'),
    ])
      .then(([ov, tr, br, rb]) => {
        setOverview(ov.data)
        setTrend(tr.data.trend.map((d) => ({ label: d.date.slice(5), value: d.bookings })))
        setBreakdown(br.data.breakdown)
        setRecentBookings(rb.data.bookings || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const fmt = (n) => n?.toLocaleString('en-KE') ?? '0'
  const fmtKes = (n) => `KES ${fmt(n)}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-7xl"
    >
      <div>
        <h1 className="text-gray-100 text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Platform overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={fmt(overview?.users?.total)}
          sub={`+${overview?.users?.today} today · +${overview?.users?.thisMonth} this month`}
          icon={MdPeople}
          color="blue"
        />
        <StatCard
          title="Total Bookings"
          value={fmt(overview?.bookings?.total)}
          sub={`+${overview?.bookings?.today} today · +${overview?.bookings?.thisMonth} this month`}
          icon={MdCalendarToday}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={fmtKes(overview?.revenue?.total)}
          sub={`${fmtKes(overview?.revenue?.thisMonth)} this month`}
          icon={MdAttachMoney}
          color="green"
        />
        <StatCard
          title="Revenue Today"
          value={fmtKes(overview?.revenue?.today)}
          sub={`${overview?.bookings?.today} bookings today`}
          icon={MdTrendingUp}
          color="amber"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Booking trend */}
        <div className="bg-gray-900 border border-white/10 rounded-xl p-5">
          <h2 className="text-gray-300 text-sm font-semibold mb-4">Bookings (last 14 days)</h2>
          <BarChart data={trend} color="#f59e0b" height={140} />
        </div>

        {/* Service breakdown */}
        <div className="bg-gray-900 border border-white/10 rounded-xl p-5">
          <h2 className="text-gray-300 text-sm font-semibold mb-4">Revenue by Service</h2>
          {breakdown.length === 0 ? (
            <p className="text-gray-600 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {breakdown.slice(0, 7).map((b) => {
                const maxRev = breakdown[0]?.revenue || 1
                const pct = Math.round((b.revenue / maxRev) * 100)
                return (
                  <div key={b.service} className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs w-36 truncate flex-shrink-0">{b.service}</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-gray-500 text-xs tabular-nums w-20 text-right flex-shrink-0">
                      KES {b.revenue.toLocaleString()}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Booking status distribution */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(overview?.bookings?.byStatus || {}).map(([status, count]) => (
          <div key={status} className="bg-gray-900 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-gray-100 text-xl font-semibold tabular-nums">{count}</p>
            <Badge label={status} variant={status} />
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-gray-300 text-sm font-semibold">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-amber-400 text-xs hover:underline">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Customer</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Service</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Date</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Amount</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-gray-600 text-xs">No bookings yet</td>
                </tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3 text-gray-300">{b.user?.name || '—'}</td>
                    <td className="px-5 py-3 text-gray-400">{b.service}</td>
                    <td className="px-5 py-3 text-gray-500 tabular-nums">
                      {new Date(b.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-gray-400 tabular-nums">
                      KES {(b.amountPaid || 0).toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <Badge label={b.status} variant={b.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
