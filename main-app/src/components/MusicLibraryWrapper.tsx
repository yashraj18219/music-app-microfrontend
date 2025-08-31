import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './MusicLibraryWrapper.css'

// Type for the remote music library component
interface MusicLibraryComponent {
  default: React.ComponentType<{ userRole: string }>
}

const MusicLibraryWrapper: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const [MusicLibrary, setMusicLibrary] = useState<React.ComponentType<{ userRole: string }> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMusicLibrary = async () => {
      try {
        // Dynamic import of the remote music library
        const module = await import('music-library/MusicLibrary') as MusicLibraryComponent
        setMusicLibrary(() => module.default)
        setError(null)
      } catch (err) {
        console.error('Failed to load music library:', err)
        setError('Failed to load music library. Please check if the micro frontend is running.')
      }
    }

    if (isAuthenticated) {
      loadMusicLibrary()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please login to access the music library.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Music Library</h2>
        <p>{error}</p>
        <p>Make sure the music library micro frontend is running on port 5174.</p>
      </div>
    )
  }

  if (!MusicLibrary) {
    return (
      <div className="loading-container">
        <h2>Loading Music Library...</h2>
        <p>Please wait while we load the music library micro frontend.</p>
      </div>
    )
  }

  return (
    <div className="music-library-container">
      <MusicLibrary userRole={user?.role || 'user'} />
    </div>
  )
}

export default MusicLibraryWrapper
