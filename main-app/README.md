# 🏠 Main App - Container Application

This is the **container application** that orchestrates the music library micro frontend architecture. It's completely independent with its own dependencies and build process.

## 🎯 Purpose

The main app serves as the **orchestrator** that:
- Handles user authentication and role management
- Dynamically loads the music library micro frontend via Module Federation
- Provides the overall application shell and navigation
- Manages the user experience and routing

## 🚀 Quick Start

```bash
# Install dependencies (independent)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Configuration

### Module Federation
The app is configured to load the music library from the specified remote URL:

```typescript
// vite.config.ts
federation({
  name: 'main-app',
  remotes: {
    'music-library': 'http://localhost:5174/assets/remoteEntry.js', // Development
    // 'music-library': 'https://your-music-library.vercel.app/assets/remoteEntry.js', // Production
  },
  shared: ['react', 'react-dom']
})
```

### Port Configuration
- **Development**: Port 5173
- **Music Library**: Port 5174 (configured in music-library app)

## 🏗️ Architecture

### Components
- **Header**: Authentication UI and user management
- **MusicLibraryWrapper**: Dynamic loader for the music library micro frontend
- **AuthProvider**: Context for managing user authentication state

### Authentication Flow
1. User enters credentials
2. Mock JWT token is generated and stored in localStorage
3. User role determines available features
4. Music library loads with appropriate permissions

## 🔐 User Roles

- **Admin**: Full access to add/delete songs
- **User**: Read-only access to music library

## 📱 Features

- Responsive header with authentication
- Dynamic micro frontend loading via Module Federation
- Role-based access control
- Modern UI with gradient backgrounds
- Independent dependency management

## 🚀 Development

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔗 Integration

This app integrates with the `music-library` micro frontend using Module Federation. The music library must be running and accessible for the micro frontend to load properly.

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy and note the production URL
5. Update the music library remote URL in `vite.config.ts` for production

### Environment Variables
Create `.env.production` for production configuration:
```bash
VITE_MUSIC_LIBRARY_URL=https://your-music-library.vercel.app
```

## 📁 Project Structure

```
main-app/
├── node_modules/        # ✅ Independent dependencies
├── src/
│   ├── components/      # Header, MusicLibraryWrapper
│   ├── contexts/        # Authentication context
│   ├── App.tsx         # Main app component
│   └── styles/         # CSS files
├── package.json         # Independent package management
├── vite.config.ts      # Module Federation config
└── tsconfig.json       # TypeScript configuration
```

## 🔧 Dependencies

All dependencies are managed independently:
- React 18 with TypeScript
- Vite for build tooling
- Module Federation for micro frontend loading
- No shared dependencies with other apps

## 🎯 Next Steps

After deployment:
1. Update the music library remote URL in production config
2. Test Module Federation in production
3. Monitor performance and errors
4. Consider adding analytics and monitoring

---

**This is a truly independent container application that can be developed, built, and deployed separately from the music library micro frontend.**
