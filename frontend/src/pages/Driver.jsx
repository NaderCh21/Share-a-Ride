import React, { useState } from 'react';
import { Bell, Calendar, MapPin, CheckCircle, XCircle, AlertTriangle, Phone, Star, MessageSquare, User, Users } from 'lucide-react';
import '../styles/Driver.css';

// Dummy data for rides
const dummyRides = [
  {
    id: 1,
    passenger: {
      name: "Sarah Johnson",
      rating: 4.8,
      phone: "+961 71 123 456",
      profilePic: "https://i.pravatar.cc/150?img=1",
    },
    from: "LAU Beirut Campus",
    to: "Hamra",
    date: "2025-04-05",
    time: "08:30",
    status: "pending", // pending, approved, completed, cancelled
    price: 15000,
    notes: "I have a small luggage"
  },
  {
    id: 2,
    passenger: {
      name: "Ahmed Hassan",
      rating: 4.5,
      phone: "+961 76 789 012",
      profilePic: "https://i.pravatar.cc/150?img=2",
    },
    from: "LAU Byblos Campus",
    to: "Jounieh",
    date: "2025-04-05",
    time: "17:00",
    status: "approved",
    price: 35000,
    notes: ""
  },
  {
    id: 3,
    passenger: {
      name: "Maria Khoury",
      rating: 4.9,
      phone: "+961 03 456 789",
      profilePic: "https://i.pravatar.cc/150?img=3",
    },
    from: "LAU Beirut Campus",
    to: "Achrafieh",
    date: "2025-04-06",
    time: "14:15",
    status: "completed",
    price: 20000,
    notes: "Please wait at the main gate"
  },
  {
    id: 4,
    passenger: {
      name: "Omar Saleh",
      rating: 4.2,
      phone: "+961 78 234 567",
      profilePic: "https://i.pravatar.cc/150?img=4",
    },
    from: "LAU Byblos Campus",
    to: "Batroun",
    date: "2025-04-07",
    time: "16:45",
    status: "cancelled",
    price: 50000,
    notes: ""
  }
];

const Driver = () => {
  const [rides, setRides] = useState(dummyRides);
  const [activeTab, setActiveTab] = useState('pending');
  const [currentRide, setCurrentRide] = useState(null);
  const [sosModal, setSosModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [isRideActive, setIsRideActive] = useState(false);
  
  // Filter rides based on active tab
  const filteredRides = rides.filter(ride => {
    if (activeTab === 'pending') return ride.status === 'pending';
    if (activeTab === 'upcoming') return ride.status === 'approved';
    if (activeTab === 'completed') return ride.status === 'completed';
    if (activeTab === 'cancelled') return ride.status === 'cancelled';
    return true;
  });

  const handleAcceptRide = (id) => {
    setRides(prevRides => prevRides.map(ride => 
      ride.id === id ? {...ride, status: 'approved'} : ride
    ));
    alert("Ride accepted successfully!");
  };

  const handleRejectRide = (id) => {
    setRides(prevRides => prevRides.map(ride => 
      ride.id === id ? {...ride, status: 'cancelled'} : ride
    ));
    alert("Ride rejected successfully!");
  };

  const handleDeleteRide = (id) => {
    if (window.confirm("Are you sure you want to delete this ride? This should be done at least 24 hours before the scheduled time.")) {
      setRides(prevRides => prevRides.filter(ride => ride.id !== id));
      alert("Ride deleted successfully!");
    }
  };

  const handlePunchIn = (id) => {
    if (window.confirm("Are you starting this ride now?")) {
      setIsRideActive(true);
      const foundRide = rides.find(ride => ride.id === id);
      if (foundRide) {
        setCurrentRide(foundRide);
      }
      alert("Ride started! Be safe!");
    }
  };

  const handlePunchOut = () => {
    if (window.confirm("Are you ending this ride now?")) {
      setIsRideActive(false);
      setCurrentRide(null);
      setRatingModal(true);
    }
  };

  const handleSOS = () => {
    setSosModal(true);
  };

  const handleContactSupport = () => {
    window.open("mailto:support@share-a-ride-lau.com", "_blank");
  };

  const handleShowQR = (ride) => {
    setCurrentRide(ride);
    setShowQRModal(true);
  };

  const handleSubmitRating = () => {
    alert(`Thank you for your feedback! You rated ${rating} stars.`);
    setRatingModal(false);
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="driver-page">
      {/* Active ride banner */}
      {isRideActive && currentRide && (
        <div className="active-ride-banner">
          <div className="active-ride-info">
            <div className="passenger-pic">
              <img src={currentRide.passenger.profilePic} alt={currentRide.passenger.name} />
            </div>
            <div className="ride-details">
              <h3>Ride in progress with {currentRide.passenger.name}</h3>
              <p><MapPin size={14} /> {currentRide.from} to {currentRide.to}</p>
            </div>
          </div>
          <div className="active-ride-actions">
            <button className="sos-button" onClick={handleSOS}>
              <AlertTriangle size={16} /> SOS
            </button>
            <button className="punch-button" onClick={handlePunchOut}>
              Finish Ride
            </button>
          </div>
        </div>
      )}

      <header className="driver-header">
        <div className="header-content">
          <div className="header-left">
            <h1>My Rides</h1>
            <p>Manage your ride requests and scheduled rides</p>
          </div>
          <div className="header-right">
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <div className="driver-profile">
              <img src="https://i.pravatar.cc/150?img=8" alt="Driver" />
              <span>Alex Driver</span>
            </div>
          </div>
        </div>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === 'pending' ? 'active' : ''} 
          onClick={() => setActiveTab('pending')}
        >
          Pending Requests
        </button>
        <button 
          className={activeTab === 'upcoming' ? 'active' : ''} 
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Rides
        </button>
        <button 
          className={activeTab === 'completed' ? 'active' : ''} 
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={activeTab === 'cancelled' ? 'active' : ''} 
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className="rides-container">
        {filteredRides.length === 0 ? (
          <div className="no-rides">
            <div className="no-rides-icon">
              <Calendar size={48} />
            </div>
            <h3>No {activeTab} rides</h3>
            <p>When you get new ride requests or schedule rides, they will appear here.</p>
          </div>
        ) : (
          <div className="rides-list">
            {filteredRides.map(ride => (
              <div className={`ride-card ${ride.status}`} key={ride.id}>
                <div className="ride-header">
                  <div className="passenger-info">
                    <img src={ride.passenger.profilePic} alt={ride.passenger.name} />
                    <div>
                      <h3>{ride.passenger.name}</h3>
                      <div className="rating">
                        <Star size={14} fill="gold" stroke="gold" />
                        <span>{ride.passenger.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ride-price">
                    <span>{ride.price.toLocaleString()} LBP</span>
                  </div>
                </div>
                <div className="ride-details">
                  <div className="ride-locations">
                    <div className="location from">
                      <div className="location-dot from"></div>
                      <span>{ride.from}</span>
                    </div>
                    <div className="location-line"></div>
                    <div className="location to">
                      <div className="location-dot to"></div>
                      <span>{ride.to}</span>
                    </div>
                  </div>
                  <div className="ride-time">
                    <Calendar size={14} />
                    <span>{new Date(ride.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} at {ride.time}</span>
                  </div>
                  {ride.notes && (
                    <div className="ride-notes">
                      <p>Note: {ride.notes}</p>
                    </div>
                  )}
                </div>
                <div className="ride-actions">
                  {ride.status === 'pending' && (
                    <>
                      <button className="accept-btn" onClick={() => handleAcceptRide(ride.id)}>
                        <CheckCircle size={16} /> Accept
                      </button>
                      <button className="reject-btn" onClick={() => handleRejectRide(ride.id)}>
                        <XCircle size={16} /> Reject
                      </button>
                    </>
                  )}
                  {ride.status === 'approved' && (
                    <>
                      <button className="contact-btn" onClick={() => window.alert(`Calling ${ride.passenger.phone}`)}>
                        <Phone size={16} /> Call
                      </button>
                      <button className="qr-btn" onClick={() => handleShowQR(ride)}>
                        Show QR
                      </button>
                      <button className="punch-btn" onClick={() => handlePunchIn(ride.id)}>
                        Start Ride
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteRide(ride.id)}>
                        Delete
                      </button>
                    </>
                  )}
                  {ride.status === 'completed' && (
                    <div className="completed-label">
                      <CheckCircle size={16} /> Completed
                    </div>
                  )}
                  {ride.status === 'cancelled' && (
                    <div className="cancelled-label">
                      <XCircle size={16} /> Cancelled
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with support link */}
      <footer className="driver-footer">
        <button className="support-link" onClick={handleContactSupport}>
          <MessageSquare size={16} /> Contact Support
        </button>
      </footer>

      {/* SOS Modal */}
      {sosModal && (
        <div className="modal-overlay">
          <div className="modal sos-modal">
            <h2>Emergency Assistance</h2>
            <p>Do you need immediate help?</p>
            <div className="emergency-contacts">
              <button className="emergency-btn police" onClick={() => window.alert('Calling police...')}>
                Call Police
              </button>
              <button className="emergency-btn ambulance" onClick={() => window.alert('Calling ambulance...')}>
                Call Ambulance
              </button>
              <button className="emergency-btn support" onClick={() => window.alert('Calling LAU security...')}>
                Call LAU Security
              </button>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setSosModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {ratingModal && (
        <div className="modal-overlay">
          <div className="modal rating-modal">
            <h2>Rate Your Experience</h2>
            <p>How was your ride with {currentRide?.passenger?.name}?</p>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  size={30}
                  onClick={() => setRating(star)}
                  fill={rating >= star ? 'gold' : 'transparent'}
                  stroke={rating >= star ? 'gold' : 'currentColor'}
                  className="star"
                />
              ))}
            </div>
            <textarea 
              placeholder="Share your feedback (optional)" 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setRatingModal(false)}>Skip</button>
              <button className="submit-btn" onClick={handleSubmitRating}>Submit Rating</button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && currentRide && (
        <div className="modal-overlay">
          <div className="modal qr-modal">
            <h2>Verify Passenger</h2>
            <p>Let the passenger scan this QR code to verify your identity</p>
            <div className="qr-code">
              {/* This would be a real QR code in production */}
              <div className="qr-placeholder">
                <div className="qr-squares">
                  <div className="qr-square tl"></div>
                  <div className="qr-square tr"></div>
                  <div className="qr-square bl"></div>
                  <div className="qr-pattern"></div>
                </div>
                <div className="qr-id">ID: {currentRide.id}</div>
              </div>
            </div>
            <div className="ride-verification">
              <div className="verification-item">
                <User size={16} />
                <span>{currentRide.passenger.name}</span>
              </div>
              <div className="verification-item">
                <MapPin size={16} />
                <span>{currentRide.from} → {currentRide.to}</span>
              </div>
              <div className="verification-item">
                <Calendar size={16} />
                <span>{new Date(currentRide.date).toLocaleDateString()} at {currentRide.time}</span>
              </div>
            </div>
            <div className="modal-actions">
              <button className="close-btn" onClick={() => setShowQRModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Driver;
