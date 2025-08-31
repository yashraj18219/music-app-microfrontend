import React, { Suspense } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import MusicLibraryWrapper from './components/MusicLibraryWrapper'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={<div className="loading">Loading Music Library...</div>}>
            <MusicLibraryWrapper />
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
