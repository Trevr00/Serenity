import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MdSearch, MdFilterList } from 'react-icons/md'
import api from '../../api'
import Badge from '../components/Badge'

const STATUSES = ['', 'pending', 'confirmed', 'completed', 'cancelled']
const SERVICES = [
  '', 'Shaving Parlour', 'Full Body Massage', 'Mini-Gym',
  'Sauna', 'Steam Bath', 'Manicure & Pedicure', 'Hairstylist',
]

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      if (serviceFilter) params.set('service', serviceFilter)
      const { data } = await api.get(`/bookings?${params}`)
      setBookings(data.bookings || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, serviceFilter])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const updateStatus = async (bookingId, status) => {
    setActionLoading(bookingId)
    try {
      const { data } = await api.patch(`/bookings/${bookingId}/status`, { status })
      setBookings((prev) => prev.map((b) => (b._id === bookingId ? data.booking : b)))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-gray-100 text-2xl font-semibold">Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">{bookings.length} results</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s || 'All statuses'}</option>
          ))}
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s || 'All services'}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Customer</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Service</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Package</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Date / Time</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Amount</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Payment</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Status</th>
                <th className="text-right px-5 py-3 text-gray-500 text-xs font-medium">Update</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-gray-600 text-sm">No bookings found</td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-gray-200">{b.user?.name || '—'}</p>
                      <p className="text-gray-500 text-xs">{b.user?.email}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{b.service}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{b.packageName || '—'}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs tabular-nums">
                      {new Date(b.date).toLocaleDateString()} {b.time}
                    </td>
                    <td className="px-5 py-3 text-gray-400 tabular-nums">
                      KES {(b.amountPaid || 0).toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <Badge label={b.paymentStatus} variant={b.paymentStatus} />
                    </td>
                    <td className="px-5 py-3">
                      <Badge label={b.status} variant={b.status} />
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={b.status}
                        disabled={actionLoading === b._id}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                        className="bg-gray-800 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-amber-500/50 disabled:opacity-40"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
