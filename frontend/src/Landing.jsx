import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Car, Users, Leaf, DollarSign, Clock, ChevronRight, Menu, X, MapPin, Calendar, Shield, Award } from 'lucide-react';
import './App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ users: 0, rides: 0, saved: 0 });
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);

  const testimonials = [
    {
      avatar: "A",
      content: "Share-A-Ride has saved me so much money on parking fees! I've also made great friends with my regular carpool group.",
      name: "Ahmed K.",
      role: "Computer Science, Year 3"
    },
    {
      avatar: "M",
      content: "As someone without a car, this platform has made it so easy to find rides to campus for my early morning classes.",
      name: "Maria L.",
      role: "Business Administration, Year 2"
    },
    {
      avatar: "J",
      content: "I love being able to reduce my carbon footprint while helping fellow students get to campus. Win-win!",
      name: "James R.",
      role: "Environmental Science, Year 4"
    },
    {
      avatar: "S",
      content: "The LAU Share-A-Ride app is a game-changer for commuting between campuses. Reliable and super convenient!",
      name: "Sara M.",
      role: "Engineering, Year 3"
    }
  ];

  useEffect(() => {
    // Handle scroll animations
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Fade in elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered delay based on element position
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Stats counter animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const animateStats = () => {
    const finalStats = { users: 1500, rides: 3200, saved: 840 };
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setAnimatedStats({
        users: Math.floor(progress * finalStats.users),
        rides: Math.floor(progress * finalStats.rides),
        saved: Math.floor(progress * finalStats.saved)
      });

      if (frame === totalFrames) clearInterval(counter);
    }, frameDuration);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Form submission handler with validation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = 'Message Sent!';
      submitBtn.classList.add('success');
      
      // Reset form
      setTimeout(() => {
        e.target.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
        submitBtn.classList.remove('success');
      }, 3000);
    }, 1500);
  };
  

  return (
    <div className="landing">
      {/* Floating notification */}
      <div className="floating-notification">
        <span>New rides available for next week!</span>
        <button aria-label="Close notification">×</button>
      </div>

      <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo">
            <Car className="logo-icon" />
            <h1>Share-A-Ride</h1>
            <span className="logo-badge">LAU</span>
          </div>
          
          <nav className="desktop-nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#stats">Stats</a>
            <a href="#contact">Contact</a>
          </nav>
          
          <div className="nav-buttons">
            <button className="btn btn-outline pulse-animation" onClick={() => navigate('/auth')}>Login</button>
            <button className="btn btn-primary" onClick={() => navigate('/auth')}>Sign Up</button>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu with improved animation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMobileMenu} aria-label="Close menu">
          <X />
        </button>
        <nav>
          <a href="#features" onClick={toggleMobileMenu}>Features</a>
          <a href="#how-it-works" onClick={toggleMobileMenu}>How It Works</a>
          <a href="#testimonials" onClick={toggleMobileMenu}>Testimonials</a>
          <a href="#stats" onClick={toggleMobileMenu}>Stats</a>
          <a href="#contact" onClick={toggleMobileMenu}>Contact</a>
          <div className="mobile-buttons">
            <button className="btn btn-outline" onClick={() => navigate('/auth')}>Login</button>
            <button className="btn btn-primary" onClick={() => navigate('/auth')}>Sign Up</button>
          </div>
        </nav>
        <div className="mobile-menu-footer">
          <p>LAU Share-A-Ride © {new Date().getFullYear()}</p>
        </div>
      </div>

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="badge-container">
            <span className="hero-badge">LAU Exclusive</span>
          </div>
          <h2 className="animate-slide-up">Campus Carpooling Made Simple</h2>
          <p className="animate-slide-up delay-200">Connect with fellow LAU students for affordable, eco-friendly rides to and from campus. Save money, reduce emissions, and make friends along the way.</p>
          <div className="hero-buttons animate-slide-up delay-400">
            <button className="btn btn-light btn-glow">
              Find a Ride <ChevronRight size={16} />
            </button>
            <button className="btn btn-outline-light">Offer a Ride</button>
          </div>
          <div className="hero-metrics animate-slide-up delay-600">
            <div className="metric">
              <span className="metric-value">1500+</span>
              <span className="metric-label">Students</span>
            </div>
            <div className="metric">
              <span className="metric-value">3200+</span>
              <span className="metric-label">Rides Shared</span>
            </div>
            <div className="metric">
              <span className="metric-value">840+</span>
              <span className="metric-label">CO₂ Saved</span>
            </div>
          </div>
        </div>
        <div className="hero-image animate-slide-in">
          <div className="pattern-overlay"></div>
          <div className="ride-finder">
            <div className="ride-finder-header">
              <Car className="finder-icon" />
              <h3>Find a ride now</h3>
            </div>
            <form>
              <div className="form-group">
                <label><MapPin size={14} /> Departure</label>
                <select>
                  <option value="">Select departure point</option>
                  <option>Main Campus</option>
                  <option>North Residence</option>
                  <option>Downtown</option>
                  <option>Byblos Campus</option>
                  <option>Beirut Campus</option>
                </select>
              </div>
              <div className="form-group">
                <label><MapPin size={14} /> Destination</label>
                <select>
                  <option value="">Select destination</option>
                  <option>South Campus</option>
                  <option>Library</option>
                  <option>Sports Center</option>
                  <option>Byblos Campus</option>
                  <option>Beirut Campus</option>
                </select>
              </div>
              <div className="form-group">
                <label><Calendar size={14} /> When</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-elevated">
                <span>Search Rides</span>
                <ChevronRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="scroll-indicator">
        <div className="mouse"></div>
        <p>Scroll down</p>
      </div>

      <section id="features" className="features">
        <h2 className="section-title animate-on-scroll">Why Choose Share-A-Ride?</h2>
        <div className="features-container">
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <Shield />
            </div>
            <h3>Verified LAU Users</h3>
            <p>Only registered LAU students and faculty can join, ensuring a safe and trusted community.</p>
          </div>
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <Leaf />
            </div>
            <h3>Eco-Friendly</h3>
            <p>Reduce your carbon footprint by sharing rides and contribute to a greener campus environment.</p>
          </div>
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <DollarSign />
            </div>
            <h3>Save Money</h3>
            <p>Split fuel costs and parking fees to make commuting between campuses more affordable.</p>
          </div>
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <Clock />
            </div>
            <h3>Time Efficient</h3>
            <p>Schedule rides that align with your class times and avoid waiting for public transportation.</p>
          </div>
        </div>
      </section>

      <section id="stats" className="stats-section" ref={statsRef}>
        <div className="stats-overlay"></div>
        <div className="stats-container">
          <h2 className="section-title light animate-on-scroll">Making an Impact</h2>
          <div className="stats-grid">
            <div className="stat-item animate-on-scroll">
              <span className="stat-value">{animatedStats.users}+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item animate-on-scroll">
              <span className="stat-value">{animatedStats.rides}+</span>
              <span className="stat-label">Rides Completed</span>
            </div>
            <div className="stat-item animate-on-scroll">
              <span className="stat-value">{animatedStats.saved}kg</span>
              <span className="stat-label">CO₂ Emissions Saved</span>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title animate-on-scroll">How It Works</h2>
        <div className="steps-container">
          <div className="step animate-on-scroll">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your profile with your LAU email and verify your student or faculty status.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step animate-on-scroll">
            <div className="step-number">2</div>
            <h3>Find or Offer</h3>
            <p>Search for available rides between Beirut and Byblos campuses or offer seats in your car.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step animate-on-scroll">
            <div className="step-number">3</div>
            <h3>Connect & Ride</h3>
            <p>Coordinate with your match through our secure messaging system, share the ride, and split costs.</p>
          </div>
        </div>
        <div className="video-demo animate-on-scroll">
          <div className="video-placeholder">
            <div className="play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
              </svg>
            </div>
            <p>Watch how it works</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2 className="section-title animate-on-scroll">What LAU Students Say</h2>
        
        <div className="testimonials-slider animate-on-scroll">
          <div className="testimonials-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-slide" key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-quote">"</div>
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-content">
                    <p>{testimonial.content}</p>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${currentTestimonial === index ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-overlay"></div>
        <div className="cta-content animate-on-scroll">
          <h2>Ready to join the LAU carpooling community?</h2>
          <p>Start saving money and reducing emissions on your daily commute between campuses.</p>
          <button className="btn btn-light btn-lg btn-glow">
            Get Started <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-container">
          <div className="contact-form animate-on-scroll">
            <h2>Get in Touch</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your LAU email" pattern=".*@lau\.edu\.lb$" title="Please use your LAU email" required />
                <small>Please use your @lau.edu.lb email</small>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="How can we help?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-elevated">Send Message</button>
            </form>
          </div>
          <div className="contact-info animate-on-scroll">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <strong>Email:</strong>
              <a href="mailto:support@shareride.lau.edu.lb">support@shareride.lau.edu.lb</a>
            </div>
            <div className="contact-item">
              <strong>Phone:</strong>
              <a href="tel:+9611786456">(01) 786-456</a>
            </div>
            <div className="contact-item">
              <strong>Office:</strong>
              <p>Student Center, Room 203<br />Beirut Campus</p>
            </div>
            <div className="contact-item">
              <strong>Hours:</strong>
              <p>Monday-Friday, 9am-5pm</p>
            </div>
            <div className="campus-select">
              <h4>Campus Directory</h4>
              <select onChange={(e) => window.location.href = e.target.value}>
                <option value="">Select a campus</option>
                <option value="#beirut">Beirut Campus</option>
                <option value="#byblos">Byblos Campus</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Car className="logo-icon" />
            <h3>Share-A-Ride</h3>
            <p>Making LAU campus commuting easier, greener, and more social.</p>
            <div className="app-badges">
              <a href="#" className="app-badge">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                Get Help
              </a>
              <a href="#" className="app-badge">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                Web App
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Navigation</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#stats">Stats</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Community Guidelines</a>
            </div>
            <div className="link-group">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
              <div className="newsletter">
                <h5>Subscribe to our newsletter</h5>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your LAU email" />
                  <button type="submit">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Share-A-Ride | Lebanese American University. All rights reserved.</p>
          <p className="footer-credit">Made by LAU COE students</p>
        </div>
        <div className="back-to-top">
          <a href="#" aria-label="Back to top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;