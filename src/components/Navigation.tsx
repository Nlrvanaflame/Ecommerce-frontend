import React from 'react'
import { Link } from 'react-router-dom'

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/products">Dashboard</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
