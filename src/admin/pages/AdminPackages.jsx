import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdAdd, MdEdit, MdDelete, MdClose, MdCheck } from 'react-icons/md'
import api from '../../api'

const EMPTY_FORM = {
  name: '', tagline: '', description: '', price: '',
  billingCycle: 'once', duration: '', features: '', isActive: true, isPopular: false,
}

export default function AdminPackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [bulkPct, setBulkPct] = useState('')
  const [bulkLoading, setBulkLoading] = useState(false)

  const fetchPackages = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/packages')
      setPackages(data.packages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPackages() }, [])

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const openEdit = (pkg) => {
    setEditingId(pkg._id)
    setForm({
      name: pkg.name,
      tagline: pkg.tagline || '',
      description: pkg.description || '',
      price: pkg.price,
      billingCycle: pkg.billingCycle,
      duration: pkg.duration || '',
      features: (pkg.features || []).join('\n'),
      isActive: pkg.isActive,
      isPopular: pkg.isPopular,
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
      }
      if (editingId) {
        const { data } = await api.put(`/admin/packages/${editingId}`, payload)
        setPackages((prev) => prev.map((p) => (p._id === editingId ? data.package : p)))
      } else {
        const { data } = await api.post('/admin/packages', payload)
        setPackages((prev) => [...prev, data.package])
      }
      setModalOpen(false)
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save package')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete package "${name}"?`)) return
    try {
      await api.delete(`/admin/packages/${id}`)
      setPackages((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete')
    }
  }

  const handleBulkPrice = async (e) => {
    e.preventDefault()
    const pct = parseFloat(bulkPct)
    if (isNaN(pct)) return alert('Enter a valid percentage')
    if (!confirm(`Update ALL package prices by ${pct}%?`)) return
    setBulkLoading(true)
    try {
      await api.patch('/admin/packages/bulk-price', { percentage: pct })
      await fetchPackages()
      setBulkPct('')
    } catch (err) {
      alert(err.response?.data?.error || 'Bulk update failed')
    } finally {
      setBulkLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-100 text-2xl font-semibold">Packages</h1>
          <p className="text-gray-500 text-sm mt-1">{packages.length} packages</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Bulk price */}
          <form onSubmit={handleBulkPrice} className="hidden sm:flex items-center gap-2">
            <input
              type="number"
              placeholder="±% all"
              value={bulkPct}
              onChange={(e) => setBulkPct(e.target.value)}
              className="w-24 bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="submit"
              disabled={bulkLoading}
              className="px-3 py-2 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              Apply
            </button>
          </form>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
          >
            <MdAdd className="w-4 h-4" />
            New Package
          </button>
        </div>
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : packages.length === 0 ? (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-12 text-center text-gray-600">
          No packages yet. Create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`bg-gray-900 border rounded-xl p-5 relative ${
                pkg.isPopular ? 'border-amber-500/40' : 'border-white/10'
              } ${!pkg.isActive ? 'opacity-50' : ''}`}
            >
              {pkg.isPopular && (
                <span className="absolute top-3 right-3 text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full px-2 py-0.5">
                  Popular
                </span>
              )}
              <h3 className="text-gray-100 font-semibold">{pkg.name}</h3>
              {pkg.tagline && <p className="text-gray-500 text-xs mt-1">{pkg.tagline}</p>}
              <p className="text-amber-400 text-2xl font-semibold tabular-nums mt-3">
                KES {pkg.price.toLocaleString()}
                <span className="text-gray-600 text-sm font-normal ml-1">
                  /{pkg.billingCycle === 'once' ? 'session' : pkg.billingCycle}
                </span>
              </p>
              {pkg.duration && <p className="text-gray-500 text-xs mt-1">{pkg.duration}</p>}
              {pkg.features?.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400 text-xs">
                      <MdCheck className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {pkg.features.length > 4 && (
                    <li className="text-gray-600 text-xs">+{pkg.features.length - 4} more</li>
                  )}
                </ul>
              )}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => openEdit(pkg)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex-1 justify-center"
                >
                  <MdEdit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg._id, pkg.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <MdDelete className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <h2 className="text-gray-200 font-semibold">
                    {editingId ? 'Edit Package' : 'New Package'}
                  </h2>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-gray-500 hover:text-gray-200"
                  >
                    <MdClose className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSave} className="p-5 space-y-4">
                  {[
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'tagline', label: 'Tagline', type: 'text' },
                    { key: 'price', label: 'Price (KES)', type: 'number', required: true, min: 0 },
                    { key: 'duration', label: 'Duration (e.g. 1h 30m)', type: 'text' },
                  ].map(({ key, label, type, required, min }) => (
                    <div key={key}>
                      <label className="text-gray-400 text-xs font-medium block mb-1.5">{label}</label>
                      <input
                        type={type}
                        required={required}
                        min={min}
                        value={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="text-gray-400 text-xs font-medium block mb-1.5">Billing Cycle</label>
                    <select
                      value={form.billingCycle}
                      onChange={(e) => setForm((f) => ({ ...f, billingCycle: e.target.value }))}
                      className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="once">One-time</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs font-medium block mb-1.5">Features (one per line)</label>
                    <textarea
                      value={form.features}
                      onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                      rows={4}
                      className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                        className="accent-amber-500"
                      />
                      Active
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isPopular}
                        onChange={(e) => setForm((f) => ({ ...f, isPopular: e.target.checked }))}
                        className="accent-amber-500"
                      />
                      Popular
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold transition-colors disabled:opacity-60"
                    >
                      {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
