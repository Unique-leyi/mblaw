# MB Law - Legal Services Website

MB Law is a forward-thinking law firm website dedicated to providing exceptional legal solutions built on trust, precision, and a commitment to client success.

## Overview

This is a modern, responsive website for MB Law, a UK-based law firm specializing in:
- Immigration Law
- Real Estate Law
- Corporate Law
- Litigation and Dispute Resolution
- Family Law
- Criminal Law

## Features

- **Responsive Design**: Fully responsive website that works on all devices
- **Modern UI**: Built with Chakra UI for a clean, professional interface
- **SEO Optimized**: Proper meta tags, schema markup, and semantic HTML
- **Fast Performance**: Built with Vite for optimal build times and fast reloads
- **Animation**: AOS (Animate On Scroll) for smooth scroll animations
- **Routing**: React Router for seamless navigation

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Chakra UI**: Component library for React
- **React Router**: Client-side routing
- **AOS**: Animate On Scroll library
- **React Query**: Data fetching and state management
- **Framer Motion**: Animation library

## Project Structure

```
src/
├── features/          # Feature components (Hero, About, Team, etc.)
├── pages/            # Page components (Home, About, Team, etc.)
├── data/             # Static data files
├── ui/               # Reusable UI components
│   ├── layouts/      # Layout components (Navbar, Footer, etc.)
│   └── icons/        # Icon components
├── theme/            # Chakra UI theme configuration
├── services/         # API services
├── util/             # Utility functions
└── contexts/         # React contexts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mblaw
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5185`

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Pages

- `/` - Home page
- `/about-us` - About us page
- `/team` - Team page
- `/blog` - Blog page
- `/practice-areas` - Practice areas page
- `/contact-us` - Contact page
- `*` - 404 Not Found page

## Configuration

### Vite Configuration

The project uses Vite with React plugin. Configuration can be found in `vite.config.js`.

### Theme Configuration

Chakra UI theme is configured in `src/theme/index.jsx`. Brand colors and typography can be customized there.

## Deployment

The project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for routing.

## Contact Information

**MB Law**
- Address: Shenley Road, Opposite Sainsbury's, Hemel-Hempstead, Hertfordshire HP2 7AS, United Kingdom
- Email: info@mblaw.co.uk
- Phone: +44 XXX XXX XXXX

## License

This project is proprietary and confidential.

## Contributing

This is a private project. Please contact the project maintainers for contribution guidelines.
