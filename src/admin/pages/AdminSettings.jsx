import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MdAdd, MdSave, MdDelete } from 'react-icons/md'
import api from '../../api'

const CATEGORIES = ['general', 'payment', 'notifications', 'security', 'features']

const EMPTY_FORM = { key: '', value: '', description: '', category: 'general', isPublic: false }

export default function AdminSettings() {
  const [settings, setSettings] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [edits, setEdits] = useState({}) // key -> { value, saving }
  const [newForm, setNewForm] = useState(EMPTY_FORM)
  const [adding, setAdding] = useState(false)
  const [addLoading, setAddLoading] = useState(false)

  const fetchSettings = async (cat = '') => {
    setLoading(true)
    try {
      const params = cat ? `?category=${cat}` : ''
      const { data } = await api.get(`/admin/settings${params}`)
      setSettings(data.settings)
      setEdits({})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSettings(categoryFilter) }, [categoryFilter])

  const saveSetting = async (key) => {
    const edit = edits[key]
    if (!edit) return
    setEdits((prev) => ({ ...prev, [key]: { ...prev[key], saving: true } }))
    try {
      const original = settings.find((s) => s.key === key)
      await api.put(`/admin/settings/${key}`, {
        value: edit.value,
        description: original?.description,
        category: original?.category,
        isPublic: original?.isPublic,
      })
      setSettings((prev) => prev.map((s) => s.key === key ? { ...s, value: edit.value } : s))
      setEdits((prev) => { const n = { ...prev }; delete n[key]; return n })
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save')
      setEdits((prev) => ({ ...prev, [key]: { ...prev[key], saving: false } }))
    }
  }

  const deleteSetting = async (key) => {
    if (!confirm(`Delete setting "${key}"?`)) return
    try {
      await api.delete(`/admin/settings/${key}`)
      setSettings((prev) => prev.filter((s) => s.key !== key))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete')
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setAddLoading(true)
    try {
      await api.put(`/admin/settings/${newForm.key}`, {
        value: newForm.value,
        description: newForm.description,
        category: newForm.category,
        isPublic: newForm.isPublic,
      })
      await fetchSettings(categoryFilter)
      setNewForm(EMPTY_FORM)
      setAdding(false)
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add setting')
    } finally {
      setAddLoading(false)
    }
  }

  const grouped = settings.reduce((acc, s) => {
    const cat = s.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-100 text-2xl font-semibold">System Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Key-value configuration</p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
        >
          <MdAdd className="w-4 h-4" />
          Add Setting
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCategoryFilter('')}
          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
            categoryFilter === ''
              ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
              : 'bg-gray-900 border-white/10 text-gray-400 hover:text-gray-200'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 text-xs rounded-lg border capitalize transition-colors ${
              categoryFilter === cat
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                : 'bg-gray-900 border-white/10 text-gray-400 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add new form */}
      {adding && (
        <form onSubmit={handleAdd} className="bg-gray-900 border border-amber-500/30 rounded-xl p-5 space-y-4">
          <h3 className="text-gray-300 text-sm font-semibold">New Setting</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Key *</label>
              <input
                required
                placeholder="e.g. site.maintenance_mode"
                value={newForm.key}
                onChange={(e) => setNewForm((f) => ({ ...f, key: e.target.value }))}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Value *</label>
              <input
                required
                placeholder="Setting value"
                value={newForm.value}
                onChange={(e) => setNewForm((f) => ({ ...f, value: e.target.value }))}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Category</label>
              <select
                value={newForm.category}
                onChange={(e) => setNewForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Description</label>
              <input
                placeholder="Optional description"
                value={newForm.description}
                onChange={(e) => setNewForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            >Cancel</button>
            <button
              type="submit"
              disabled={addLoading}
              className="px-4 py-2 text-sm rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold disabled:opacity-60 transition-colors"
            >
              {addLoading ? 'Saving…' : 'Save Setting'}
            </button>
          </div>
        </form>
      )}

      {/* Settings grouped by category */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-12 text-center text-gray-600">
          No settings configured yet.
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10">
              <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider capitalize">{category}</h2>
            </div>
            <div className="divide-y divide-white/5">
              {items.map((s) => {
                const isEdited = edits[s.key] !== undefined
                return (
                  <div key={s.key} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm font-mono">{s.key}</p>
                      {s.description && <p className="text-gray-600 text-xs mt-0.5">{s.description}</p>}
                    </div>
                    <input
                      type="text"
                      value={isEdited ? edits[s.key].value : String(s.value)}
                      onChange={(e) =>
                        setEdits((prev) => ({ ...prev, [s.key]: { value: e.target.value, saving: false } }))
                      }
                      className={`w-48 bg-gray-800 border rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none transition-colors ${
                        isEdited ? 'border-amber-500/50' : 'border-white/10'
                      }`}
                    />
                    {isEdited && (
                      <button
                        onClick={() => saveSetting(s.key)}
                        disabled={edits[s.key]?.saving}
                        className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-colors disabled:opacity-40"
                        title="Save"
                      >
                        <MdSave className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteSetting(s.key)}
                      className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}
    </motion.div>
  )
}
