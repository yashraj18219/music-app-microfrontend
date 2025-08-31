# 🎵 Music Library - Micro Frontend Application

A modern React-based music library application built with **True Micro Frontend Architecture** and **Role-Based Authentication**. This project demonstrates advanced frontend concepts including Module Federation, state management, and modern JavaScript array methods.

## 🏗️ Architecture Overview

This application is built as **two completely independent applications**:

1. **`main-app/`** - Container application that handles authentication and loads the music library
2. **`music-library/`** - Micro frontend application with music management features

### 🎯 True Micro Frontend Benefits
- **Complete Independence**: Each app has its own `node_modules`, dependencies, and build process
- **Independent Development**: Teams can work on different parts without affecting each other
- **Technology Flexibility**: Each micro frontend can use different technologies
- **Scalability**: Easy to add new features without affecting existing code
- **Deployment**: Can deploy updates to specific features independently
- **No Shared Dependencies**: Each app manages its own packages completely

## ✨ Features

### 🎵 Music Library Management
- **Song Display**: Clean, responsive UI for viewing music collection
- **Advanced Filtering**: Filter by album, artist, title, and search terms
- **Sorting**: Sort by title, artist, album, or year (ascending/descending)
- **Grouping**: Group songs by album, artist, or year
- **Statistics**: Real-time stats using JavaScript reduce, map, and filter methods

### 🔐 Role-Based Authentication
- **Admin Role**: Can add and delete songs
- **User Role**: Can only view and filter songs
- **Mock JWT**: In-memory authentication system for demonstration

### 🛠️ Technical Features
- **Module Federation**: Dynamic loading of micro frontends using Vite
- **TypeScript**: Full type safety across the application
- **Modern React**: Functional components with hooks
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Array Methods**: Extensive use of map, filter, reduce, and other ES6+ features

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd music-library-app
   ```

2. **Install dependencies for each application independently**
   ```bash
   # Install main app dependencies
   cd main-app
   npm install
   
   # Install music library dependencies
   cd ../music-library
   npm install
   ```

3. **Start both applications (in separate terminals)**
   ```bash
   # Terminal 1 - Start main app (port 5173)
   cd main-app
   npm run dev
   
   # Terminal 2 - Start music library (port 5174)
   cd music-library
   npm run dev
   ```

4. **Open your browser**
   - Main App: http://localhost:5173
   - Music Library (standalone): http://localhost:5174

## 🔑 Demo Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Permissions**: Add songs, delete songs, view all features

### User Account
- **Username**: `user`
- **Password**: `user123`
- **Permissions**: View songs, use filters, no modification rights

## 🎯 How It Works

### Module Federation
The main application dynamically loads the music library micro frontend using Vite Module Federation:

```typescript
// In main-app/vite.config.ts
federation({
  name: 'main-app',
  remotes: {
    'music-library': 'http://localhost:5174/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom']
})

// In music-library/vite.config.ts
federation({
  name: 'music-library',
  filename: 'remoteEntry.js',
  exposes: {
    './MusicLibrary': './src/MusicLibrary.tsx',
  },
  shared: ['react', 'react-dom']
})
```

### Role-Based Access Control
Authentication is handled through a React Context that manages user state and permissions:

```typescript
// Admin users see add/delete buttons
{isAdmin && (
  <button onClick={() => setShowAddForm(true)}>
    + Add Song
  </button>
)}

// Delete functionality only available to admins
<SongList
  songs={filteredSongs}
  onDeleteSong={isAdmin ? deleteSong : undefined}
  groupBy={groupBy}
/>
```

### JavaScript Array Methods
The application extensively uses modern JavaScript methods:

```typescript
// Using reduce for statistics
const stats = songs.reduce((acc, song) => {
  acc.genres[song.genre] = (acc.genres[song.genre] || 0) + 1
  acc.totalDuration += minutes * 60 + seconds
  return acc
}, { genres: {}, totalDuration: 0 })

// Using map for unique values
const uniqueAlbums = [...new Set(songs.map(song => song.album))].sort()

// Using filter for search
const filtered = songs.filter(song => 
  song.title.toLowerCase().includes(searchLower)
)
```

## 📁 Project Structure

```
├── main-app/                 # Container application
│   ├── node_modules/        # ✅ Independent dependencies
│   ├── src/
│   │   ├── components/      # Header, MusicLibraryWrapper
│   │   ├── contexts/        # Authentication context
│   │   └── App.tsx         # Main app component
│   ├── package.json         # Independent package management
│   └── vite.config.ts      # Module Federation config
│
├── music-library/           # Micro frontend
│   ├── node_modules/        # ✅ Independent dependencies
│   ├── src/
│   │   ├── components/     # SongList, FilterControls, etc.
│   │   ├── data/          # Mock song data
│   │   ├── types/         # TypeScript interfaces
│   │   └── MusicLibrary.tsx
│   ├── package.json        # Independent package management
│   └── vite.config.ts     # Module Federation config
│
├── DEPLOYMENT.md            # Deployment instructions
└── README.md               # This file
```

## 🎨 Styling

- **Vanilla CSS**: Custom CSS with modern design principles
- **Responsive Grid**: CSS Grid and Flexbox for layout
- **Modern UI**: Gradient backgrounds, shadows, and smooth transitions
- **Mobile-First**: Responsive design that works on all devices

## 🚀 Deployment

### Vercel Deployment (Recommended)
Both applications are deployed to Vercel for optimal performance and easy CI/CD:

1. **Music Library**: Deployed first to get the production URL
2. **Main App**: Deployed with updated remote URL pointing to music library
3. **Module Federation**: Works seamlessly in production

### Live Demo Links
- **Main App**: [Your Vercel Main App URL]
- **Music Library**: [Your Vercel Music Library URL]

### Build Process
```bash
# Build main app
cd main-app
npm run build

# Build music library
cd ../music-library
npm run build
```

## 🔧 Development

### Available Scripts
```bash
# Main App
cd main-app
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Music Library
cd music-library
npm run dev          # Start dev server (port 5174)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Adding New Features
1. **Main App**: Add new routes, authentication features, or other micro frontends
2. **Music Library**: Add new music features, filters, or UI components
3. **Independent Development**: Each app can be developed separately

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 Learning Resources

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [React Context API](https://reactjs.org/docs/context.html)
- [Modern JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Micro Frontend Architecture](https://micro-frontends.org/)
- [Vite Module Federation](https://github.com/originjs/vite-plugin-federation)

## 🐛 Troubleshooting

### Common Issues

1. **Module Federation Error**: Ensure both apps are running on correct ports
2. **Build Errors**: Check that all dependencies are installed in each app
3. **Authentication Issues**: Clear localStorage and try logging in again
4. **Port Conflicts**: Change ports in vite.config.ts if needed

### Getting Help
- Check the browser console for errors
- Verify both applications are running
- Ensure all dependencies are installed correctly in each app

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Coding! 🎵✨**
