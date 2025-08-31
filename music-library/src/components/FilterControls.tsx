import React from 'react'
import { Song } from '../types/Song'
import './FilterControls.css'

interface FilterControlsProps {
  filters: {
    search: string
    album: string
    artist: string
    title: string
  }
  onFilterChange: (filters: Partial<typeof filters>) => void
  sortBy: 'title' | 'artist' | 'album' | 'year'
  onSortByChange: (sortBy: 'title' | 'artist' | 'album' | 'year') => void
  sortOrder: 'asc' | 'desc'
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void
  groupBy: 'none' | 'album' | 'artist' | 'year'
  onGroupByChange: (groupBy: 'none' | 'album' | 'artist' | 'year') => void
  songs: Song[]
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  groupBy,
  onGroupByChange,
  songs
}) => {
  // Get unique values for dropdowns using map and filter
  const uniqueAlbums = [...new Set(songs.map(song => song.album))].sort()
  const uniqueArtists = [...new Set(songs.map(song => song.artist))].sort()
  const uniqueTitles = [...new Set(songs.map(song => song.title))].sort()

  const clearFilters = () => {
    onFilterChange({
      search: '',
      album: '',
      artist: '',
      title: ''
    })
  }

  const hasActiveFilters = filters.search || filters.album || filters.artist || filters.title

  return (
    <div className="filter-controls">
      <div className="filter-section">
        <h3>🔍 Search & Filters</h3>
        
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search songs..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="album">Album:</label>
            <select
              id="album"
              value={filters.album}
              onChange={(e) => onFilterChange({ album: e.target.value })}
            >
              <option value="">All Albums</option>
              {uniqueAlbums.map(album => (
                <option key={album} value={album}>{album}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="artist">Artist:</label>
            <select
              id="artist"
              value={filters.artist}
              onChange={(e) => onFilterChange({ artist: e.target.value })}
            >
              <option value="">All Artists</option>
              {uniqueArtists.map(artist => (
                <option key={artist} value={artist}>{artist}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="title">Title:</label>
            <select
              id="title"
              value={filters.title}
              onChange={(e) => onFilterChange({ title: e.target.value })}
            >
              <option value="">All Titles</option>
              {uniqueTitles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        )}
      </div>

      <div className="filter-section">
        <h3>📊 Sort & Group</h3>
        
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as 'title' | 'artist' | 'album' | 'year')}
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
              <option value="year">Year</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort Order:</label>
            <button
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className={`sort-order-btn ${sortOrder}`}
            >
              {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>

          <div className="filter-group">
            <label htmlFor="groupBy">Group By:</label>
            <select
              id="groupBy"
              value={groupBy}
              onChange={(e) => onGroupByChange(e.target.value as 'none' | 'album' | 'artist' | 'year')}
            >
              <option value="none">No Grouping</option>
              <option value="album">Album</option>
              <option value="artist">Artist</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterControls
