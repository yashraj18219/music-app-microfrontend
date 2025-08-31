# 🎵 Music Library - Micro Frontend

This is the **music library micro frontend** that provides music management functionality and can be loaded dynamically by the main container application. It's completely independent with its own dependencies and build process.

## 🎯 Purpose

The music library micro frontend:
- Manages song data and display independently
- Provides filtering, sorting, and grouping capabilities
- Implements role-based access control for song management
- Demonstrates modern JavaScript array methods (map, filter, reduce)
- Can run standalone or be loaded by the main app via Module Federation

## 🚀 Quick Start

```bash
# Install dependencies (independent)
npm install

# Start development server (port 5174)
npm run dev

# Build for production
npm run build
```

## 🔧 Configuration

### Module Federation
This app exposes the MusicLibrary component for consumption by the main app:

```typescript
// vite.config.ts
federation({
  name: 'music-library',
  filename: 'remoteEntry.js',
  exposes: {
    './MusicLibrary': './src/MusicLibrary.tsx',
  },
  shared: ['react', 'react-dom']
})
```

### Port Configuration
- **Development**: Port 5174
- **Standalone**: Can run independently for development/testing
- **Production**: Deployed to Vercel for Module Federation

## 🏗️ Architecture

### Core Components
- **MusicLibrary**: Main component that orchestrates all features
- **SongList**: Displays songs with grouping and delete functionality
- **FilterControls**: Search, filter, sort, and group controls
- **SongForm**: Add new songs (admin only)
- **StatsDisplay**: Real-time statistics using reduce/map/filter

### Data Management
- **Mock Data**: 10 sample songs for demonstration
- **State Management**: React hooks (useState, useEffect)
- **Role-Based Access**: Different features for admin vs user roles
- **Independent State**: No shared state with main app

## 🎵 Features

### Song Management
- **View Songs**: Clean, responsive song display
- **Add Songs**: Admin-only form with validation
- **Delete Songs**: Admin-only delete functionality
- **Song Details**: Title, artist, album, year, genre, duration, rating

### Advanced Filtering
- **Search**: Text search across all fields
- **Dropdown Filters**: Album, artist, title selection
- **Sorting**: By title, artist, album, or year
- **Sort Order**: Ascending/descending toggle
- **Grouping**: Group by album, artist, or year

### Statistics
- **Library Stats**: Total songs, filtered count, duration, rating
- **Genre Analysis**: Top genres with counts
- **Decade Analysis**: Songs by decade
- **Real-time Updates**: Stats update as filters change

## 🔐 Role-Based Access

### Admin Role
- ✅ View all songs
- ✅ Add new songs
- ✅ Delete existing songs
- ✅ Use all filtering features

### User Role
- ✅ View all songs
- ✅ Use all filtering features
- ❌ Cannot add songs
- ❌ Cannot delete songs

## 🛠️ Technical Implementation

### JavaScript Array Methods
```typescript
// Reduce for statistics
const stats = songs.reduce((acc, song) => {
  acc.genres[song.genre] = (acc.genres[song.genre] || 0) + 1
  return acc
}, { genres: {} })

// Map for unique values
const uniqueAlbums = [...new Set(songs.map(song => song.album))]

// Filter for search
const filtered = songs.filter(song => 
  song.title.toLowerCase().includes(searchTerm)
)
```

### Responsive Design
- CSS Grid and Flexbox layouts
- Mobile-first approach
- Smooth animations and transitions
- Modern UI with gradients and shadows

## 📱 Standalone Development

The music library can run independently for development:

```typescript
// main.tsx - for standalone development
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MusicLibrary userRole="admin" />
  </React.StrictMode>,
)
```

## 🚀 Development

```bash
npm run dev      # Start dev server (port 5174)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔗 Integration

This micro frontend is designed to be loaded by the main container application using Module Federation. The main app will pass the user's role to determine available features.

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy and note the production URL
5. Update the main app's remote URL to point to this deployment

### Build Output
After building, the `dist` folder contains:
- `remoteEntry.js` - Module Federation entry point
- All assets needed for the micro frontend
- Exposed MusicLibrary component

## 📊 Sample Data

The app includes 10 sample songs from various artists and genres:
- Queen, Eagles, John Lennon, Led Zeppelin
- Bob Dylan, Nirvana, Michael Jackson, The Beatles
- Guns N' Roses, Oasis

Each song includes complete metadata for testing all features.

## 📁 Project Structure

```
music-library/
├── node_modules/        # ✅ Independent dependencies
├── src/
│   ├── components/     # SongList, FilterControls, etc.
│   ├── data/          # Mock song data
│   ├── types/         # TypeScript interfaces
│   ├── MusicLibrary.tsx
│   └── styles/        # CSS files
├── package.json        # Independent package management
├── vite.config.ts     # Module Federation config
└── tsconfig.json      # TypeScript configuration
```

## 🔧 Dependencies

All dependencies are managed independently:
- React 18 with TypeScript
- Vite for build tooling
- Module Federation for micro frontend exposure
- No shared dependencies with other apps

## 🎯 Next Steps

After deployment:
1. Test the standalone music library functionality
2. Verify Module Federation works with the main app
3. Monitor performance and errors
4. Consider adding more music features

---

**This is a truly independent micro frontend that can be developed, built, and deployed separately from the main container application.**
