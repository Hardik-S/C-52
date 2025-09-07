import React, { useState, useEffect } from 'react'
import './App.css'

// Apps data - easily expandable
const generateApps = () => {
  const themes = ['cat', 'space', 'data']
  const baseApps = [
    { id: 1, name: '52Apps Hub', theme: 'cat', unlockDate: '2025-01-01', 
      description: 'Central hub for all 52 apps. Your command center for weekly app releases.', 
      tech: 'React, Vite', status: 'live' },
    { id: 2, name: 'Cosmic Todo', theme: 'space', unlockDate: '2025-01-08', 
      description: 'Task management that reaches for the stars', 
      tech: 'React, LocalStorage', status: 'locked' },
    { id: 3, name: 'Data Garden', theme: 'data', unlockDate: '2025-01-15', 
      description: 'Visualize your data as a living ecosystem', 
      tech: 'D3.js, Canvas', status: 'locked' },
  ]
  
  // Generate remaining apps
  for (let i = 4; i <= 52; i++) {
    baseApps.push({
      id: i,
      name: `App #${i}`,
      theme: themes[(i - 1) % 3],
      unlockDate: new Date(2025, 0, 1 + (i - 1) * 7).toISOString().split('T')[0],
      description: 'Coming soon...',
      tech: 'TBD',
      status: 'locked'
    })
  }
  return baseApps
}

function App() {
  const [apps] = useState(generateApps())
  const [selectedApp, setSelectedApp] = useState(null)
  const [email, setEmail] = useState('')
  const [ritualData, setRitualData] = useState({})
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Generate stars for background
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }))
    setStars(newStars)
    
    // Load saved ritual data
    const saved = localStorage.getItem('ritualData')
    if (saved) setRitualData(JSON.parse(saved))
  }, [])

  const isAppUnlocked = (unlockDate) => {
    return new Date() >= new Date(unlockDate)
  }

  const getThemeGradient = (theme) => {
    const gradients = {
      cat: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
      space: 'linear-gradient(135deg, #4361ee, #7209b7)',
      data: 'linear-gradient(135deg, #06ffa5, #00b4d8)'
    }
    return gradients[theme] || gradients.cat
  }

  const handleMorningRitual = () => {
    const intention = prompt("What's your main intention for today?")
    const promise = prompt("What promise will you keep to yourself?")
    const gesture = prompt("What gesture of kindness will you make?")
    
    const ritual = {
      date: new Date().toISOString(),
      intention,
      promise,
      gesture
    }
    
    const updated = { ...ritualData, [Date.now()]: ritual }
    setRitualData(updated)
    localStorage.setItem('ritualData', JSON.stringify(updated))
    alert('Morning ritual complete! Your intentions are set.')
  }

  const handleDeepResearch = () => {
    const topic = prompt("What would you like to research deeply today?")
    if (topic) {
      const research = {
        date: new Date().toISOString(),
        topic,
        notes: ''
      }
      const updated = { ...ritualData, [`research_${Date.now()}`]: research }
      setRitualData(updated)
      localStorage.setItem('ritualData', JSON.stringify(updated))
      window.open(`https://www.google.com/search?q=${encodeURIComponent(topic)}`, '_blank')
    }
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    localStorage.setItem('subscription', email)
    alert(`Welcome! You're subscribed with: ${email}`)
    setEmail('')
  }

  return (
    <div className="app">
      {/* Animated stars background */}
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">52Apps</div>
        <div className="nav-links">
          <a href="#apps">Apps</a>
          <a href="#command">Command</a>
          <a href="#subscribe">Subscribe</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>52 Apps in 52 Weeks</h1>
        <p>A journey through creativity, code, and cosmic cats</p>
      </section>

      {/* Command Center */}
      <section className="command-center" id="command">
        <h2>🚀 Command Center</h2>
        <div className="ritual-buttons">
          <button onClick={handleMorningRitual}>☀️ Morning Ritual</button>
          <button onClick={handleDeepResearch}>🔬 Deep Research</button>
          <button onClick={() => console.log(ritualData)}>📚 View Archive</button>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="apps-section" id="apps">
        <h2>The Collection</h2>
        <div className="apps-grid">
          {apps.map(app => {
            const unlocked = isAppUnlocked(app.unlockDate)
            return (
              <div
                key={app.id}
                className={`app-tile ${unlocked ? app.theme : 'locked'}`}
                onClick={() => unlocked && setSelectedApp(app)}
                style={unlocked ? { background: getThemeGradient(app.theme) } : {}}
              >
                <div className="app-number">#{app.id}</div>
                <div className="app-name">{unlocked ? app.name : '???'}</div>
                <div className="app-date">{new Date(app.unlockDate).toLocaleDateString()}</div>
                {!unlocked && <div className="lock-icon">🔒</div>}
              </div>
            )
          })}
        </div>
      </section>

      {/* Subscription */}
      <section className="subscription" id="subscribe">
        <h2>🐱 Stay Connected</h2>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* App Modal */}
      {selectedApp && (
        <div className="modal" onClick={() => setSelectedApp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedApp(null)}>×</button>
            <h2>{selectedApp.name}</h2>
            <p>{selectedApp.description}</p>
            <p className="tech">Tech: {selectedApp.tech}</p>
            <div className="modal-actions">
              <button onClick={() => window.open(`/apps/${selectedApp.id}`, '_blank')}>
                Launch App
              </button>
              <button onClick={() => window.open(`https://github.com/yourusername/C-52/tree/main/apps/${selectedApp.id}`, '_blank')}>
                View Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
