import React from 'react'
import ReactDOM from 'react-dom/client'
import MusicLibrary from './MusicLibrary.tsx'
import './index.css'

// For standalone development
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MusicLibrary userRole="admin" />
  </React.StrictMode>,
)
