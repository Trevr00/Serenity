import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import api from '../../api'
import Badge from '../components/Badge'

const ACTION_COLORS = {
  CREATE: 'green',
  UPDATE: 'blue',
  DELETE: 'red',
  ROLE_CHANGE: 'amber',
  SUSPEND: 'red',
  UNSUSPEND: 'green',
  SETTINGS_UPDATE: 'blue',
  BULK_UPDATE: 'purple',
  LOGIN: 'blue',
  LOGOUT: 'user',
}

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [resourceFilter, setResourceFilter] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchLogs = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 25 })
      if (resourceFilter) params.set('resource', resourceFilter)
      if (actionFilter) params.set('action', actionFilter)
      const { data } = await api.get(`/admin/audit-logs?${params}`)
      setLogs(data.logs)
      setPagination(data.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [resourceFilter, actionFilter])

  useEffect(() => { fetchLogs(1) }, [fetchLogs])

  const formatDetails = (details) => {
    if (!details || Object.keys(details).length === 0) return null
    try {
      return JSON.stringify(details, null, 0).slice(0, 120)
    } catch {
      return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-gray-100 text-2xl font-semibold">Audit Logs</h1>
        <p className="text-gray-500 text-sm mt-1">{pagination.total.toLocaleString()} events</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={resourceFilter}
          onChange={(e) => setResourceFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          <option value="">All resources</option>
          {['User', 'Booking', 'Package', 'SystemSetting', 'Auth', 'Payment'].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          <option value="">All actions</option>
          {['CREATE', 'UPDATE', 'DELETE', 'ROLE_CHANGE', 'SUSPEND', 'UNSUSPEND', 'SETTINGS_UPDATE', 'BULK_UPDATE'].map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Log entries */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Timestamp</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Admin</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Action</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Resource</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Resource ID</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">IP</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-600 text-sm">No audit logs yet</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3 text-gray-500 text-xs tabular-nums whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-gray-300 text-xs">{log.admin?.name || '—'}</p>
                      <p className="text-gray-600 text-xs">{log.admin?.email}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium font-mono ${
                          ACTION_COLORS[log.action] === 'green'
                            ? 'bg-green-500/15 text-green-400 border-green-500/25'
                            : ACTION_COLORS[log.action] === 'red'
                            ? 'bg-red-500/15 text-red-400 border-red-500/25'
                            : ACTION_COLORS[log.action] === 'amber'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                            : ACTION_COLORS[log.action] === 'purple'
                            ? 'bg-purple-500/15 text-purple-400 border-purple-500/25'
                            : 'bg-blue-500/15 text-blue-400 border-blue-500/25'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs font-mono">{log.resource}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs font-mono truncate max-w-[120px]">
                      {log.resourceId || '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-xs tabular-nums">{log.ip || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-gray-500 text-xs">
              Page {pagination.page} of {pagination.pages} · {pagination.total} total
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => fetchLogs(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="px-3 py-1.5 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                Prev
              </button>
              <button
                onClick={() => fetchLogs(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="px-3 py-1.5 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
