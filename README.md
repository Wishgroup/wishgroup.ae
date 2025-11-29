# Ashley React Template

This is the React version of the Ashley HTML template, converted from the original HTML/CSS/JavaScript version.

## Features

- ⚛️ React 18 with modern hooks
- 🎨 GSAP animations
- 🎠 Swiper sliders
- 🎯 React Router for navigation
- 📦 Vite for fast development
- 🎭 SCSS styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
ashley/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── Preloader.jsx    # Page preloader
│   │   ├── Cursor.jsx       # Custom cursor
│   │   ├── Menu.jsx         # Navigation menu
│   │   ├── Frame.jsx        # Page frame
│   │   ├── Footer.jsx       # Footer component
│   │   └── sections/        # Page sections
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Stylesheets
│   └── main.jsx             # Entry point
├── public/                   # Static assets (images, etc.)
├── scss/                     # SCSS source files
└── package.json
```

## Available Routes

- `/` - Home page
- `/home-2` - Personal homepage
- `/portfolio-1` - Portfolio grid type 1
- `/portfolio-2` - Portfolio grid type 2
- `/portfolio-3` - Portfolio slider
- `/services` - Services list
- `/service` - Single service
- `/blog` - Blog list
- `/publication` - Blog publication
- `/team` - Team page
- `/contact` - Contact page
- `/project-1` to `/project-6` - Project pages

## Assets

Make sure to copy the `img` folder to the `public` directory so images are accessible:

```bash
cp -r img public/
```

The CSS files from `css/plugins/` should also be accessible. You may need to copy them to `public/css/plugins/` or import them in your components.

## Customization

### Styling

All SCSS files are in the `scss/` directory. The main entry point is `src/styles/main.scss` which imports from `scss/style.scss`.

### Components

Components are modular and can be easily customized. Each section component is in `src/components/sections/`.

### Animations

GSAP animations are handled in:
- `src/hooks/useScrollAnimations.js` - Scroll-triggered animations
- Individual components for component-specific animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 is not supported

## License

Same as the original Ashley template.

## Notes

- Some pages are placeholder components and need to be fully implemented
- The original JavaScript functionality has been converted to React hooks
- All animations and interactions should work as in the original template

