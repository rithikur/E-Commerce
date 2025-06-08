import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getCategories, addCategory, updateCategory, deleteCategory, seedData } from '../../utils/store'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const EMPTY_FORM = { name: '', gender: 'men', description: '', image: '' }

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    seedData()
    setCategories(getCategories())
  }, [])

  function refresh() { setCategories(getCategories()) }

  function handleSubmit(e) {
    e.preventDefault()
    if (editingId) {
      updateCategory(editingId, form)
    } else {
      addCategory(form)
    }
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
    refresh()
  }

  function handleEdit(cat) {
    setForm({ name: cat.name, gender: cat.gender, description: cat.description, image: cat.image })
    setEditingId(cat.id)
    setShowForm(true)
  }

  function handleDelete(id) {
    if (window.confirm('Delete this category? Products linked to it may be affected.')) {
      deleteCategory(id)
      refresh()
    }
  }

  function handleCancel() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-jost text-[10px] tracking-[0.2em] uppercase text-ub-dark">— Admin Panel</p>
            <h2 className="font-cormorant text-3xl text-ub-darkest mt-1">Categories</h2>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(EMPTY_FORM) }}
            className="flex items-center gap-2 bg-ub-darkest text-white font-jost text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-ub-dark transition-colors duration-200"
          >
            <Plus size={13} />
            Add Category
          </button>
        </div>

        {/* Slide-down form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-ub-light border border-ub-muted p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <p className="font-jost text-xs tracking-[0.15em] uppercase text-ub-darkest font-medium">
                {editingId ? 'Edit Category' : 'New Category'}
              </p>
              <button type="button" onClick={handleCancel}><X size={16} className="text-ub-dark" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-jost text-[10px] tracking-[0.12em] uppercase text-ub-dark mb-1.5">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. T-Shirts"
                  className="w-full border border-ub-muted bg-white px-3 py-2 font-jost text-sm text-ub-darkest focus:outline-none focus:border-ub-dark"
                />
              </div>
              <div>
                <label className="block font-jost text-[10px] tracking-[0.12em] uppercase text-ub-dark mb-1.5">Gender *</label>
                <select
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                  className="w-full border border-ub-muted bg-white px-3 py-2 font-jost text-sm text-ub-darkest focus:outline-none focus:border-ub-dark"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label className="block font-jost text-[10px] tracking-[0.12em] uppercase text-ub-dark mb-1.5">Description</label>
                <input
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description"
                  className="w-full border border-ub-muted bg-white px-3 py-2 font-jost text-sm text-ub-darkest focus:outline-none focus:border-ub-dark"
                />
              </div>
              <div>
                <label className="block font-jost text-[10px] tracking-[0.12em] uppercase text-ub-dark mb-1.5">Image URL</label>
                <input
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-ub-muted bg-white px-3 py-2 font-jost text-sm text-ub-darkest focus:outline-none focus:border-ub-dark"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="submit"
                className="bg-ub-darkest text-white font-jost text-[10px] tracking-[0.15em] uppercase px-6 py-2.5 hover:bg-ub-dark transition-colors duration-200"
              >
                {editingId ? 'Save Changes' : 'Add Category'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-ub-muted font-jost text-[10px] tracking-[0.15em] uppercase px-6 py-2.5 text-ub-dark hover:bg-ub-light transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Table */}
        <div className="border border-ub-muted overflow-hidden">
          <table className="w-full font-jost text-sm">
            <thead>
              <tr className="bg-ub-light border-b border-ub-muted">
                {['Image','Name','Gender','Description','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-ub-dark font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-ub-dark text-sm">No categories yet. Add one above.</td></tr>
              ) : (
                categories.map(cat => (
                  <tr key={cat.id} className="border-b border-ub-muted hover:bg-ub-lightest">
                    <td className="px-4 py-3">
                      {cat.image
                        ? <img src={cat.image} alt={cat.name} className="w-10 h-10 object-cover" />
                        : <div className="w-10 h-10 bg-ub-light" />
                      }
                    </td>
                    <td className="px-4 py-3 font-medium text-ub-darkest">{cat.name}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-1 bg-ub-mid/20 text-ub-darkest">{cat.gender}</span>
                    </td>
                    <td className="px-4 py-3 text-ub-dark max-w-xs truncate">{cat.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleEdit(cat)} className="text-ub-dark hover:text-ub-darkest transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="text-ub-dark hover:text-red-600 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
