import React, { useState, useRef } from 'react';
import {User, Calendar, Star, MessageSquare, Car, Menu, ClockIcon, TagIcon, ArmchairIcon, Armchair, ArrowRight, Flag, X, Loader2 } from 'lucide-react';
import {Link} from 'react-router-dom';
import "./passenger_profile.css";
import "./App.css";

const UserProfileLayout = ({ sampleRides }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('My Rides');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const currentUserID = 1;
    const rating =3.5;
    const [selectedRide, setSelectedRide] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showReportForm, setShowReportForm] = useState(false);
    const [rideStarted, setRideStarted] = useState(false);
    const [rideEnded, setRideEnded] = useState(false);
    const [isSOSing, setIsSOSing] = useState(false); // New state for SOS loading
    const [sosError, setSosError] = useState(null);   // New state for SOS error
    const [sosSent, setSosSent] = useState(false); // New state for SOS
    //const [currentUserID, setCurrentUserID] = useState(123); // Example user ID

  
    const [loadingRideId, setLoadingRideId] = useState(null); // Track which ride action is loading
    const [error, setError] = useState(null); // General error state for API calls
    
    const bookedRides = sampleRides ? sampleRides.filter((ride) => ride.id === currentUserID) : [];


    // const bookings = [
    // { userId: 123, rideId: 1 },
    // { userId: 456, rideId: 2 },
    // { userId: 123, rideId: 3 },
    // ];

    // const bookedRideIds = bookings
    // .filter(booking => booking.userId === currentUserID)
    // .map(booking => booking.rideId);

    //const bookedRides = sampleRides.filter(ride => bookedRideIds.includes(ride.id));


    
 
const Modal = ({ children, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}
        onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '30px',
                    minWidth: '500px',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '22px',
                        cursor: 'pointer',
                        color: '#333',
                    }}
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};


    
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
        setShowFeedbackForm(false); // Close forms when a new ride is clicked
        setShowReportForm(false);
    };

    const openFeedbackForm = () => {
        setShowFeedbackForm(true);
        setShowReportForm(false);
        // console.log("openFeedbackForm called");
        // console.log("showFeedbackForm:", showFeedbackForm);
    };
    
    const openReportForm = () => {
        setShowReportForm(true);
        setShowFeedbackForm(false);
        // console.log("openReportForm called");
        // console.log("showReportForm:", showReportForm);
    };

    const closeActionForms = () => {
        setShowFeedbackForm(false);
        setShowReportForm(false);
        setSelectedRide(null); 
    };

    // SHOULD BE REMOVED WHEN BACKEND CONNECTED
    // const handleStartRide = () => {
    //     setRideStarted(true);
    //     console.log(`Ride ${rideId} started.`);
    // };
    

    const handleStartRide = () => {
        setRideStarted(true);
        console.log(`Ride ${rideId} started.`);
      };
    

      // THIS ALLOWS TAKING THE SOS rideId IN BODY SO IF YOU WANT TO CAHNGE SOMETHING FOR BODY CHANGE HERE 
      const handleSOS = (rideId) => {
        setSosSent(true); // If you added the state variable
        console.log(`SOS triggered for ride ${rideId}.`);
        // You might want to perform other local UI updates here
        alert(`SOS triggered for ride ${rideId}! (No actual API call is made yet)`);
      };

    // CHANGE IN THE BELOW FOR CONNECTING TO BACKEND AND WHEN DONE COMMENT THE handleStartRide function above

    // const handleStartRide = async (rideId) => {
    //     setIsStarting(true);
    //     setStartError(null);
    
    //     try {
    //         // const apiUrl = `http://localhost:YOUR_BACKEND_PORT/rides/${rideId}/start`; // Replace YOUR_BACKEND_PORT

    //         const apiurl = 'http://localhost:3000/getSpecificRide/${rideId}'
    
    //         const response = await fetch(apiUrl, {
    //             method: 'POST', // Or 'PATCH' depending on your backend
    //             headers: {
    //                 // Include authorization token if needed
    //                 // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    //             },
    //             // If your backend expects no body, remove this line.
    //             // If it expects an empty JSON body, use: body: JSON.stringify({})
    //         });
    
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(`Failed to start ride: ${response.status} - ${errorData?.message || response.statusText}`);
    //         }
    
    //         const responseData = await response.json();
    //         console.log('Ride started successfully:', responseData);
    //         setRideStarted(true); // Update local state on success
    //         // Optionally, update other relevant state based on the response
    //     } catch (error) {
    //         console.error('Error starting ride:', error);
    //         setStartError(error.message);
    //         // Display error to the user (handled in the button section)
    //     } finally {
    //         setIsStarting(false);
    //     }
    // };


    // SHOULD BE REMOVED WHEN BACKEND CONNECTED

    const handleEndRide = () => {
        if (rideStarted) {
            setRideEnded(true);
            console.log(`Ride ${rideId} ended.`);
        } else {
            alert('Please start the ride first.');
        }
    };
    

    // CHANGE IN THE BELOW FOR CONNECTING TO BACKEND AND WHEN DONE COMMENT THE handleEndRide function above

    // const handleEndRide = async (rideId) => {
    //     if (!rideStarted) {
    //         alert('Please start the ride first.');
    //         return;
    //     }
    
    //     setIsEnding(true);
    //     setEndError(null);
    
    //     try {
    //         // const apiUrl = `http://localhost:YOUR_BACKEND_PORT/rides/${rideId}/end`; // Replace YOUR_BACKEND_PORT

    //         const apiurl = 'http://localhost:3000/getSpecificRide/${rideId}';
    
    //         const response = await fetch(apiUrl, {
    //             method: 'POST', // Or 'PATCH' depending on your backend
    //             headers: {
    //                 'Content-Type': 'application/json', // Likely needed for POST/PATCH
    //                 // Include authorization token if needed
    //                 // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    //             },
    //             body: JSON.stringify({ rideId: rideId }), // Assuming backend expects rideId in the body for ending
    //         });
    
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(`Failed to end ride: ${response.status} - ${errorData?.message || response.statusText}`);
    //         }
    
    //         const responseData = await response.json();
    //         console.log('Ride ended successfully:', responseData);
    //         setRideEnded(true); // Update local state on success
    //         // Optionally, update other relevant state
    //     } catch (error) {
    //         console.error('Error ending ride:', error);
    //         setEndError(error.message);
    //         // Display error to the user (handled in the button section)
    //     } finally {
    //         setIsEnding(false);
    //     }
    // };



    //COMMENT THIS SECTION WHEN YOU USE THE BELOW const FeedbackForm
    const FeedbackForm = ({ rideId, onClose }) => {
        const [ratings, setRatings] = useState({
            overallExperience: 0,
            friendliness: 0,
            easeOfUse: 0,
            designSatisfaction:0,
            communication: 0
        });
       
        
        const [technicalIssues, setTechnicalIssues] = useState('');
        const [comments, setComments] = useState('');
        const [easeOfUse, setEaseOfUse] = useState(0);
        const [technicalIssueEncountered, setTechnicalIssueEncountered] = useState('');
        const [designSatisfaction, setDesignSatisfaction] = useState(0);
        const [easyToFindRide, setEasyToFindRide] = useState('');
        const [rideSmooth, setRideSmooth] = useState('');
        const [rideProblem, setRideProblem] = useState('');
        const [communication, setCommunication] = useState(0);
        const [feelSafe, setFeelSafe] = useState('');
        const [safetyExplanation, setSafetyExplanation] = useState('');
        const [trustSystem, setTrustSystem] = useState('');
        const [featuresSuggestion, setFeaturesSuggestion] = useState('');

    //COMMENT THIS SECTION WHEN YOU USE THE BELOW handleSubmit
        const handleSubmit = (event) => {
            event.preventDefault();
            console.log('Feedback submitted:', { 
                rideId,
                ratings,
                easeOfUse,
                technicalIssueEncountered,
                technicalIssues,
                designSatisfaction,
                easyToFindRide,
                rideSmooth,
                rideProblem,
                communication,
                feelSafe,
                safetyExplanation,
                trustSystem,
                featuresSuggestion,
                comments
            });
            onClose();
        };
        
        //THE SECTION RELATED TO THE FEEDBACK YOU HAVE TO CHECK WHICH METHOD YOU'RE USING IN BACKENF TO FIX, I CAN'T DO IT FOR YOU, I PROVIDED YOU WITH A POSSIBLE SUGGESTION IF USING FETCH

        // const FeedbackForm = ({ rideId, driverId, onClose }) => {
        //     const [ratings, setRatings] = useState({
        //       overallExperience: 0,
        //     });
          
        //     const [comments, setComments] = useState('');
          
        //     const handleSubmit = (event) => {
        //       event.preventDefault();
        //       const feedbackData = {
        //         ride_id: rideId,
        //         driver_id: driverId,
        //         ratings: {
        //           overall_experience: ratings.overallExperience,
        //         },
        //         comment: comments
        //       };
        //       console.log('Feedback submitted:', feedbackData);
        //       onClose();
        //     };


    
        const handleStarClick = (fieldName, rating) => {
            setRatings({ ...ratings, [fieldName]: rating });
        };
    
        const renderStarRating = (fieldName, questionText) => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    <span
                        key={i}
                        className={i <= ratings[fieldName] ? 'star active' : 'star'}
                        onClick={() => handleStarClick(fieldName, i)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '24px',
                            color: i <= ratings[fieldName] ? '#fbc02d' : '#ccc',
                            direction: 'ltr',
                            display: 'inline-block',
                            transition: 'color 0.2s'
                        }}
                    >
                        ★
                    </span>
                );
            }
            return (
                <div className="form-group">
                    <label>{questionText}</label>
                    <div className="star-rating">
                        <span className="star-label">{ratings[fieldName]} </span>
                        {stars}
                    </div>
                </div>
            );
        };
    
        return (
            <Modal onClose={onClose}>

                
                <h2 style={{ marginBottom: '20px', color: '#2e7d32', textAlign: 'center' }}>
                    Give Feedback for Ride
                </h2>
        
                <form onSubmit={handleSubmit}>
                    
                    {/*
                    🌟 User Experience Section
                    <h3 style={{ color: '#2e7d32' }}>🌟 User Experience</h3>
        
                    {renderStarRating('easeOfUse', '1. How easy was it to use the website?')}

        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label>2. Did you face any technical issues?</label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '8px', marginLeft:'15px' }}>
                            {['Yes', 'No'].map((option) => (
                                <div key={option} style={{ alignItems: 'center' }}>
                                    <input
                                        type="radio"
                                        id={`tech-issue-${option}`}
                                        name="technicalIssueEncountered"
                                        value={option}
                                        onChange={(e) => setTechnicalIssueEncountered(e.target.value)}
                                        style={{ marginRight: '5px'}}
                                    />
                                    <label htmlFor={`tech-issue-${option}`}>{option}</label>
                                </div>
                            ))}
                        </div>

                        {/* Show textarea if "Yes" */}
                        {/*}
                        {technicalIssueEncountered === 'Yes' && (
                            <textarea
                                id="technicalIssues"
                                name="technicalIssues"
                                value={technicalIssues}
                                onChange={(e) => setTechnicalIssues(e.target.value)}
                                placeholder="Please describe the technical issue..."
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', borderColor: '#ccc', marginTop: '10px' }}
                            />
                        )}
                    </div>

        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        
                        {renderStarRating('designSatisfaction', '3. How satisfied are you with the overall design and navigation?')}

                    </div>
        
                    {/* 🚗 Carpooling Experience Section */}
                    {/*}
                    <h3 style={{ marginTop: '25px', color: '#2e7d32' }}>🚗 Carpooling Experience</h3>
        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label>4. Was it easy to find a suitable ride?</label>
                        <div style={{ display: 'flex', gap: '30px', marginTop: '8px', marginLeft: '15px' }}>
                        {['Yes', 'No'].map((option) => (
                                <div key={option} style={{ alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id={`ride-find-${option}`}
                                    name="easyToFindRide"
                                    value={option}
                                    onChange={(e) => setEasyToFindRide(e.target.value)}
                                />
                                <label htmlFor={`ride-find-${option}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                    </div>
        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label>5. Was your ride experience smooth and reliable?</label>
                        <div style={{ display: 'flex', gap: '30px', marginTop: '8px', marginLeft: '15px' }}>
                        {['Yes', 'No'].map((option) => (                            <div key={option}>
                                <input
                                    type="radio"
                                    id={`ride-smooth-${option}`}
                                    name="rideSmooth"
                                    value={option}
                                    onChange={(e) => setRideSmooth(e.target.value)}
                                />
                                <label htmlFor={`ride-smooth-${option}`}>{option}</label>
                            </div>
                        ))}
                        </div>
                        
                        {rideSmooth === 'No' && (
                            <textarea
                                id="rideProblem"
                                name="rideProblem"
                                value={rideProblem}
                                onChange={(e) => setRideProblem(e.target.value)}
                                placeholder="What went wrong during your ride?"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', borderColor: '#ccc', marginTop: '5px' }}
                            />
                        )}
                    </div>
        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                    {renderStarRating('communication', '6. How would you rate the communication with your driver/passenger?')}

                       
                    </div>
        
                    {/* 🔐 Safety and Trust Section */}
                    {/*}
                    <h3 style={{ marginTop: '25px', color: '#2e7d32' }}>🔐 Safety and Trust</h3>
        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label>7. Did you feel safe using the platform?</label>
                        <div style={{ display: 'flex', gap: '30px', marginTop: '8px', marginLeft: '15px' }}>
                        {['Yes', 'No'].map((option) => (                              <div key={option}>
                                <input
                                    type="radio"
                                    id={`safe-${option}`}
                                    name="feelSafe"
                                    value={option}
                                    onChange={(e) => setFeelSafe(e.target.value)}
                                />
                                <label htmlFor={`safe-${option}`}>{option}</label>
                            </div>
                        ))}
                        </div>
                        {feelSafe === 'No' && (
                            <textarea
                                id="safetyExplanation"
                                name="safetyExplanation"
                                value={safetyExplanation}
                                onChange={(e) => setSafetyExplanation(e.target.value)}
                                placeholder="Please explain why you didn't feel safe..."
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', borderColor: '#ccc', marginTop: '5px' }}
                            />
                        )}
                    </div>
        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label>8. Is the feedback system helpful in building trust?</label>
                        <div style={{ display: 'flex', gap: '30px', marginTop: '8px', marginLeft: '15px' }}>
                        {['Yes', 'No', 'Needs Improvement'].map((option) => (                              
                            <div key={option}>
                                <input
                                    type="radio"
                                    id={`trust-${option}`}
                                    name="trustSystem"
                                    value={option}
                                    onChange={(e) => setTrustSystem(e.target.value)}
                                />
                                <label htmlFor={`trust-${option}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                    </div>
        
                    {/* 💡 Suggestions Section */}
                    {/*}
                    <h3 style={{ marginTop: '25px', color: '#2e7d32' }}>💡 Suggestions and Improvements</h3>
        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label htmlFor="featuresSuggestion">9. What features would you like to see added?</label>
                        <textarea
                            id="featuresSuggestion"
                            name="featuresSuggestion"
                            value={featuresSuggestion}
                            onChange={(e) => setFeaturesSuggestion(e.target.value)}
                            placeholder="Suggest new features you'd like to see..."
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', borderColor: '#ccc', marginTop: '5px' }}
                        />
                    </div>
                    */}
        
                    <div className="form-group" style={{ marginTop: '15px' }}>
                    {renderStarRating('overallExperience', 'How would you rate the overall experience?')}

                       
                    </div>

                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label htmlFor="comments">Any comments or suggestions?</label>
                        <textarea
                            id="comments"
                            name="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Write any other feedback..."
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', borderColor: '#ccc', marginTop: '5px' }}
                        />
                    </div>

                    
        
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#2e7d32',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </Modal>
        );
    };
        
    
    
    
    
    //COMMENT THIS SECTION WHEN YOU USE THE BELOW const ReportForm
    const ReportForm = ({ rideId, onClose }) => {
        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(`Report submitted for ride ${rideId}`);
            onClose(); // Close the form
        };


        //THE SECTION RELATED TO THE REPORT AND FEEDBACK YOU HAVE TO CHECK WHICH METHOD YOU'RE USING IN BACKENF TO FIX, I CAN'T DO IT FOR YOU, I PROVIDED YOU WITH A POSSIBLE SUGGESTION IF USING FETCH

        // const ReportForm = ({ rideId, driverId, onClose }) => {
        //     const [reason, setReason] = useState('');
        //     const [details, setDetails] = useState('');
        //     const [privacy, setPrivacy] = useState(false);
          
        //     const handleSubmit = (event) => {
        //       event.preventDefault();
        //       const reportData = {
        //         ride_id: rideId,
        //         driver_id: driverId,
        //         reason: reason,
        //         details: details,
        //         keep_identity_private: privacy,
        //       };
        //       console.log('Report submitted:', reportData);
        //       onClose();
        //     };


        return (
            <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: '25px', color: '#27ae60', textAlign: 'center' }} className="report-form-title">Report an Issue </h2>  
                <div style={{ marginBottom: '15px' }}>
                    <label>Issue Type:</label><br />
                    <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                                <option>Driver behavior</option>
                                <option>Passenger behavior</option>
                                <option>Safety concerns</option>
                                <option>Vehicle issues</option>
                                <option>Ride mismatch</option>
                                <option>No-show</option>
                                <option>Harassment</option>
                                <option>Other</option>
                    </select>
                </div>
    
                {/* <div style={{ marginBottom: '15px' }}>
                    <label>Severity:</label><br />
                    <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                    </select>
                </div> */}

                {/* <div style={{ marginBottom: '15px' }}>
                            <label>Who caused the issue?</label><br />
                            <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                                <option>Driver</option>
                                <option>Passenger</option>
                            </select>
                        </div> */}
    
                <div style={{ marginBottom: '15px' }}>
                    <label>Description:</label><br />
                    <textarea
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '120px' }}
                        placeholder="Explain the issue in detail..."
                    />
                </div>
                {/* <div style={{ marginBottom: '15px' }}>
                            <label>Photo Upload (optional):</label><br />
                            <input type="file" style={{ width: '100%' }} />
                        </div> */}

                        {/* <div style={{ marginBottom: '15px' }}>
                            <label>
                                <input type="checkbox" style={{ marginRight: '5px' }} />
                                I want to be contacted about this report
                            </label>
                        </div> */}

                        {/* <div style={{ marginBottom: '15px' }}>
                            <label>Preferred Contact Method:</label><br />
                            <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                                <option>Email</option>
                                <option>Phone</option>
                            </select>
                        </div> */}

                        <div style={{ marginBottom: '15px' }}>
                            <label>
                                <input type="checkbox" style={{ marginRight: '5px' }} />
                                Keep my identity private (optional)
                            </label>
                        </div>
    
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="submit" style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                        Submit Report
                    </button>
                </div>
            </form>
        );
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

                                    style={{

                                        cursor: 'pointer',

                                        marginBottom: '10px',

                                        borderRadius: '8px',

                                        border: '1px solid #ddd',

                                        backgroundColor: 'white',

                                        padding: '15px',

                                    }}

                                   

                                >

                                    <div className="ride-overview">

                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                                            <div className="driver-info-left" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>

                                                <img

                                                    src="https://via.placeholder.com/40"

                                                    alt="Driver"

                                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}

                                                />

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

               

                                            <div className="ride-actions" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>

                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>

       

    </div>

    <div className="ride-actions" style={{ marginTop: '5px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'transparent', width: '100%', alignItems: 'stretch',

 }}>



    {/*START COMMENT HERE  */}



   {!rideStarted && (
  <button
    className={ride.status === 'pending' ? 'button-disabled' : 'button-blue'}
    onClick={(e) => { e.stopPropagation(); handleStartRide(ride.id); }}
    disabled={ride.status === 'pending'}
  >
    {ride.status === 'pending' ? 'Pending Confirmation' : 'Start Ride'}
  </button>
)}



{rideStarted && !rideEnded && (

    <>

        <button

            className="button-orange"

            onClick={(e) => { e.stopPropagation(); handleEndRide(ride.id); }}

        >

            End Ride

        </button>

        <button

            className="button-red"

            onClick={(e) => { e.stopPropagation(); handleSOS(ride.id); }}

        >

            SOS

        </button>

    </>

)}



    {/* END COMMENT HERE */}



{/* FOR THE CONNECTION TO WORK FOR THE START AND END RIDE COMMENT THE ABOVE SECTION AND UNCOMMENGT THE BELOW ONE  */}



{/* START COMMENT */}

{/*

{!rideStarted && (
  <button
    className={ride.status === 'pending' ? 'button-disabled' : 'button-blue'}
    onClick={(e) => { e.stopPropagation(); handleStartRide(ride.id); }}
    disabled={isStarting || ride.status === 'pending'}
  >
    {ride.status === 'pending' ? 'Pending Confirmation' : (isStarting ? 'Starting...' : 'Start Ride')}
  </button>
)}



    {rideStarted && !rideEnded && (
        <button
        className="button-orange"
            onClick={(e) => { e.stopPropagation(); handleEndRide(ride.id); }}
            disabled={isEnding} // Disable while ending

        >
            {isEnding ? 'Ending...' : 'End Ride'}

        </button>


        <button

            className="button-red" // You'll need to define this CSS class
            onClick={(e) => { e.stopPropagation(); handleSOS(ride.id); }}
            disabled={isSOSing} // Add disabled state for SOS
            style={{ marginLeft: '10px' }} // Add some spacing
        >

            {isSOSing ? 'Sending SOS...' : 'SOS'}
        </button>



    )}

        {startError && <p style={{ color: 'red' }}>Error starting ride: {startError}</p>}

        {endError && <p style={{ color: 'red' }}>Error ending ride: {endError}</p>} */}

{/* END COMMENT HERE */}





    {rideEnded && (

        <>

            <button onClick={(e) => { e.stopPropagation(); openFeedbackForm(ride); }}

                className="button-blue"

                >Give Feedback</button>

            <button onClick={(e) => { e.stopPropagation(); openReportForm(ride); }}    

                className="button-orange"

                >Report Issue</button>

        </>

    )}

</div>

 </div>



{showFeedbackForm && ride?.id === ride.id && (

    <Modal onClose={closeActionForms}>

        <FeedbackForm rideId={ride.id} onClose={closeActionForms} />

    </Modal>

)}



{showReportForm && ride?.id === ride.id && (

    <Modal onClose={closeActionForms}>

        <ReportForm rideId={ride.id} onClose={closeActionForms} />

    </Modal>

)}


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
    { id: 1, from: "Jounieh", to: "Byblos", date: "2025-04-05", time: "10:00 AM", driver: { name: 'John Doe', major: "Engineering", rating: 4.5 }, vehicle: { make: "Toyota", model: "Camry", color: "Silver" }, seats_available: 2, total_seats: 4, status: 'confirmed' },
    { id: 2, from: "Beirut", to: "Byblos", date: "2025-04-06", time: "8:30 AM", driver: { name: 'Jane Doe', major: "Biology", rating: 4 }, vehicle: { make: "BMW", model: "X2", color: "Navy" }, seats_available: 1, total_seats: 3, status: 'pending' },
    { id: 3, from: "Dbayeh", to: "Beirut", date: "2025-04-07", time: "2:00 PM", driver: { name: 'David Doe', major: "Business", rating: 3.5 }, vehicle: { make: "Mercedes Benz", model: "C300", color: "Black" }, seats_available: 2, total_seats: 5, status: 'confirmed' },
    { id: 4, from: "Jounieh", to: "Byblos", date: "2025-04-05", time: "1:00 PM", driver: { name: 'John Doe', major: "Engineering", rating: 4.5 }, vehicle: { make: "Toyota", model: "Camry", color: "Silver" }, seats_available: 2, total_seats: 4, status: 'pending' },
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
