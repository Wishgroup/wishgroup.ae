# Wish Group Website - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Components](#components)
6. [Pages & Routes](#pages--routes)
7. [Backend API](#backend-api)
8. [Styling & Assets](#styling--assets)
9. [Environment Configuration](#environment-configuration)
10. [Development Workflow](#development-workflow)
11. [Deployment](#deployment)
12. [Integrations](#integrations)

---

## Project Overview

The Wish Group website is a modern, interactive corporate website built with React and Vite. It showcases the company's portfolio, services, team, and projects. The website features:

- **Interactive 3D elements** using Three.js and React Three Fiber
- **Dynamic animations** with GSAP
- **Responsive design** with modern UI/UX
- **Attendance management system** with offline support
- **Protected routes** for sensitive content
- **Multiple project showcases** with detailed pages
- **Blog and publication sections**
- **Career opportunities** page
- **Newsletter subscription**

---

## Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **Vite 5.0.8** - Build tool and dev server
- **Sass** - CSS preprocessor
- **GSAP 3.12.2** - Animation library
- **Three.js 0.181.2** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Swiper 11.0.5** - Touch slider
- **@fancyapps/ui** - Lightbox/gallery
- **@amcharts/amcharts5** - Charts and maps
- **react-globe.gl** - 3D globe visualization
- **lucide-react** & **react-icons** - Icon libraries
- **@emailjs/browser** - Email service integration

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **MongoDB** with **Mongoose 8.0.0** - Database
- **node-zklib** - ZKTeco biometric device integration
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **@vitejs/plugin-react** - Vite React plugin
- **vite-plugin-glsl** - GLSL shader support
- **terser** - JavaScript minification

---

## Project Structure

```
wishgroup.ae/
├── public/                 # Static assets
│   ├── css/               # CSS plugins
│   ├── img/               # Images (logos, projects, products)
│   ├── products/          # Product images
│   ├── Terrain/           # Terrain-related assets
│   └── video*.mp4         # Video files
│
├── src/                   # Source code
│   ├── assets/            # React assets (team member images)
│   ├── components/        # React components
│   │   ├── sections/      # Page sections
│   │   └── terrain/       # 3D terrain components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── styles/            # SCSS styles
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component with routing
│   └── main.jsx           # Entry point
│
├── server/                # Backend server
│   ├── config/            # Configuration files
│   ├── models/            # MongoDB models
│   ├── scripts/           # Utility scripts
│   └── server.js          # Express server
│
├── scss/                  # Global SCSS files
├── css/                   # Compiled CSS (plugins)
├── img/                   # Additional images
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

---

## Features

### 1. **Interactive 3D Elements**
- 3D terrain scenes with grass fields, dandelions, and mountains
- Interactive globe visualization
- Animated business scenes
- Custom shader effects

### 2. **Smooth Animations**
- GSAP-powered scroll animations
- Page transitions with curtain effects
- Custom cursor with hover effects
- Progress bar for page loading

### 3. **Responsive Navigation**
- Sticky menu with smooth transitions
- Mobile-responsive design
- Protected routes for sensitive content

### 4. **Attendance Management System**
- Real-time attendance tracking
- Offline support with automatic sync
- Integration with ZKTeco biometric devices
- Web-based attendance marking
- MongoDB storage for attendance records

### 5. **Project Showcases**
- Multiple portfolio sections
- Detailed project pages:
  - Wish Harbour Ciprea
  - Prime Wish
  - Beverley Air
  - The Bay
  - Dow Hotel
  - Wish World
  - Wish Brands
  - Prime Bond
  - World Capital Centre

### 6. **Content Management**
- Blog section
- Publications
- News updates
- Team member profiles
- Services showcase

### 7. **User Engagement**
- Newsletter subscription
- Contact forms
- Social media integration
- Interactive maps

---

## Components

### Core Layout Components

#### `Layout.jsx`
Main layout wrapper that includes:
- Custom cursor
- Progress bar
- Navigation menu
- Curtain transitions
- Frame effects
- Hidden elements for SEO

#### `Menu.jsx`
Navigation menu component with:
- Responsive design
- Smooth transitions
- Active route highlighting

#### `Footer.jsx`
Site footer with:
- Company information
- Links to important pages
- Social media links

### UI Components

#### `Cursor.jsx`
Custom cursor with hover effects and animations

#### `ProgressBar.jsx`
Page loading progress indicator

#### `Curtain.jsx`
Page transition curtain effect

#### `Frame.jsx`
Decorative frame element

#### `Preloader.jsx`
Initial page loading screen

#### `ProtectedRoute.jsx`
Route protection component (currently Auth0 disabled, always allows access)

### Feature Components

#### `AttendanceButton.jsx`
Button component for marking attendance

#### `AuthButton.jsx`
Authentication button (Auth0 integration - currently disabled)

#### `RotatedCarousel.jsx`
Rotating carousel component for content display

### Section Components (`components/sections/`)

- **Banner.jsx** - Hero banner section
- **About.jsx** - About section
- **Services.jsx** - Services showcase
- **PortfolioCards.jsx** - Portfolio card grid
- **Partners.jsx** - Partners/affiliates section
- **Reviews.jsx** - Customer testimonials
- **Blog.jsx** - Blog preview section
- **world.jsx** - World map/globe section
- **NewSection.jsx** - Additional content section

### 3D Terrain Components (`components/terrain/`)

- **Terrain.jsx** - Main terrain component
- **GrassField.jsx** - Grass field visualization
- **DandelionField3D.jsx** - Dandelion field scene
- **FlowerField.jsx** - Flower field scene
- **MountainScene.jsx** - Mountain landscape
- **InteractiveGrassField.jsx** - Interactive grass field
- **InteractiveDandelionField.jsx** - Interactive dandelion field
- **ShaderGrassField.jsx** - Shader-based grass field
- **Sky.jsx** - Sky rendering
- **StaticSkyBackground.jsx** - Static sky background
- **BusinessmanBillboards.jsx** - 3D business scene
- **PlumbobOverlay.jsx** - Overlay UI elements
- **OverlayUI.jsx** - UI overlay for 3D scenes
- **TileTerrain.jsx** - Tiled terrain system

### Custom Hooks

#### `useScrollAnimations.js`
Hook for managing scroll-based animations

#### `useArrowIcons.js`
Hook for managing arrow icon functionality

---

## Pages & Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Main homepage |
| `/home-2` | `Home2` | Alternative homepage |
| `/portfolio-1` | `Portfolio1` | Portfolio section 1 |
| `/portfolio-2` | `Portfolio2` | Portfolio section 2 |
| `/portfolio-3` | `Portfolio3` | Portfolio section 3 |
| `/services` | `Services` | Services listing page |
| `/service` | `Service` | Individual service page |
| `/blog` | `Blog` | Blog listing page |
| `/publication` | `Publication` | Publications page |
| `/team` | `Team` | Team members page |
| `/about-us` | `AboutUs` | About us page |
| `/news` | `News` | News updates page |
| `/careers` | `Careers` | Career opportunities |
| `/contact` | `Contacts` | Contact page |
| `/country/:countryCode` | `Country` | Country-specific page |

### Project Detail Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/project/wish-harbour-ciprea` | `WishHarbourCiprea` | Wish Harbour Ciprea project |
| `/project/prime-wish` | `PrimeWish` | Prime Wish project |
| `/project/beverley-air` | `BeverleyAir` | Beverley Air project |
| `/project/the-bay` | `TheBay` | The Bay project |
| `/project/dow-hotel` | `DowHotel` | Dow Hotel project |
| `/project/wish-world` | `WishWorld` | Wish World project |
| `/project/wish-brands` | `WishBrands` | Wish Brands project |
| `/project/prime-bond` | `PrimeBond` | Prime Bond project |
| `/project/world-capital-centre` | `WorldCapitalCentre` | World Capital Centre project |

### Protected Routes (Currently Unprotected)

| Route | Component | Description |
|-------|-----------|-------------|
| `/project-1` | `Project1` | Protected project 1 |
| `/project-2` | `Project2` | Protected project 2 |
| `/project-3` | `Project3` | Protected project 3 |
| `/project-4` | `Project4` | Protected project 4 |
| `/project-6` | `Project6` | Protected project 6 |
| `/attendance` | `Attendance` | Attendance management page |

### Error Handling

| Route | Component | Description |
|-------|-----------|-------------|
| `*` | `NotFound` | 404 Not Found page |

### Code Splitting

All routes use React's `lazy()` loading for code splitting, reducing initial bundle size and improving load times.

---

## Backend API

### Server Configuration

- **Port**: 5001 (configurable via `PORT` environment variable)
- **Base URL**: `http://localhost:5001` (configurable via `VITE_API_URL`)

### API Endpoints

#### Health Check
```
GET /health
```
Returns server status, database connection status, and device configuration.

**Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "deviceIP": "10.255.254.49",
  "port": 80,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Device Connection Test
```
GET /connect
```
Tests connection to ZKTeco biometric device.

**Response:**
```json
{
  "success": true,
  "message": "Connected to ZKTeco Machine Successfully!",
  "deviceIP": "10.255.254.49"
}
```

#### Get Attendance Records
```
GET /attendance
```
Retrieves attendance records from MongoDB.

**Query Parameters:**
- `uid` (optional) - Filter by user ID
- `date` (optional) - Filter by date (YYYY-MM-DD)
- `limit` (optional) - Limit number of records
- `sort` (optional) - Sort order: `asc` or `desc` (default: `desc`)

**Response:**
```json
[
  {
    "uid": 1,
    "timestamp": "2024-01-01T08:00:00.000Z",
    "date": "2024-01-01",
    "time": "08:00:00",
    "verifyType": 0
  }
]
```

#### Sync Attendance
```
POST /attendance/sync
```
Syncs attendance records from device or web to MongoDB.

**Request Body (Web-based):**
```json
[
  {
    "uid": 1,
    "timestamp": "2024-01-01T08:00:00.000Z",
    "verifyType": 0,
    "deviceIP": "web"
  }
]
```

**Request Body (Device-based):**
```json
{}
```
(Empty body triggers device fetch)

**Response:**
```json
{
  "success": true,
  "message": "Synced 5 new attendance records",
  "synced": 5,
  "total": 5
}
```

#### Get Attendance Statistics
```
GET /attendance/stats
```
Returns attendance statistics.

**Response:**
```json
{
  "totalRecords": 1000,
  "uniqueUsers": 50,
  "userIds": [1, 2, 3, ...],
  "latestRecord": "2024-01-01T18:00:00.000Z",
  "oldestRecord": "2023-01-01T08:00:00.000Z"
}
```

#### Newsletter Subscription
```
POST /newsletter/subscribe
```
Handles newsletter subscription.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!"
}
```

### Database Models

#### Attendance Model
```javascript
{
  uid: Number,           // User ID (required, indexed)
  timestamp: Date,       // Timestamp (required, indexed)
  date: String,         // Date in YYYY-MM-DD format
  time: String,         // Time in HH:MM:SS format
  deviceIP: String,     // Device IP or 'web'
  verifyType: Number,   // Verification type (0 = manual/web)
  createdAt: Date,      // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

### Database Configuration

- **MongoDB URI**: Configurable via `MONGODB_URI` environment variable
- **Default**: `mongodb://localhost:27017/attendance_db`
- **Connection Options**: 
  - Server selection timeout: 5 seconds
  - Socket timeout: 45 seconds

---

## Styling & Assets

### Styling Architecture

#### SCSS Structure
- **`scss/_variables.scss`** - SCSS variables (colors, fonts, spacing)
- **`scss/_common.scss`** - Common styles and utilities
- **`scss/_components.scss`** - Component-specific styles
- **`scss/style.scss`** - Main stylesheet (imports all)

#### Main Stylesheet
- **`src/styles/main.scss`** - React component styles

### Asset Organization

#### Images
- **`public/img/`** - Public images (logos, projects, products)
- **`img/`** - Additional images (blog, faces, works, projects)
- **`src/assets/`** - React component assets (team member images)

#### CSS Plugins
- **`css/plugins/`** - Third-party CSS (Bootstrap Grid, Font Awesome, Fancybox, Swiper)
- **`public/css/plugins/`** - Additional plugin CSS

#### Videos
- **`public/video.mp4`** - Main video
- **`public/video_2.mp4`** - Secondary video

### Key Design Features

- **Responsive Grid System** - Bootstrap Grid CSS
- **Icon Libraries** - Font Awesome, Lucide React, React Icons
- **Animations** - GSAP for smooth animations
- **3D Graphics** - Three.js for interactive 3D elements
- **Image Optimization** - WebP format for better performance

---

## Environment Configuration

### Frontend Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5001

# Auth0 Configuration (Currently Disabled)
# VITE_AUTH0_DOMAIN=your-domain.auth0.com
# VITE_AUTH0_CLIENT_ID=your-client-id
# VITE_AUTH0_AUDIENCE=your-api-audience
```

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5001

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/attendance_db
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance_db

# ZKTeco Device Configuration
DEVICE_IP=10.255.254.49
DEVICE_PORT=80
INOUT=10000
PING=5000

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=careers@wishgroup.ae
EMAIL_FROM=noreply@wishgroup.ae
```

### Environment Templates

- **`env.production.template`** - Production environment template
- **`server/env.template`** - Server environment template

---

## Development Workflow

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)

### Installation

1. **Install frontend dependencies:**
```bash
cd wishgroup.ae
npm install
```

2. **Install backend dependencies:**
```bash
cd server
npm install
```

### Running Development Server

1. **Start MongoDB** (if using local MongoDB)

2. **Start backend server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5001
```

3. **Start frontend dev server:**
```bash
cd wishgroup.ae
npm run dev
# Frontend runs on http://localhost:4000
```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Deployment

### Build Configuration

- **Output Directory**: `dist/`
- **Assets Directory**: `assets/`
- **Base Path**: `./` (relative paths for cPanel compatibility)
- **Minification**: Terser
- **Code Splitting**: 
  - Vendor chunk (React, React DOM, React Router)
  - Three.js chunk (Three.js, React Three Fiber)

### Deployment Methods

#### cPanel Deployment
See `CPANEL_DEPLOYMENT.md` for detailed instructions.

#### Quick Deployment
See `QUICK_DEPLOY.md` for quick deployment steps.

### Deployment Checklist

1. ✅ Set environment variables
2. ✅ Build frontend (`npm run build`)
3. ✅ Upload `dist/` contents to server
4. ✅ Configure server backend
5. ✅ Set up MongoDB connection
6. ✅ Configure ZKTeco device (if applicable)
7. ✅ Test all endpoints
8. ✅ Verify protected routes
9. ✅ Test attendance system
10. ✅ Check email configuration

---

## Integrations

### Auth0 Integration (Currently Disabled)

The website has Auth0 integration code but it's currently disabled. To re-enable:

1. Uncomment Auth0 code in:
   - `src/main.jsx`
   - `src/App.jsx`
   - `src/components/ProtectedRoute.jsx`
   - `src/components/AuthButton.jsx`

2. Set environment variables:
   - `VITE_AUTH0_DOMAIN`
   - `VITE_AUTH0_CLIENT_ID`
   - `VITE_AUTH0_AUDIENCE`

3. See `AUTH0_SETUP.md` for detailed setup instructions.

### ZKTeco Biometric Device Integration

The backend integrates with ZKTeco biometric attendance devices.

**Configuration:**
- Device IP: `DEVICE_IP` environment variable
- Device Port: `DEVICE_PORT` environment variable
- Connection timeouts: `INOUT` and `PING` environment variables

**Features:**
- Automatic attendance sync from device
- Web-based attendance marking
- Offline support with automatic sync
- Duplicate detection

See `ATTENDANCE_SETUP.md` and `ATTENDANCE_INTEGRATION.md` for detailed setup.

### Email Integration

Email functionality is optional and uses Nodemailer.

**Features:**
- Newsletter subscription emails
- Contact form submissions
- SMTP configuration support

**Configuration:**
- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- Set `EMAIL_TO` and `EMAIL_FROM`

### MongoDB Integration

MongoDB is used for storing attendance records.

**Features:**
- Automatic date/time field generation
- Indexed queries for performance
- Support for local and Atlas MongoDB

**Setup:**
See `server/MONGODB_SETUP.md` for detailed instructions.

---

## Additional Documentation

The project includes several additional documentation files:

- **`ATTENDANCE_SETUP.md`** - Attendance system setup
- **`ATTENDANCE_INTEGRATION.md`** - Attendance integration guide
- **`AUTH0_SETUP.md`** - Auth0 authentication setup
- **`CPANEL_DEPLOYMENT.md`** - cPanel deployment guide
- **`DEPLOYMENT_STRUCTURE.md`** - Deployment structure details
- **`ENVIRONMENT_UPDATE.md`** - Environment variable updates
- **`QUICK_DEPLOY.md`** - Quick deployment guide
- **`QUICK_FIX_403.md`** - 403 error troubleshooting
- **`README_DEPLOYMENT.md`** - Deployment README
- **`TROUBLESHOOTING_403.md`** - 403 error troubleshooting
- **`server/README.md`** - Server README
- **`server/QUICK_START.md`** - Server quick start guide
- **`server/MONGODB_SETUP.md`** - MongoDB setup guide
- **`server/DATA_FORMAT.md`** - Data format documentation

---

## Performance Optimizations

### Code Splitting
- Route-based code splitting using React `lazy()`
- Vendor chunk separation
- Three.js chunk separation

### Asset Optimization
- WebP image format for better compression
- Video optimization
- CSS minification
- JavaScript minification with Terser

### Caching
- Attendance data caching in localStorage
- Automatic cache cleanup
- Offline support with sync on reconnect

### Loading States
- Suspense boundaries for lazy-loaded routes
- Loading fallbacks
- Progress indicators

---

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Features**: ES6+, CSS Grid, Flexbox, WebGL (for 3D features)

---

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Protected Routes**: Currently unprotected (Auth0 disabled)
3. **API Security**: CORS enabled, consider adding authentication
4. **Input Validation**: Validate all user inputs
5. **HTTPS**: Use HTTPS in production

---

## Support & Maintenance

### Common Issues

1. **403 Errors**: See `TROUBLESHOOTING_403.md` and `QUICK_FIX_403.md`
2. **Database Connection**: Check MongoDB URI and network
3. **Device Connection**: Verify ZKTeco device IP and network
4. **Build Errors**: Check Node.js version and dependencies

### Maintenance Tasks

- Regular dependency updates
- MongoDB backup
- Attendance data cleanup
- Performance monitoring
- Security updates

---

## License

Private project - All rights reserved.

---

## Version

**Current Version**: 1.0.0

**Last Updated**: 2024

---

*This documentation covers the complete structure and functionality of the Wish Group website. For specific setup instructions, refer to the individual documentation files mentioned in the Additional Documentation section.*

