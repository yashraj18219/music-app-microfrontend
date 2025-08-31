import React from 'react'
import { Song } from '../types/Song'
import './SongList.css'

interface SongListProps {
  songs: Song[]
  onDeleteSong?: (id: string) => void
  groupBy: 'none' | 'album' | 'artist' | 'year'
}

const SongList: React.FC<SongListProps> = ({ songs, onDeleteSong, groupBy }) => {
  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const renderSongItem = (song: Song) => (
    <div key={song.id} className="song-item">
      <div className="song-info">
        <div className="song-main">
          <h4 className="song-title">{song.title}</h4>
          <p className="song-artist">{song.artist}</p>
        </div>
        <div className="song-details">
          <span className="song-album">{song.album}</span>
          <span className="song-year">{song.year}</span>
          <span className="song-genre">{song.genre}</span>
          <span className="song-duration">{song.duration}</span>
        </div>
        <div className="song-rating">{renderStars(song.rating)}</div>
      </div>
      {onDeleteSong && (
        <button
          onClick={() => onDeleteSong(song.id)}
          className="delete-btn"
          title="Delete song"
        >
          🗑️
        </button>
      )}
    </div>
  )

  const renderGroupedSongs = () => {
    if (groupBy === 'none') {
      return (
        <div className="songs-container">
          {songs.map(renderSongItem)}
        </div>
      )
    }

    // Group songs using reduce
    const grouped = songs.reduce((acc, song) => {
      const key = song[groupBy]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(song)
      return acc
    }, {} as Record<string | number, Song[]>)

    // Sort groups
    const sortedGroups = Object.entries(grouped).sort(([a], [b]) => {
      if (groupBy === 'year') {
        return Number(b) - Number(a)
      }
      return String(a).localeCompare(String(b))
    })

    return (
      <div className="grouped-songs">
        {sortedGroups.map(([groupKey, groupSongs]) => (
          <div key={groupKey} className="song-group">
            <h3 className="group-header">
              {groupBy === 'year' ? `${groupKey}s` : groupKey}
              <span className="group-count">({groupSongs.length} songs)</span>
            </h3>
            <div className="songs-container">
              {groupSongs.map(renderSongItem)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (songs.length === 0) {
    return (
      <div className="no-songs">
        <h3>No songs found</h3>
        <p>Try adjusting your filters or add some songs to get started.</p>
      </div>
    )
  }

  return (
    <div className="song-list">
      <div className="list-header">
        <h3>🎵 Songs ({songs.length})</h3>
        {groupBy !== 'none' && (
          <span className="grouping-info">Grouped by {groupBy}</span>
        )}
      </div>
      {renderGroupedSongs()}
    </div>
  )
}

export default SongList
