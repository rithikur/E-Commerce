import { v4 as uuidv4 } from 'uuid';

export const seedDatabase = () => {
  const isSeeded = localStorage.getItem('ub_seeded_v5');
  
  if (!isSeeded) {
    // Force reset for the new premium Indian images and INR prices
    localStorage.removeItem('ub_products');
    localStorage.removeItem('ub_categories');
    localStorage.setItem('ub_seeded_v5', 'true');
  }

  const existingCategories = localStorage.getItem('ub_categories');
  const existingProducts = localStorage.getItem('ub_products');

  let categories = existingCategories ? JSON.parse(existingCategories) : [];
  let products = existingProducts ? JSON.parse(existingProducts) : [];

  const defaultCategories = ['Ethnic Wear', 'Kurtas', 'Bottoms', 'Accessories', 'Footwear'];
  
  let didSeedCategories = false;
  const categoryMap = {};

  // Seed Categories
  defaultCategories.forEach(name => {
    let cat = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (!cat) {
      cat = { id: `cat_${uuidv4().substring(0,6)}`, name, description: `Premium ${name}` };
      categories.push(cat);
      didSeedCategories = true;
    }
    categoryMap[name] = cat.id;
  });

  if (didSeedCategories) {
    localStorage.setItem('ub_categories', JSON.stringify(categories));
  }

  // Seed Products
  if (products.length === 0) {
    const seedProducts = [
      {
        id: `prod_${uuidv4().substring(0,6)}`,
        name: "Handloom Banarasi Saree",
        categoryId: categoryMap['Ethnic Wear'],
        gender: "Women",
        sizes: ["Free Size"],
        price: 8500.00,
        originalPrice: 10500.00,
        stock: 5,
        description: "Pure silk handloom Banarasi saree with intricate zari work.",
        image: "/images/saree.png",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: `prod_${uuidv4().substring(0,6)}`,
        name: "Cotton Anarkali Kurta",
        categoryId: categoryMap['Kurtas'],
        gender: "Women",
        sizes: ["M", "L", "XL"],
        price: 2499.00,
        originalPrice: 3200.00,
        stock: 20,
        description: "Block-printed cotton Anarkali suit perfect for festive occasions.",
        image: "/images/anarkali.png",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: `prod_${uuidv4().substring(0,6)}`,
        name: "Classic Silk Kurta Set",
        categoryId: categoryMap['Kurtas'],
        gender: "Men",
        sizes: ["M", "L", "XL"],
        price: 3500.00,
        originalPrice: null,
        stock: 12,
        description: "Elegant silk blend men's kurta tailored for a royal fit.",
        image: "/images/kurta.png",
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: `prod_${uuidv4().substring(0,6)}`,
        name: "Linen Churidar Pants",
        categoryId: categoryMap['Bottoms'],
        gender: "Unisex",
        sizes: ["S", "M", "L"],
        price: 1200.00,
        originalPrice: 1500.00,
        stock: 35,
        description: "Breathable linen churidar bottoms for everyday comfort.",
        image: "/images/churidar.png",
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: `prod_${uuidv4().substring(0,6)}`,
        name: "Kundan Choker Necklace",
        categoryId: categoryMap['Accessories'],
        gender: "Women",
        sizes: [],
        price: 5500.00,
        originalPrice: 6200.00,
        stock: 8,
        description: "Traditional Kundan and pearl choker necklace.",
        image: "/images/choker.png",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: `prod_${uuidv4().substring(0,6)}`,
        name: "Embroidered Mojari Shoes",
        categoryId: categoryMap['Footwear'],
        gender: "Men",
        sizes: [],
        price: 2100.00,
        originalPrice: null,
        stock: 15,
        description: "Hand-embroidered traditional leather Mojaris.",
        image: "/images/mojari.png",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: `prod_${uuidv4().substring(0,6)}`,
        name: "Embellished Kolhapuris",
        categoryId: categoryMap['Footwear'],
        gender: "Women",
        sizes: [],
        price: 1800.00,
        originalPrice: 2200.00,
        stock: 18,
        description: "Authentic Kolhapuri chappals with metallic embellishments.",
        image: "/images/kolhapuri.png",
        featured: false,
        createdAt: new Date().toISOString()
      }
    ];

    localStorage.setItem('ub_products', JSON.stringify(seedProducts));
    window.location.reload(); // Force reload once to show seeded data
  }
};
