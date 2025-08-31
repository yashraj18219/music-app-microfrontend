import React from 'react'
import { Song } from '../types/Song'
import './StatsDisplay.css'

interface StatsDisplayProps {
  songs: Song[]
  totalSongs: number
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ songs, totalSongs }) => {
  // Calculate statistics using reduce and other array methods
  const stats = songs.reduce((acc, song) => {
    // Count by genre
    acc.genres[song.genre] = (acc.genres[song.genre] || 0) + 1
    
    // Count by decade
    const decade = Math.floor(song.year / 10) * 10
    acc.decades[decade] = (acc.decades[decade] || 0) + 1
    
    // Total duration
    const [minutes, seconds] = song.duration.split(':').map(Number)
    acc.totalDuration += minutes * 60 + seconds
    
    // Average rating
    acc.totalRating += song.rating
    
    return acc
  }, {
    genres: {} as Record<string, number>,
    decades: {} as Record<number, number>,
    totalDuration: 0,
    totalRating: 0
  })

  const averageRating = songs.length > 0 ? (stats.totalRating / songs.length).toFixed(1) : '0'
  const totalHours = Math.floor(stats.totalDuration / 3600)
  const totalMinutes = Math.floor((stats.totalDuration % 3600) / 60)

  // Get top genres
  const topGenres = Object.entries(stats.genres)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([genre, count]) => `${genre} (${count})`)
    .join(', ')

  // Get top decades
  const topDecades = Object.entries(stats.decades)
    .sort(([a], [b]) => Number(b) - Number(a))
    .slice(0, 3)
    .map(([decade, count]) => `${decade}s (${count})`)
    .join(', ')

  return (
    <div className="stats-display">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📊 Library Stats</h3>
          <div className="stat-item">
            <span className="stat-label">Total Songs:</span>
            <span className="stat-value">{totalSongs}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Filtered Songs:</span>
            <span className="stat-value">{songs.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Duration:</span>
            <span className="stat-value">{totalHours}h {totalMinutes}m</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Rating:</span>
            <span className="stat-value">⭐ {averageRating}/5</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>🎵 Top Genres</h3>
          <p className="stat-text">{topGenres || 'No data'}</p>
        </div>

        <div className="stat-card">
          <h3>📅 Top Decades</h3>
          <p className="stat-text">{topDecades || 'No data'}</p>
        </div>
      </div>
    </div>
  )
}

export default StatsDisplay
