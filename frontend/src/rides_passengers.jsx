import React, { useState } from "react";
import { MapPin, Calendar, Car, User, Users, Star, X, Menu} from "lucide-react"; 
import "./rides_passengers.css";
import "./passenger_profile.css";
import Modal from 'react-modal';
import {Link} from 'react-router-dom';


Modal.setAppElement('#root'); 

const AvailableRides = () => {
    const sampleRides = [
        { id: 1, from: "Jounieh", to: "Byblos", date: "2025-04-05", time: "10:00 AM", driver: {name: 'John Doe', major: "Engineering", rating: 4.5}, vehicle: {make: "Toyota", model: "Camry", color: "Silver"}, seats_available : 2, total_seats: 4},
        { id: 2, from: "Beirut", to: "Byblos", date: "2025-04-06", time: "8:30 AM", driver: {name: 'Jane Doe', major: "Biology", rating: 4}, vehicle: {make: "BMW", model: "X2", color: "Navy"}, seats_available : 1, total_seats: 3 },
        { id: 3, from: "Dbayeh", to: "Beirut", date: "2025-04-07", time: "2:00 PM", driver: {name: 'David Doe', major: "Business", rating: 3.5}, vehicle: {make: "Mercedes Benz", model: "C300", color: "Black"}, seats_available : 2, total_seats: 5 },
        { id: 4, from: "Jounieh", to: "Byblos", date: "2025-04-05", time: "1:00 PM", driver: {name: 'John Doe', major: "Engineering", rating: 4.5}, vehicle: {make: "Toyota", model: "Camry", color: "Silver"}, seats_available : 2, total_seats: 4},
    ];

    const [rides] = useState(sampleRides);
    const [isScrolled] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [filters, setFilters] = useState({
      date: "",
      time: "",
      rating: "",
      from: "",
      to: "",
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleBookRide = (ride) => {
        setSelectedRide(ride);
    };

    const closeModal = () => {
        setSelectedRide(null);
    };

    const handleFilterChange = (e) =>{
      setFilters({...filters, [e.target.name]: e.target.value});
    };

    const generateTimeOptions = () => {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
          let displayHour = hour % 12 || 12; 
          const period = hour < 12 ? 'AM' : 'PM';
          const time = `${displayHour.toString().padStart(2, '0')}:00 ${period}`;
          options.push(time);
      }
      return options;
      };

      const filteredRides = rides.filter((ride) => {
      const dateMatch = !filters.date || (() => {
          const rideDate = new Date(ride.date);
          const filterDate = new Date(filters.date);
          return rideDate.getTime() === filterDate.getTime();
      })();      
      
      const timeMatch = !filters.time || (() => {
        const parseTime = (timeString) => {
            const [time, period] = timeString.split(' ');
            let [hours, minutes] = time.split(':').map(Number);

            if (period === 'PM' && hours !== 12) {
                hours += 12;
            } else if (period === 'AM' && hours === 12) {
                hours = 0;
            }

            return hours * 60 + minutes;
        };

        const rideMinutes = parseTime(ride.time);
        const filterMinutes = parseTime(filters.time);

        return rideMinutes <= filterMinutes;
    })();


      const ratingMatch = !filters.rating || ride.driver.rating >= parseFloat(filters.rating);
      const startPointMatch = !filters.from || ride.from.toLowerCase()=== filters.from.toLowerCase();
      const destinationMatch = !filters.to || ride.to.toLowerCase()=== filters.to.toLowerCase();
  
      return dateMatch && timeMatch && ratingMatch && destinationMatch && startPointMatch;
    });

    
    return (
        <div className="profile-layout">
            <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-container">
                    <div className="logo">
                        <Car className="logo-icon" />
                        <h1>Share-A-Ride</h1>
                        <span className="logo-badge">LAU</span>
                    </div>

                    <nav className="desktop-nav-profile">
                        <Link to="/Home">Home</Link>
                        <Link to="/passenger-rides">Rides</Link>
                        <Link to="/passenger-profile">Profile</Link>
                    </nav>

                    <div className="nav-buttons">
                        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>

            <section id="available-rides" className="available-rides">
                <h2 className="rides-title">Find Your Ride!</h2>

                <div className="ride-filters">
                    <input type="date" name="date" value={filters.date} onChange={handleFilterChange} placeholder="Date" />
                    <select name="time" value={filters.time} onChange={handleFilterChange}>
                        <option value="">Time</option>
                        {generateTimeOptions().map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>

                    <input type="number" name="rating" value={filters.rating} onChange={handleFilterChange} placeholder="Rating" />
                    <input type="text" name="from" value={filters.from} onChange={handleFilterChange} placeholder="From" />
                    <input type="text" name="to" value={filters.to} onChange={handleFilterChange} placeholder="To" />
                </div>
                <div className="rides-container">
                    {filteredRides.map((ride) => (
                        <div key={ride.id} className="ride-card">
                            <div className="ride-icon">
                                <Car size={30} color="#4CAF50" />
                            </div>
                            <h3 className="ride-title">
                                <MapPin size={18} /> {ride.from} → {ride.to}
                            </h3>
                            <p className="ride-date">
                                <Calendar size={16} /> {ride.date}
                            </p>
                            <p className="ride-driver">
                                <User size={16} /> Driver: {ride.driver.name}
                            </p>
                            <p className="ride-seats">
                                <Users size={16} /> Seats: {ride.seats_available}/{ride.total_seats}
                            </p>
                            <button className="book-ride-button"
                                onClick={() => handleBookRide(ride)}>Book Ride</button>
                        </div>
                    ))}
                </div>

                <Modal isOpen={!!selectedRide} onRequestClose={closeModal}>
                    {selectedRide && (
                        <div className="ride-card ride-details-modal">
                            <div className="ride-icon">
                                <Car size={30} color="#4CAF50" />
                            </div>
                            <h3 className="ride-title">
                                <MapPin size={18} /> {selectedRide.from} → {selectedRide.to}
                            </h3>
                            <p className="ride-date">
                                <Calendar size={16} /> {selectedRide.date}, {selectedRide.time}
                            </p>
                            <p className="driver-info">
                                <User size={16} /> Driver: {selectedRide.driver.name}
                            </p>
                            <p>
                                Major: {selectedRide.driver.major}
                            </p>
                            <p>
                                <Star size={16} color="gold" /> Rating: {selectedRide.driver.rating}
                            </p>

                            <div className="vehicle-info">
                                <p>Vehicle: {selectedRide.vehicle.make} {selectedRide.vehicle.model}</p>
                                <p>Color: {selectedRide.vehicle.color}</p>
                            </div>

                            <p className="ride-seats">
                                <Users size={16} /> Seats: {selectedRide.seats_available} / {selectedRide.total_seats}
                            </p>

                            {/* Booking Form or Button */}
                            <button className="book-ride-button book-now-button">Book Now</button>

                            <button onClick={closeModal} className="modal-close-button">
                                <X size={24} />
                            </button>
                        </div>
                    )}
                </Modal>

            </section>
        </div>
    );
};

export default AvailableRides;