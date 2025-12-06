import React, { useContext, useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userType') === 'admin') navigate('/admin');
    else if (localStorage.getItem('userType') === 'flight-operator') navigate('/flight-admin');
  }, [navigate]);

  const [Flights, setFlights] = useState([]);
  const fetchFlights = async () => {
    setError('');
    
    if (departure === "" || destination === "" || !departureDate) {
      setError("Please fill required fields");
      return;
    }
    try {
      const res = await axios.get('http://localhost:6001/fetch-flights');
      setFlights(res.data);
    } catch (err) {
      setError("Failed to load flights");
    }
  }

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  const handleTicketBooking = (id, origin, destinationCity) => {
    if (!userId) return navigate('/auth');
    if (origin === departure) setTicketBookingDate(departureDate);
    else setTicketBookingDate(returnDate || departureDate);
    navigate(`/book-flight/${id}`);
  }

  return (
    <div className="landingPage aero-bg">
      <section className="hero container">
        <div className="hero-left">
          <h1>Fly Smarter with AeroWave</h1>
          <p>Search flights, compare fares and book instantly — a fresh approach to booking.</p>
        </div>

        <div className="hero-right glass">
          <div className="searchRow">
            <div className="field">
              <label>From</label>
              <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
                <option value="">Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="field">
              <label>To</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="field">
              <label>Depart</label>
              <input type="date" value={departureDate || ''} onChange={(e) => setDepartureDate(e.target.value)} />
            </div>

            <div className="field small">
              <label className="form-check-label">Return?</label>
              <input type="checkbox" checked={checkBox} onChange={(e) => setCheckBox(e.target.checked)} />
            </div>

            {checkBox && (
              <div className="field">
                <label>Return</label>
                <input type="date" value={returnDate || ''} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
            )}

            <div className="field">
              <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
            </div>
          </div>
          <div className="error">{error}</div>
        </div>
      </section>

      <main className="container">
        {Flights.length > 0 &&
          <section className="results">
            <h2>Available Flights</h2>
            <div className="flightsGrid">
              {Flights.filter(f => f.origin === departure && f.destination === destination).map((Flight) => (
                <div className="flightCard" key={Flight._id}>
                  <h4>{Flight.flightName}</h4>
                  <p><b>Flight No:</b> {Flight.flightId}</p>
                  <p><b>From:</b> {Flight.origin} — <b>To:</b> {Flight.destination}</p>
                  <p><b>Departure:</b> {Flight.departureTime} · <b>Arrival:</b> {Flight.arrivalTime}</p>
                  <p><b>Price:</b> ₹{Flight.basePrice}</p>
                  <button className="btn btn-primary" onClick={() => handleTicketBooking(Flight._id, Flight.origin, Flight.destination)}>Book Now</button>
                </div>
              ))}
            </div>
          </section>
        }
      </main>
    </div>
  )
}

export default LandingPage;
