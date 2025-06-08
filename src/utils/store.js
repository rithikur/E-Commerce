// ─── Keys ───────────────────────────────────────────
const KEYS = {
  categories: 'ub_categories',
  products:   'ub_products',
  customers:  'ub_customers',
  orders:     'ub_orders',
  cart:       'ub_cart',
  wishlist:   'ub_wishlist',
  adminSess:  'ub_admin_session',
  custSess:   'ub_customer_session',
  seeded:     'ub_seeded',
}

// ─── Helpers ────────────────────────────────────────
const get = (key) => JSON.parse(localStorage.getItem(key) || '[]')
const set = (key, val) => localStorage.setItem(key, JSON.stringify(val))

// ─── Categories ─────────────────────────────────────
export function getCategories() { return get(KEYS.categories) }

export function addCategory(data) {
  const cats = getCategories()
  const newCat = { id: 'cat_' + Date.now(), ...data, createdAt: new Date().toISOString() }
  set(KEYS.categories, [...cats, newCat])
  return newCat
}

export function updateCategory(id, data) {
  const cats = getCategories().map(c => c.id === id ? { ...c, ...data } : c)
  set(KEYS.categories, cats)
}

export function deleteCategory(id) {
  set(KEYS.categories, getCategories().filter(c => c.id !== id))
}

// ─── Products (stub — used in dashboard count) ──────
export function getProducts() { return get(KEYS.products) }

// ─── Customers (stub) ───────────────────────────────
export function getCustomers() { return get(KEYS.customers) }

// ─── Orders (stub) ──────────────────────────────────
export function getOrders() { return get(KEYS.orders) }

// ─── Admin session ──────────────────────────────────
export function adminLogin(email, password) {
  if (email === 'admin@ubthreads.com' && password === 'admin123') {
    localStorage.setItem(KEYS.adminSess, 'true')
    return true
  }
  return false
}

export function adminLogout() {
  localStorage.removeItem(KEYS.adminSess)
}

// ─── Seed data (runs once) ──────────────────────────
export function seedData() {
  if (localStorage.getItem(KEYS.seeded)) return
  const categories = [
    { id: 'cat_1', name: 'T-Shirts',     gender: 'men',     description: 'Casual cotton tees for everyday wear',       image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', createdAt: new Date().toISOString() },
    { id: 'cat_2', name: 'Shirts',       gender: 'men',     description: 'Formal and casual shirts',                   image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', createdAt: new Date().toISOString() },
    { id: 'cat_3', name: 'Formal Wear',  gender: 'men',     description: 'Blazers, trousers and office wear',          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', createdAt: new Date().toISOString() },
    { id: 'cat_4', name: 'Jackets',      gender: 'unisex',  description: 'Lightweight and heavy jackets',              image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', createdAt: new Date().toISOString() },
    { id: 'cat_5', name: 'Dresses',      gender: 'women',   description: 'Casual and formal dresses',                  image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', createdAt: new Date().toISOString() },
    { id: 'cat_6', name: 'Tops',         gender: 'women',   description: 'Stylish tops and blouses',                   image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400', createdAt: new Date().toISOString() },
    { id: 'cat_7', name: 'Bottom Wear',  gender: 'unisex',  description: 'Jeans, pants and shorts',                    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', createdAt: new Date().toISOString() },
    { id: 'cat_8', name: 'Polo',         gender: 'men',     description: 'Classic polo shirts',                        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', createdAt: new Date().toISOString() },
  ]
  const products = [
    { id: 'prod_1', name: 'Classic White Tee',        categoryId: 'cat_1', gender: 'men',    sizes: ['S','M','L','XL'], price: 599,  originalPrice: 799,  stock: 50, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'], description: 'Everyday essential in pure cotton.', featured: true,  createdAt: new Date().toISOString() },
    { id: 'prod_2', name: 'Linen Oversized Shirt',    categoryId: 'cat_2', gender: 'men',    sizes: ['M','L','XL'],    price: 1299, originalPrice: 1799, stock: 30, images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'], description: 'Breathable linen for summer days.',  featured: true,  createdAt: new Date().toISOString() },
    { id: 'prod_3', name: 'Slim Fit Blazer',          categoryId: 'cat_3', gender: 'men',    sizes: ['S','M','L'],     price: 2999, originalPrice: 3999, stock: 15, images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'], description: 'Sharp cut for the modern professional.', featured: false, createdAt: new Date().toISOString() },
    { id: 'prod_4', name: 'Bomber Jacket',            categoryId: 'cat_4', gender: 'unisex', sizes: ['S','M','L','XL'], price: 2499, originalPrice: 2999, stock: 20, images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'], description: 'Lightweight bomber for all seasons.',   featured: true,  createdAt: new Date().toISOString() },
    { id: 'prod_5', name: 'Floral Wrap Dress',        categoryId: 'cat_5', gender: 'women',  sizes: ['XS','S','M'],    price: 1499, originalPrice: 1999, stock: 25, images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'], description: 'Elegant floral print wrap dress.',     featured: true,  createdAt: new Date().toISOString() },
    { id: 'prod_6', name: 'Satin Crop Top',           categoryId: 'cat_6', gender: 'women',  sizes: ['XS','S','M','L'], price: 799,  originalPrice: 999,  stock: 40, images: ['https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400'], description: 'Luxurious satin finish crop top.',     featured: false, createdAt: new Date().toISOString() },
    { id: 'prod_7', name: 'Slim Chino Pants',         categoryId: 'cat_7', gender: 'unisex', sizes: ['S','M','L','XL'], price: 1199, originalPrice: 1499, stock: 35, images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400'], description: 'Versatile chinos for any occasion.',   featured: false, createdAt: new Date().toISOString() },
    { id: 'prod_8', name: 'Classic Navy Polo',        categoryId: 'cat_8', gender: 'men',    sizes: ['S','M','L','XL'], price: 899,  originalPrice: 1199, stock: 45, images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400'], description: 'Timeless polo in premium pique fabric.', featured: false, createdAt: new Date().toISOString() },
    { id: 'prod_9', name: 'Graphic Print Tee',        categoryId: 'cat_1', gender: 'men',    sizes: ['S','M','L'],     price: 699,  originalPrice: 899,  stock: 60, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'], description: 'Bold graphic print statement tee.',   featured: false, createdAt: new Date().toISOString() },
    { id: 'prod_10', name: 'Denim Jacket',            categoryId: 'cat_4', gender: 'unisex', sizes: ['S','M','L','XL'], price: 1999, originalPrice: 2499, stock: 18, images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'], description: 'Classic denim jacket, never goes out of style.', featured: false, createdAt: new Date().toISOString() },
    { id: 'prod_11', name: 'Printed Maxi Dress',      categoryId: 'cat_5', gender: 'women',  sizes: ['XS','S','M','L'], price: 1799, originalPrice: 2299, stock: 22, images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'], description: 'Floor-length printed maxi dress.',     featured: false, createdAt: new Date().toISOString() },
    { id: 'prod_12', name: 'Ribbed Knit Top',         categoryId: 'cat_6', gender: 'women',  sizes: ['XS','S','M'],    price: 999,  originalPrice: 1299, stock: 30, images: ['https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400'], description: 'Cosy ribbed knit for cooler days.',   featured: false, createdAt: new Date().toISOString() },
  ]
  set(KEYS.categories, categories)
  set(KEYS.products, products)
  set(KEYS.customers, [])
  set(KEYS.orders, [])
  localStorage.setItem(KEYS.seeded, 'true')
}
