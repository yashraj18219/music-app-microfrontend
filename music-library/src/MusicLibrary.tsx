import React, { useState, useEffect } from 'react'
import { Song } from './types/Song'
import { mockSongs } from './data/mockSongs'
import SongList from './components/SongList'
import SongForm from './components/SongForm'
import FilterControls from './components/FilterControls'
import StatsDisplay from './components/StatsDisplay'
import './MusicLibrary.css'

interface MusicLibraryProps {
  userRole: string
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ userRole }) => {
  const [songs, setSongs] = useState<Song[]>(mockSongs)
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(mockSongs)
  const [showAddForm, setShowAddForm] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    album: '',
    artist: '',
    title: ''
  })
  const [sortBy, setSortBy] = useState<'title' | 'artist' | 'album' | 'year'>('title')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [groupBy, setGroupBy] = useState<'none' | 'album' | 'artist' | 'year'>('none')

  // Apply filters and sorting
  useEffect(() => {
    let result = [...songs]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(song => 
        song.title.toLowerCase().includes(searchLower) ||
        song.artist.toLowerCase().includes(searchLower) ||
        song.album.toLowerCase().includes(searchLower)
      )
    }

    // Apply specific filters
    if (filters.album) {
      result = result.filter(song => song.album === filters.album)
    }
    if (filters.artist) {
      result = result.filter(song => song.artist === filters.artist)
    }
    if (filters.title) {
      result = result.filter(song => song.title === filters.title)
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    setFilteredSongs(result)
  }, [songs, filters, sortBy, sortOrder])

  const addSong = (newSong: Omit<Song, 'id'>) => {
    const song: Song = {
      ...newSong,
      id: Date.now().toString()
    }
    setSongs(prev => [...prev, song])
    setShowAddForm(false)
  }

  const deleteSong = (id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id))
  }

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  const isAdmin = userRole === 'admin'

  return (
    <div className="music-library">
      <div className="library-header">
        <h2>🎵 Music Library</h2>
        {isAdmin && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="add-song-btn"
          >
            + Add Song
          </button>
        )}
      </div>

      <StatsDisplay songs={filteredSongs} totalSongs={songs.length} />

      <FilterControls
        filters={filters}
        onFilterChange={updateFilters}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={toggleSortOrder}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        songs={songs}
      />

      {showAddForm && (
        <SongForm
          onSubmit={addSong}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <SongList
        songs={filteredSongs}
        onDeleteSong={isAdmin ? deleteSong : undefined}
        groupBy={groupBy}
      />
    </div>
  )
}

export default MusicLibrary
