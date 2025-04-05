import React, { useState } from 'react';
import { User, Calendar, Star, MessageSquare, Car, Menu, ClockIcon, TagIcon, ArmchairIcon, Armchair, ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom';
import "./passenger_profile.css";
import "./App.css";


const UserProfileLayout = ({ sampleRides }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('SCHEDULE');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const currentUserID = 1;
    const rating =3.5;
    const [selectedRide, setSelectedRide] = useState(null);
        
    const bookedRides = sampleRides ? sampleRides.filter((ride) => ride.id === currentUserID) : [];

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleRideClick = (ride) => {
        setSelectedRide((prevRide) => (prevRide && prevRide.id === ride.id ? null : ride));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'SCHEDULE':
                return (
                    <div className="tab-content schedule-tab-redesigned">
                        <h3>My Course Schedule</h3>
                        <div className="schedule-table-wrapper">
                            <table className="schedule-table-redesigned">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        {daysOfWeek.map(day => (
                                            <th key={day}>{day.toUpperCase()}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map((timeSlotStart, index) => {
                                        const timeSlotEnd = timeSlots[index + 1];
                                        if (!timeSlotEnd) return null;

                                        return (
                                            <tr key={timeSlotStart}>
                                                <td className="time-column">{timeSlotStart}</td>
                                                {daysOfWeek.map(day => {
                                                    const course = sampleSchedule[day]?.find(
                                                        c => c.timeStart === timeSlotStart
                                                    );
                                                    return (
                                                        <td
                                                            key={day}
                                                            className={`schedule-cell ${course ? 'has-course' : ''}`}
                                                            style={course ? {
                                                                backgroundColor: '#b8f2e6', 
                                                                border: `1px solid #5cdb95` 
                                                            } : {}}
                                                        >
                                                            {course && (
                                                                <div>
                                                                    <div className="course-info">{course.course} | {course.section}</div>
                                                                    <div className="instructor">{course.instructor}</div>
                                                                </div>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

                case 'MY RIDES':
                    return (
                        <div className="tab-content">
                            <h3>My Rides</h3>
                            {bookedRides.map((ride) => (
                                <div
                                    key={ride.id}
                                    className={`ride-item ${selectedRide && selectedRide.id === ride.id ? 'active-ride' : ''}`}
                                    onClick={() => handleRideClick(ride)}
                                    style={{ cursor: 'pointer', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: 'white', padding: '15px' }}
                                >
                                    <div className="ride-overview">
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <div className="driver-info-left" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                                <img src="https://via.placeholder.com/40" alt="Driver" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                                <div>
                                                    <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>{ride.driver.name}</p>
                                                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8em', color: '#f39c12' }}>
                                                        {Array(5).fill('').map((_, index) => (
                                                            <Star key={index} size={14} style={{ marginRight: '2px' }} />
                                                        ))}
                                                        <span style={{ color: '#777', marginLeft: '5px' }}>(115 Reviews)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                            <div
                                                className={`location-icons ${!(selectedRide && selectedRide.id === ride.id) ? 'show-line' : ''}`}
                                                style={{ marginRight: '10px' }}
                                            >
                                                <div className="location-icon pickup-icon small"></div>
                                                <div className="location-icon drop-icon small" style={{ marginTop: '5px' }}></div>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '0.9em', color: '#555', marginBottom: '2px' }}>{ride.from}</p>
                                                <p style={{ fontSize: '0.9em', color: '#555' }}>{ride.to}</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9em', color: '#555' }}>
                                            <p>{ride.date}, {ride.time}</p>
                                            <p>{ride.vehicle.make} | {ride.vehicle.color}</p>
                                        </div>
                                    </div>

                                    {selectedRide && selectedRide.id === ride.id && (
                                        <div className="ride-details">
                                            <div className="locations">
                                                <h5 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Locations</h5>
                                                <div className="location-row">
                                                    <div className="location-icon pickup-icon"></div>
                                                    <span>{ride.from}</span>
                                                </div>
                                                <div className="location-row">
                                                    <div className="location-icon drop-icon"></div>
                                                    <span>{ride.to}</span>
                                                </div>
                                            </div>
                                            <div className="date-time">
                                                <h5 style={{ color: 'var(--primary)', marginBottom: '10px', marginTop: '15px' }}>Date & Timings</h5>
                                                <div className="detail-row">
                                                    <Calendar size={16} className="detail-icon" />
                                                    <span>{ride.date}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <ClockIcon size={16} className="detail-icon" />
                                                    <span>{ride.time}</span>
                                                </div>
                                            </div>
                                            <div className="fare-seats">
                                                <h5 style={{ color: 'var(--primary)', marginBottom: '10px', marginTop: '15px' }}>Details</h5>
                                                <div className="detail-row">
                                                
                                                    <ArmchairIcon size={16} className="detail-icon" />
                                                    <span>Seats Available: {ride.seats_available}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
    case 'REVIEWS':
        return (
            <div className="tab-content reviews-tab">
                <div className="rating-summary">
                    <h4 className="overall-rating">4.8 <Star size={16} fill="#f39c12" stroke="#f39c12" /></h4>
                    <p className="total-reviews">(115 Reviews)</p>
                    <div className="rating-breakdown">
                        <div className="rating-bar">
                            <span className="star-label">5 <Star size={14} fill="#f39c12" stroke="#f39c12" /></span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '80%' }}></div> 
                            </div>
                            <span className="count">56</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">4 <Star size={14} fill="#f39c12" stroke="#f39c12" /></span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '60%' }}></div>
                            </div>
                            <span className="count">32</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">3 <Star size={14} fill="#f39c12" stroke="#f39c12" /></span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '20%' }}></div>
                            </div>
                            <span className="count">10</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">2 <Star size={14} fill="#f39c12" stroke="#f39c12" /></span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '25%' }}></div>
                            </div>
                            <span className="count">12</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">1 <Star size={14} fill="#f39c12" stroke="#f39c12" /></span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '10%' }}></div>
                            </div>
                            <span className="count">5</span>
                        </div>
                    </div>
                </div>
    
                <div className="review-list">
                    <div className="review-item">
                        <div className="reviewer-info">
                            <img src="https://via.placeholder.com/40/808080/FFFFFF?Text=A" alt="Reviewer" className="reviewer-image" />
                            <div className="reviewer-details">
                                <h6 className="reviewer-name">Anthony Smith</h6>
                                <div className="review-rating">
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                </div>
                            </div>
                        </div>
                        <p className="review-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p className="review-date">15 April, 2017</p>
                    </div>
    
                    {/* Add more review items here */}
                    <div className="review-item">
                        <div className="reviewer-info">
                            <img src="https://via.placeholder.com/40/555555/FFFFFF?Text=B" alt="Reviewer" className="reviewer-image" />
                            <div className="reviewer-details">
                                <h6 className="reviewer-name">Another User</h6>
                                <div className="review-rating">
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                    <Star size={14} fill="#f39c12" stroke="#f39c12" />
                                    <Star size={14} fill="none" stroke="#f39c12" />
                                    <Star size={14} fill="none" stroke="#f39c12" />
                                </div>
                            </div>
                        </div>
                        <p className="review-text">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className="review-date">10 March, 2017</p>
                    </div>
    
                    {/* ... more reviews ... */}
                </div>
            </div>
        );
            default:
                return null;
        }
    };
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

            <div className="user-info">
            <div className="user-info-overlay"></div>

                <div className='user-info-container'>
                <img src="https://via.placeholder.com/150" className="user-image" />
                <div className="user-details">
                    <h2 className = "user-name">John Doe</h2>
                    <p className="user-major">Major: Engineering</p>
                </div>
                </div>
                <div className="user-stats">
                    
                    <div className="user-contact">
                    <p>📞 +961 70893768</p>
                    <p>✉️ john.doe@lau.edu</p>
                    </div>
                    <div className="user-rating">
                    <p>{rating.toFixed(1)}</p>
                    <div className="stars">
                        {[...Array(5)].map((_, index) => (
                            <Star 
                                key={index}
                                size={20}
                                fill={index < rating ? "white" : "none"} 
                                stroke="black"
                            />
                        ))}
                        </div>
                    </div>
                </div>
            </div>



            <div className="tab-buttons">
                <button
                    className={activeTab === 'SCHEDULE' ? 'active' : ''}
                    onClick={() => setActiveTab('SCHEDULE')}
                >
                    <Calendar size={20} /> Schedule
                </button>
                <button
                    className={activeTab === 'MY RIDES' ? 'active' : ''}
                    onClick={() => setActiveTab('MY RIDES')}
                >
                    <User size={20} /> My Rides
                </button>
                <button
                    className={activeTab === 'REVIEWS' ? 'active' : ''}
                    onClick={() => setActiveTab('REVIEWS')}
                >
                    <MessageSquare size={20} /> Reviews
                </button>
            </div>

            <div className="tab-content-container">
                {renderTabContent()}
            </div>
        </div>
    );
};

const sampleRides = [
    { id: 1, from: "Jounieh", to: "Byblos", date: "2025-04-05", time: "10:00 AM", driver: { name: 'John Doe', major: "Engineering", rating: 4.5 }, vehicle: { make: "Toyota", model: "Camry", color: "Silver" }, seats_available: 2, total_seats: 4 },
    { id: 2, from: "Beirut", to: "Byblos", date: "2025-04-06", time: "8:30 AM", driver: { name: 'Jane Doe', major: "Biology", rating: 4 }, vehicle: { make: "BMW", model: "X2", color: "Navy" }, seats_available: 1, total_seats: 3 },
    { id: 3, from: "Dbayeh", to: "Beirut", date: "2025-04-07", time: "2:00 PM", driver: { name: 'David Doe', major: "Business", rating: 3.5 }, vehicle: { make: "Mercedes Benz", model: "C300", color: "Black" }, seats_available: 2, total_seats: 5 },
    { id: 4, from: "Jounieh", to: "Byblos", date: "2025-04-05", time: "1:00 PM", driver: { name: 'John Doe', major: "Engineering", rating: 4.5 }, vehicle: { make: "Toyota", model: "Camry", color: "Silver" }, seats_available: 2, total_seats: 4 },
];

const sampleSchedule = {
    Monday: [
        { timeStart: '8:00 AM', timeEnd: '9:30 AM', course: 'ENT111', section: 'K204', instructor: 'Ms. Andrews' },
        { timeStart: '9:30 AM', timeEnd: '11:00 AM', course: 'LITT14', section: 'K204', instructor: 'Mr. Sawyer' },
        { timeStart: '11:30 AM', timeEnd: '1:00 PM', course: 'CHM101', section: 'B116', instructor: 'Dr. Chase' },
    ],
    Tuesday: [
        { timeStart: '10:30 AM', timeEnd: '12:00 PM', course: 'MATH101', section: 'B104', instructor: 'Ms. Sanchez' },
        { timeStart: '1:30 PM', timeEnd: '3:00 PM', course: 'CHM102', section: 'S211', instructor: 'Dr. Chase' },
    ],
    Wednesday: [
        { timeStart: '8:00 AM', timeEnd: '9:30 AM', course: 'ENT111', section: 'K204', instructor: 'Ms. Andrews' },
        { timeStart: '9:30 AM', timeEnd: '11:00 AM', course: 'LITT14', section: 'K204', instructor: 'Mr. Sawyer' },
        { timeStart: '11:30 AM', timeEnd: '1:00 PM', course: 'CHM101', section: 'B116', instructor: 'Dr. Chase' },
    ],
    Thursday: [
        { timeStart: '10:30 AM', timeEnd: '12:00 PM', course: 'MATH101', section: 'B104', instructor: 'Ms. Sanchez' },
        { timeStart: '1:30 PM', timeEnd: '3:00 PM', course: 'FA101', section: 'O307', instructor: 'Mr. Lawrence' },
    ],
    Friday: [
        { timeStart: '8:00 AM', timeEnd: '9:30 AM', course: 'ENT111', section: 'K204', instructor: 'Ms. Andrews' },
        { timeStart: '9:30 AM', timeEnd: '11:00 AM', course: 'LITT14', section: 'K204', instructor: 'Mr. Sawyer' },
        { timeStart: '11:30 AM', timeEnd: '1:00 PM', course: 'CHM101', section: 'B116', instructor: 'Dr. Chase' },
        { timeStart: '1:30 PM', timeEnd: '3:00 PM', course: 'INS301', section: 'C102', instructor: 'Ms. Lodge' },
    ],
    Saturday: [],
    Sunday: [],
};

const timeSlots = [
    '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];



const App = () => {
    return (
        <div>
            <UserProfileLayout sampleRides={sampleRides} />
        </div>
    );
};

export default App;