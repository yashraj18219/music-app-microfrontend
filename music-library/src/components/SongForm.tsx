import React, { useState } from 'react'
import './SongForm.css'

interface SongFormProps {
  onSubmit: (song: Omit<Song, 'id'>) => void
  onCancel: () => void
}

interface Song {
  title: string
  artist: string
  album: string
  year: number
  genre: string
  duration: string
  rating: number
}

const SongForm: React.FC<SongFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Song>({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    genre: 'Rock',
    duration: '3:30',
    rating: 5
  })

  const [errors, setErrors] = useState<Partial<Song>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Song> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required'
    }
    if (!formData.album.trim()) {
      newErrors.album = 'Album is required'
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear()) {
      newErrors.year = 'Year must be between 1900 and current year'
    }
    if (!formData.duration.match(/^\d+:\d{2}$/)) {
      newErrors.duration = 'Duration must be in format MM:SS'
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof Song, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="song-form-overlay">
      <div className="song-form">
        <h3>➕ Add New Song</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="artist">Artist *</label>
              <input
                type="text"
                id="artist"
                value={formData.artist}
                onChange={(e) => handleChange('artist', e.target.value)}
                className={errors.artist ? 'error' : ''}
              />
              {errors.artist && <span className="error-text">{errors.artist}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="album">Album *</label>
              <input
                type="text"
                id="album"
                value={formData.album}
                onChange={(e) => handleChange('album', e.target.value)}
                className={errors.album ? 'error' : ''}
              />
              {errors.album && <span className="error-text">{errors.album}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <input
                type="number"
                id="year"
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                min="1900"
                max={new Date().getFullYear()}
                className={errors.year ? 'error' : ''}
              />
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
              >
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Jazz">Jazz</option>
                <option value="Classical">Classical</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Folk">Folk</option>
                <option value="Blues">Blues</option>
                <option value="R&B">R&B</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration *</label>
              <input
                type="text"
                id="duration"
                placeholder="3:30"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className={errors.duration ? 'error' : ''}
              />
              {errors.duration && <span className="error-text">{errors.duration}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= formData.rating ? 'active' : ''}`}
                  onClick={() => handleChange('rating', star)}
                >
                  ⭐
                </button>
              ))}
            </div>
            {errors.rating && <span className="error-text">{errors.rating}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Song
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SongForm
