import React, { useContext } from 'react'
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username') || '';
  const { logout } = useContext(GeneralContext);

  return (
    <header className="topbar">
      <div className="topbar-inner container">
        <div className="brand" onClick={() => navigate('/')}>
          <img src="/Logo.png" alt="AeroWave" className="brand-logo" />

          <div className="brand-text">
            <span className="brand-name">AeroWave</span>
            <span className="brand-tag">Flight experiences reimagined</span>
          </div>
        </div>

        <nav className="nav">
          {!usertype ? (
            <>
              <button className="navBtn" onClick={() => navigate('/')}>Home</button>
              <button className="navBtn" onClick={() => navigate('/auth')}>Sign in</button>
            </>
          ) : (
            <>
              {usertype === 'customer' && (
                <>
                  <button className="navBtn" onClick={() => navigate('/')}>Home</button>
                  <button className="navBtn" onClick={() => navigate('/bookings')}>My Bookings</button>
                </>
              )}

              {usertype === 'admin' && (
                <>
                  <button className="navBtn" onClick={() => navigate('/admin')}>Dashboard</button>
                  <button className="navBtn" onClick={() => navigate('/all-users')}>Users</button>
                  <button className="navBtn" onClick={() => navigate('/all-bookings')}>Bookings</button>
                  <button className="navBtn" onClick={() => navigate('/all-flights')}>Flights</button>
                </>
              )}

              {usertype === 'flight-operator' && (
                <>
                  <button className="navBtn" onClick={() => navigate('/flight-admin')}>Panel</button>
                  <button className="navBtn" onClick={() => navigate('/flight-bookings')}>Bookings</button>
                  <button className="navBtn" onClick={() => navigate('/flights')}>Flights</button>
                  <button className="navBtn" onClick={() => navigate('/new-flight')}>Add Flight</button>
                </>
              )}

              <div className="navProfile">
                <span className="profileName">{username}</span>
                <button className="navBtn small" onClick={logout}>Logout</button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
