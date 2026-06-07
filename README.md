# UB Threads

UB Threads is a premium e-commerce platform. This repository contains the initial front-end build (UI001), which includes the Under Construction landing page and the Admin Portal for managing product categories.

## Features

- **Premium Landing Page**: A minimalist, high-end "Under Construction" page with a subtle loading animation.
- **Admin Portal**: A secure login interface for administrators.
- **Category Management**: Full CRUD (Create, Read, Update, Delete) functionality for product categories, managed locally via `localStorage`.
- **Responsive Design**: The application is fully responsive across all device sizes.
- **Modern Tech Stack**: Built with React 19, Vite, Tailwind CSS v4, and React Router DOM v7.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React State & LocalStorage
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Cormorant Garamond & Jost)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application Locally

Start the Vite development server:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.

## Usage

### Public Facing
- Navigate to `/` to view the premium landing page.
- Click the **Admin** button to access the login portal.

### Admin Portal
- Navigate to `/admin/login`.
- **Demo Credentials**:
  - **Email**: `admin@ubthreads.com`
  - **Password**: `admin123`
- Upon successful login, you will be redirected to the Categories Management page (`/admin/categories`).
- The dashboard allows you to add, edit, search, and delete categories. All data is saved directly in your browser's `localStorage` (under the key `ub_categories`).

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI and Layout components
│   │   ├── layout/      # Layout wrappers (e.g., AdminLayout)
│   │   └── ui/          # Generic UI components (e.g., Modal)
│   ├── pages/           # Page components (Routing level)
│   │   ├── admin/       # Admin specific pages (Login, Categories)
│   │   └── LandingPage.jsx
│   ├── App.jsx          # Main application routing
│   ├── index.css        # Tailwind CSS configuration and base styles
│   └── main.jsx         # Application entry point
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Deployment

This project is configured and ready for deployment on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

To build the project for production, run:

```bash
npm run build
```

This will output the static assets to the `dist` directory.

## License

&copy; UB Threads. All rights reserved.
