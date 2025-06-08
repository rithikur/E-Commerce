import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getCategories, getProducts, getCustomers, getOrders, seedData } from '../../utils/store'
import { Tag, Package, Users, ShoppingBag } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ categories: 0, products: 0, customers: 0, orders: 0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    seedData()
    setStats({
      categories: getCategories().length,
      products:   getProducts().length,
      customers:  getCustomers().length,
      orders:     getOrders().length,
    })
    setRecentOrders(getOrders().slice(-5).reverse())
  }, [])

  const statCards = [
    { label: 'Categories', value: stats.categories, icon: Tag,         color: 'bg-ub-light' },
    { label: 'Products',   value: stats.products,   icon: Package,     color: 'bg-ub-light' },
    { label: 'Customers',  value: stats.customers,  icon: Users,       color: 'bg-ub-light' },
    { label: 'Orders',     value: stats.orders,     icon: ShoppingBag, color: 'bg-ub-light' },
  ]

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <p className="font-jost text-[10px] tracking-[0.2em] uppercase text-ub-dark">— Overview</p>
          <h2 className="font-cormorant text-3xl text-ub-darkest mt-1">Dashboard</h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`${color} border border-ub-muted p-5`}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-jost text-[10px] tracking-[0.15em] uppercase text-ub-dark">{label}</p>
                <Icon size={16} className="text-ub-dark" />
              </div>
              <p className="font-cormorant text-4xl text-ub-darkest">{value}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div>
          <p className="font-jost text-[10px] tracking-[0.2em] uppercase text-ub-dark mb-4">— Recent Orders</p>
          {recentOrders.length === 0 ? (
            <p className="font-jost text-sm text-ub-dark">No orders yet.</p>
          ) : (
            <table className="w-full border border-ub-muted text-sm font-jost">
              <thead>
                <tr className="bg-ub-light">
                  {['Order ID','Customer','Total','Status','Date'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-ub-dark font-normal border-b border-ub-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} className="border-b border-ub-muted hover:bg-ub-light/50">
                    <td className="px-4 py-3 text-ub-darkest">{o.id}</td>
                    <td className="px-4 py-3 text-ub-darkest">{o.customerName}</td>
                    <td className="px-4 py-3 text-ub-darkest">₹{o.total.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-1 bg-ub-mid/20 text-ub-darkest">{o.status}</span>
                    </td>
                    <td className="px-4 py-3 text-ub-dark">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
