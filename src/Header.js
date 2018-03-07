import React from 'react'
import './Header.css'

export default ({ onMenuClick }) => (
  <header className="app-header">
    <nav>
      <button className="hamburger-menu" onClick={onMenuClick} />
    </nav>
    <h1 className="title">Freelancer</h1>
  </header>
)
