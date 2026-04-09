import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MdSearch, MdPersonOff, MdPerson, MdAdminPanelSettings, MdDelete } from 'react-icons/md'
import api from '../../api'
import Badge from '../components/Badge'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 20 })
      if (search) params.set('search', search)
      if (roleFilter) params.set('role', roleFilter)
      const { data } = await api.get(`/admin/users?${params}`)
      setUsers(data.users)
      setPagination(data.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [search, roleFilter])

  useEffect(() => {
    const t = setTimeout(() => fetchUsers(1), 300)
    return () => clearTimeout(t)
  }, [fetchUsers])

  const updateRole = async (userId, role) => {
    setActionLoading(userId + 'role')
    try {
      await api.patch(`/admin/users/${userId}/role`, { role })
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role } : u)))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update role')
    } finally {
      setActionLoading(null)
    }
  }

  const toggleStatus = async (userId, isActive) => {
    setActionLoading(userId + 'status')
    try {
      await api.patch(`/admin/users/${userId}/status`, { isActive })
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, isActive } : u)))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status')
    } finally {
      setActionLoading(null)
    }
  }

  const deleteUser = async (userId, name) => {
    if (!confirm(`Permanently delete "${name}"? This cannot be undone.`)) return
    setActionLoading(userId + 'delete')
    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers((prev) => prev.filter((u) => u._id !== userId))
      setPagination((p) => ({ ...p, total: p.total - 1 }))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete user')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-100 text-2xl font-semibold">Users</h1>
          <p className="text-gray-500 text-sm mt-1">{pagination.total.toLocaleString()} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search name, email, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          <option value="">All roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">User</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Phone</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Role</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Status</th>
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Joined</th>
                <th className="text-right px-5 py-3 text-gray-500 text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-600 text-sm">No users found</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-gray-200 font-medium">{u.name}</p>
                      <p className="text-gray-500 text-xs">{u.email}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-400 tabular-nums">{u.phone}</td>
                    <td className="px-5 py-3">
                      <Badge label={u.role} variant={u.role} />
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        label={u.isActive === false ? 'suspended' : 'active'}
                        variant={u.isActive === false ? 'suspended' : 'active'}
                      />
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs tabular-nums">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {/* Toggle role */}
                        <button
                          onClick={() => updateRole(u._id, u.role === 'admin' ? 'user' : 'admin')}
                          disabled={actionLoading === u._id + 'role'}
                          title={u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors disabled:opacity-40"
                        >
                          <MdAdminPanelSettings className="w-4 h-4" />
                        </button>
                        {/* Toggle suspend */}
                        <button
                          onClick={() => toggleStatus(u._id, u.isActive === false)}
                          disabled={actionLoading === u._id + 'status'}
                          title={u.isActive === false ? 'Activate account' : 'Suspend account'}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors disabled:opacity-40"
                        >
                          {u.isActive === false ? <MdPerson className="w-4 h-4" /> : <MdPersonOff className="w-4 h-4" />}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => deleteUser(u._id, u.name)}
                          disabled={actionLoading === u._id + 'delete'}
                          title="Delete user"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
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
              Page {pagination.page} of {pagination.pages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => fetchUsers(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="px-3 py-1.5 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                Prev
              </button>
              <button
                onClick={() => fetchUsers(pagination.page + 1)}
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
