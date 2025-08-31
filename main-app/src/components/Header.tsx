import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

const Header: React.FC = () => {
  const { user, login, logout, isAuthenticated } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  console.log("userName",username);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const success = await login(username, password)
    if (success) {
      setShowLogin(false)
      setUsername('')
      setPassword('')
    } else {
      setError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🎵 Music Library</h1>
        
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="username">Welcome, {user?.username}!</span>
              <span className="role">({user?.role})</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLogin(true)} 
              className="login-btn"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {showLogin && (
        <div className="login-modal">
          <div className="login-content">
            <h2>Login</h2>
            <p className="demo-credentials">
              Demo Credentials:<br/>
              <strong>Admin:</strong> admin / admin123<br/>
              <strong>User:</strong> user / user123
            </p>
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && <div className="error">{error}</div>}
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Login
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowLogin(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
