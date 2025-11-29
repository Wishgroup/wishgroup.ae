# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Copy assets to public folder:**
   ```bash
   # Copy images
   cp -r img public/
   
   # Copy CSS plugins to public folder
   mkdir -p public/css/plugins
   cp -r css/plugins/* public/css/plugins/
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Asset Structure

Your `public` folder should contain:
```
public/
├── img/
│   ├── blog/
│   ├── faces/
│   ├── icons/
│   ├── partners/
│   ├── photo/
│   └── works/
```

The CSS plugins are already in `css/plugins/` and will be imported automatically.

## Development

The app will run on `http://localhost:3000` by default.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Notes

- Make sure all image paths in components use `/img/...` (starting with `/`)
- The SCSS files are compiled automatically by Vite
- All animations use GSAP and should work out of the box

