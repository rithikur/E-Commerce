# 🛍️ UB Threads

> **Premium E-Commerce Platform** | Modern, Responsive, and Feature-Rich

UB Threads is a full-featured e-commerce platform built with cutting-edge web technologies. This repository contains the frontend application (UI001) featuring a premium landing page, complete product catalog, customer authentication, and a comprehensive admin portal for managing products, categories, and customers.

---

## ✨ Features

### 🎯 Public Features
- **Premium Landing Page** - Minimalist, high-end "Under Construction" page with elegant loading animations
- **Product Shop** - Browse and view premium product catalog with detailed product cards
- **Customer Authentication** - Secure signup and login for customers
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- **Product Details Modal** - Interactive modal for viewing detailed product information
- **Smooth Navigation** - Seamless page transitions with React Router DOM v7

### 🔐 Admin Portal
- **Admin Authentication** - Secure login system with session management
- **Protected Routes** - Role-based access control for admin-only pages
- **Category Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Product Management** - Complete product lifecycle management
- **Customer Management** - View, manage, and organize customer data
- **Local Data Persistence** - All data stored in browser's localStorage
- **Real-time Search & Filter** - Instant search and filtering capabilities

### 🎨 UI/UX
- **Professional HUD Components** - Custom-designed UI elements
- **Modal System** - Reusable modal components for forms and details
- **Loading Animations** - Elegant preloader component
- **Icon System** - Comprehensive icon library via Lucide React
- **Glassmorphism Design** - Modern visual design patterns
- **Color System** - Consistent color palette throughout the app

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | [React](https://react.dev/) | 19.2.6 |
| **Build Tool** | [Vite](https://vitejs.dev/) | 8.0.12 |
| **Routing** | [React Router DOM](https://reactrouter.com/) | 7.17.0 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 4.3.0 |
| **Icons** | [Lucide React](https://lucide.dev/) | 1.17.0 |
| **Utilities** | [UUID](https://www.npmjs.com/package/uuid) | 14.0.0 |
| **CSS Processing** | PostCSS + Autoprefixer | Latest |
| **Linting** | ESLint | 10.3.0 |
| **Fonts** | Google Fonts | Cormorant Garamond, Jost |

### Dependencies
```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "react-router-dom": "^7.17.0",
  "@tailwindcss/vite": "^4.3.0",
  "lucide-react": "^1.17.0",
  "uuid": "^14.0.0"
}
```

---

## 📁 Project Structure

```
E-Commerce/
├── public/                          # Static assets & SVG icons
│   ├── favicon.svg                  # Favicon
│   ├── icons.svg                    # Icon sprite sheet
│   └── images/                      # Product images
│
├── src/
│   ├── assets/                      # Source images
│   │   ├── hero.png                 # Hero section image
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/                  # Reusable React components
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx      # Admin portal wrapper with sidebar
│   │   │   └── PublicLayout.jsx     # Public site wrapper with navbar
│   │   │
│   │   └── ui/                      # Generic UI components
│   │       ├── Logo.jsx             # Brand logo component
│   │       ├── Modal.jsx            # Reusable modal wrapper
│   │       ├── Preloader.jsx        # Loading animation spinner
│   │       ├── ProductCard.jsx      # Product display card
│   │       └── ProductDetailsModal.jsx  # Product detail viewer
│   │
│   ├── pages/                       # Page components (Route level)
│   │   ├── LandingPage.jsx          # Premium home page
│   │   ├── Shop.jsx                 # Product catalog
│   │   ├── Auth.jsx                 # Customer authentication
│   │   │
│   │   └── admin/                   # Admin portal pages
│   │       ├── Login.jsx            # Admin login page
│   │       ├── Categories.jsx       # Category CRUD management
│   │       ├── Products.jsx         # Product CRUD management
│   │       └── Customers.jsx        # Customer data management
│   │
│   ├── utils/
│   │   └── seedData.js              # Mock data for development/testing
│   │
│   ├── App.jsx                      # Main application routing
│   ├── App.css                      # Global application styles
│   ├── index.css                    # Base styles & Tailwind config
│   └── main.jsx                     # React application entry point
│
├── .github/                         # GitHub workflows (CI/CD)
├── index.html                       # HTML template
├── vite.config.js                   # Vite build configuration
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Project metadata & dependencies
├── package-lock.json                # Dependency lock file
├── .gitignore                       # Git ignore rules
└── README.md                        # This file

```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rithikur/E-Commerce.git
   cd E-Commerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

---

## 📖 Usage Guide

### Public Routes

#### Landing Page (`/`)
- **Description:** Premium "Under Construction" page with elegant animations
- **Features:** Hero section, call-to-action buttons, loading animation
- **Navigation:** Access via home button or direct URL

#### Shop (`/shop`)
- **Description:** Product catalog with all available items
- **Features:** 
  - Product grid display
  - Product cards with images and details
  - Click product card to view details in modal
  - Responsive grid layout
- **Navigation:** Click "Shop" in navbar or go to `/shop`

#### Customer Authentication (`/auth`)
- **Description:** Login/Signup page for customers
- **Features:** 
  - Customer registration form
  - Customer login form
  - Session management via localStorage
- **Navigation:** Click "Sign In" or go to `/auth`

### Admin Portal

#### Admin Login (`/admin/login`)
- **URL:** `http://localhost:5173/admin/login`
- **Demo Credentials:**
  ```
  Email: admin@ubthreads.com
  Password: admin123
  ```
- **Features:**
  - Email/password authentication
  - Session validation
  - Automatic redirect to categories on success

#### Admin Dashboard - Categories (`/admin/categories`)
- **Description:** Manage product categories (CRUD operations)
- **Features:**
  - ✅ **Create** - Add new product categories
  - ✅ **Read** - View all categories in table format
  - ✅ **Update** - Edit existing category details
  - ✅ **Delete** - Remove categories with confirmation
  - 🔍 **Search** - Real-time search functionality
  - 💾 Data persisted in localStorage (`ub_categories`)

#### Admin Dashboard - Products (`/admin/products`)
- **Description:** Manage product inventory
- **Features:**
  - ✅ **Create** - Add new products with details
  - ✅ **Read** - View all products in table format
  - ✅ **Update** - Modify product information
  - ✅ **Delete** - Remove products
  - 🔍 **Search** - Filter products by name/category
  - 💾 Data persisted in localStorage (`ub_products`)

#### Admin Dashboard - Customers (`/admin/customers`)
- **Description:** Manage customer information
- **Features:**
  - 👥 **View Customers** - See all registered customers
  - 🔍 **Search Customers** - Filter by name/email
  - 📊 **Customer Data** - Full customer profiles
  - ✏️ **Edit** - Update customer information
  - 🗑️ **Delete** - Remove customer accounts
  - 💾 Data persisted in localStorage (`ub_customers`)

---

## 🔒 Authentication & Security

### Admin Authentication Flow
```
Login Page → Email/Password Validation → Session Token → Protected Routes
```

### Protected Routes
The following routes require admin authentication:
- `/admin/categories`
- `/admin/products`
- `/admin/customers`

If an unauthenticated user tries to access these routes, they are automatically redirected to `/admin/login`.

### Data Storage
- **Storage Type:** Browser localStorage
- **Security:** Client-side only (suitable for demo/development)
- **Keys Used:**
  - `ub_admin_session` - Admin authentication status
  - `ub_categories` - Product categories
  - `ub_products` - Product inventory
  - `ub_customers` - Customer data

---

## 🎨 Design System

### Color Palette
- **Primary:** Premium brand colors
- **Secondary:** Accent colors for CTAs
- **Neutral:** Grays for backgrounds and text
- **Status:** Green (success), Red (error), Yellow (warning), Blue (info)

### Typography
- **Primary Font:** Cormorant Garamond (Premium)
- **Secondary Font:** Jost (Modern)
- **Icon Library:** Lucide React (500+ icons)

### Components
- **Modal System** - Customizable modals for forms and details
- **Product Cards** - Responsive card layout with hover effects
- **Form Controls** - Input fields, buttons, selects
- **Navigation** - Responsive navbar and sidebar

---

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server with HMR
```

### Production
```bash
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint to check code quality
```

---

## 🧪 Sample Data

The application includes seed data for development and testing:

### Sample Products
- Premium clothing items
- Accessories
- Featured collections

### Sample Categories
- Men's Wear
- Women's Wear
- Accessories
- New Arrivals

The seed data is loaded automatically on application startup via `seedData.js`.

---

## 🌐 Deployment

This project is ready for deployment on modern cloud platforms:

### Supported Platforms
- **Vercel** (Recommended) - Optimized for Vite
- **Netlify** - Zero-config deployment
- **AWS Amplify** - Full-featured AWS integration
- **GitHub Pages** - Simple static hosting
- **Firebase Hosting** - Google Cloud infrastructure

### Build for Production
```bash
npm run build
```

This generates a `dist/` folder with optimized production-ready files.

### Environment Setup
Create a `.env` file (if needed):
```env
VITE_API_URL=https://api.ubthreads.com
VITE_APP_NAME=UB Threads
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Style
- Follow ESLint rules (run `npm run lint`)
- Use React best practices
- Write descriptive commit messages
- Add comments for complex logic

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Try different port
npm run dev -- --port 3000
```

### localStorage Issues
```bash
# Clear browser storage in DevTools Console
localStorage.clear()
```

### Hot Module Replacement Not Working
```bash
# Full refresh and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📚 Documentation

### React Router v7
- [React Router Documentation](https://reactrouter.com/)
- Route hierarchy and nested routes
- Protected routes implementation

### Tailwind CSS v4
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- Utility-first CSS approach
- Responsive design patterns

### Vite
- [Vite Documentation](https://vitejs.dev/)
- Hot Module Replacement (HMR)
- Build optimization

---

## 📞 Support & Contact

For questions or support regarding this project:

- **GitHub Issues:** [Report Issues](https://github.com/rithikur/E-Commerce/issues)
- **Email:** [Contact](mailto:support@ubthreads.com)
- **Documentation:** Check README for guides

---

## 📄 License

© 2025 **UB Threads**. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, or distribution is prohibited.

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Bundled with [Vite](https://vitejs.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

## 🎯 Roadmap

### Upcoming Features
- [ ] Backend API integration
- [ ] Payment gateway (Stripe, PayPal)
- [ ] Order management system
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced filtering and sorting
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Inventory management

---

**Last Updated:** June 2025
**Version:** 1.0.0
