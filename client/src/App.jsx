import { useState } from 'react';
import BookingForm from './components/BookingForm';
import logo from './assets/logo.jpeg';

const COMPANY = {
  name: 'Ritu Tourist Taxi Service',
  tagline: 'Delhi\'s Trusted Cab Service',
  phone: '+91-9999999999',        // ← replace with your number
  whatsapp: '919999999999',       // ← replace (digits only, with 91)
  email: 'info@swiftridetravels.com',   // ← replace
  address: 'Connaught Place, New Delhi – 110001',
  facebook:  'https://facebook.com/yourpage',   // ← replace
  instagram: 'https://instagram.com/yourpage',  // ← replace
  twitter:   'https://twitter.com/yourpage',    // ← replace
  youtube:   'https://youtube.com/yourchannel', // ← replace
};

const SERVICES = [
  { icon: '✈️', title: 'Airport Pickup & Drop', desc: 'On-time guaranteed pickup and drop to all Delhi NCR airports. Flight tracking included.' },
  { icon: '🏙️', title: 'Local City Tours', desc: 'Explore Delhi\'s iconic monuments, markets and hidden gems with our expert local drivers.' },
  { icon: '💍', title: 'Wedding & Events', desc: 'Make your special day memorable with our premium decorated car service for weddings and events.' },
  { icon: '🗺️', title: 'Outstation Trips', desc: 'Comfortable long-distance travel to Agra, Jaipur, Shimla, Manali and all major destinations.' },
];

const FLEET = [
  { emoji: '🚗', name: 'Sedan', model: 'Swift Dzire / Honda Amaze', desc: 'Ideal for 4 passengers. Comfortable for city rides and short trips.', tags: ['AC', '4 Seats', 'City & Airport'] },
  { emoji: '🚙', name: 'SUV', model: 'Innova Crysta / Ertiga', desc: 'Perfect for families and groups. Spacious with extra luggage room.', tags: ['AC', '6-7 Seats', 'Outstation'] },
  // { emoji: '🚐', name: 'Tempo Traveller', model: '12-17 Seater', desc: 'Best for group tours, office trips, and wedding baraat bookings.', tags: ['AC', '12-17 Seats', 'Groups'] },
];

const TESTIMONIALS = [
  { name: 'Rahul Sharma', location: 'Connaught Place', text: 'Booked for airport drop at 4 AM and the driver was 10 minutes early. Very professional and the car was clean. Will always use SwiftRide for my travels.', rating: 5 },
  { name: 'Priya Gupta', location: 'South Delhi', text: 'Used them for our wedding car fleet. Everything was decorated beautifully and all drivers were on time. The whole experience was stress-free!', rating: 5 },
  { name: 'Amit Verma', location: 'Noida', text: 'Did a Jaipur trip with family in an Innova. Driver was knowledgeable about routes and very helpful. Pricing was also very fair compared to others.', rating: 5 },
];

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookedName, setBookedName] = useState('');

  function handleSuccess(name) {
    setBookedName(name);
    setShowSuccess(true);
  }

  return (
    <>
      {/* Marquee */}
      <div className="marquee-bar">
        <span>
          📞 24x7 Support: {COMPANY.phone} &nbsp;&nbsp;&nbsp; ✉️ {COMPANY.email} &nbsp;&nbsp;&nbsp; 🚗 Serving all Delhi NCR — Airport, Outstation, Local & Wedding bookings &nbsp;&nbsp;&nbsp; 📞 24x7 Support: {COMPANY.phone} &nbsp;&nbsp;&nbsp; ✉️ {COMPANY.email} &nbsp;&nbsp;&nbsp; 🚗 Serving all Delhi NCR
        </span>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-top">
          <div className="header-top-inner">
            <div className="header-top-left">
              <span><i className="fas fa-headset"></i>24x7 Support</span>
              <span><i className="fas fa-phone"></i>{COMPANY.phone}</span>
              <span><i className="fas fa-envelope"></i>{COMPANY.email}</span>
            </div>
            <div className="header-top-right">
              <a href={COMPANY.facebook}><i className="fab fa-facebook-f"></i></a>
              <a href={COMPANY.instagram}><i className="fab fa-instagram"></i></a>
              <a href={COMPANY.twitter}><i className="fab fa-twitter"></i></a>
              <a href={COMPANY.youtube}><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="header-main">
          <a href="#" className="logo">
            <div className="logo-icon"><img src={logo} alt={`${COMPANY.name} logo`} className="logo-icon" /></div>
            <div className="logo-text">
              <div className="logo-name">{COMPANY.name}</div>
              <div className="logo-tagline">{COMPANY.tagline}</div>
            </div>
          </a>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#fleet">Car Fleet</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#booking" className="nav-cta">Book Now</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-bg-pattern"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-star"></i> Trusted by 5000+ Customers in Delhi
            </div>
            <h1>
              Travel Delhi &<br />
              Beyond with <span>Comfort</span>
            </h1>
            <p>
              Professional cab service for airport transfers, local sightseeing,
              outstation trips and special occasions. Available 24x7 across Delhi NCR.
            </p>
            <div className="hero-buttons">
              <a href="#booking" className="btn-primary">
                <i className="fas fa-car"></i> Book a Cab
              </a>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} className="btn-outline" target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp"></i> WhatsApp Us
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">5000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-num">8+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-num">50+</div>
                <div className="stat-label">Cars Available</div>
              </div>
              <div className="stat">
                <div className="stat-num">24x7</div>
                <div className="stat-label">Always Online</div>
              </div>
            </div>
          </div>
          <div id="booking">
            <BookingForm onSuccess={handleSuccess} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-title">
            <span className="label">What We Offer</span>
            <h2>Our Travel Services</h2>
            <p>From daily commutes to special occasions — we have the right car and the right driver for every journey.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="about">
        <div className="container">
          <div className="why-grid">
            <div className="why-text">
              <span className="label" style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Why Choose Us</span>
              <h2>Delhi's Most Reliable<br />Cab Service</h2>
              <p>We started with a single cab and a promise to our first customer — always be on time. Today we operate a fleet of 50+ vehicles across Delhi NCR with the same commitment to reliability and comfort.</p>
              <ul className="features-list">
                {[
                  'GPS tracked vehicles — know where your cab is at all times',
                  'Verified, trained and background-checked drivers',
                  'No hidden charges — price agreed before the trip',
                  'Clean, well-maintained and sanitized cars',
                  'Instant booking confirmation via WhatsApp & SMS',
                  'Corporate accounts available with monthly billing',
                ].map(f => (
                  <li key={f}>
                    <span className="check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="counters-grid">
              <div className="counter-card">
                <div className="counter-num">5K+</div>
                <div className="counter-label">Happy Clients</div>
              </div>
              <div className="counter-card">
                <div className="counter-num">50+</div>
                <div className="counter-label">Cars in Fleet</div>
              </div>
              <div className="counter-card">
                <div className="counter-num">8+</div>
                <div className="counter-label">Years in Delhi</div>
              </div>
              <div className="counter-card" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                <div className="counter-num">24x7</div>
                <div className="counter-label">Always Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="fleet" id="fleet">
        <div className="container">
          <div className="section-title">
            <span className="label">Our Vehicles</span>
            <h2>Choose Your Car</h2>
            <p>From compact sedans to large tempo travellers — we have the right vehicle for every group size and trip type.</p>
          </div>
          <div className="fleet-grid">
            {FLEET.map(car => (
              <div className="fleet-card" key={car.name}>
                <div className="fleet-img">{car.emoji}</div>
                <div className="fleet-info">
                  <h3>{car.name}</h3>
                  <p style={{ fontStyle: 'italic', fontSize: '12px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>{car.model}</p>
                  <p>{car.desc}</p>
                  <div className="fleet-tags">
                    {car.tags.map(t => <span className="fleet-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="container">
          <div className="section-title">
            <span className="label">Customer Reviews</span>
            <h2>What Our Customers Say</h2>
            <p>Real reviews from real customers across Delhi NCR.</p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div className="testimonial-card" key={t.name}>
                <div className="stars">{'★'.repeat(t.rating)}</div>
                <p>{t.text}</p>
                <div className="reviewer">
                  <div className="reviewer-avatar">{t.name[0]}</div>
                  <div>
                    <div className="reviewer-name">{t.name}</div>
                    <div className="reviewer-location">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-title">
            <span className="label">Get In Touch</span>
            <h2>Contact Us</h2>
            <p>Available 24x7 — call, WhatsApp or email us anytime.</p>
          </div>
          <div className="contact-cards-row">
            <a href={`tel:${COMPANY.phone}`} className="contact-action-card">
              <div className="cac-icon" style={{ background: 'var(--navy)' }}><i className="fas fa-phone"></i></div>
              <div className="cac-label">Call Us Now</div>
              <div className="cac-value">{COMPANY.phone}</div>
              <div className="cac-note">Available 24x7</div>
            </a>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} className="contact-action-card" target="_blank" rel="noreferrer">
              <div className="cac-icon" style={{ background: '#25d366' }}><i className="fab fa-whatsapp"></i></div>
              <div className="cac-label">WhatsApp</div>
              <div className="cac-value">{COMPANY.phone}</div>
              <div className="cac-note">Instant reply</div>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="contact-action-card">
              <div className="cac-icon" style={{ background: '#ea4335' }}><i className="fas fa-envelope"></i></div>
              <div className="cac-label">Email Us</div>
              <div className="cac-value">{COMPANY.email}</div>
              <div className="cac-note">Reply within 2 hours</div>
            </a>
            <div className="contact-action-card">
              <div className="cac-icon" style={{ background: 'var(--gold)' }}><i className="fas fa-map-marker-alt"></i></div>
              <div className="cac-label">Our Office</div>
              <div className="cac-value" style={{ fontSize: '13px' }}>{COMPANY.address}</div>
              <div className="cac-note">Mon-Sat 9am-8pm</div>
            </div>
          </div>
          <div className="map-wrap">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.671!2d77.2167!3d28.6328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="340"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen="" loading="lazy"
            />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#" className="logo">
              <div className="logo-icon">🚗</div>
              <div className="logo-text">
                <div className="logo-name" style={{ color: 'var(--white)' }}>{COMPANY.name}</div>
                <div className="logo-tagline">{COMPANY.tagline}</div>
              </div>
            </a>
            <p>Your trusted travel partner in Delhi NCR. Professional drivers, clean vehicles, and always on time — that's our promise.</p>
            <div className="footer-socials">
              <a href={COMPANY.facebook}><i className="fab fa-facebook-f"></i></a>
              <a href={COMPANY.instagram}><i className="fab fa-instagram"></i></a>
              <a href={COMPANY.twitter}><i className="fab fa-twitter"></i></a>
              <a href={COMPANY.youtube}><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Airport Transfer</a></li>
              <li><a href="#services">Local City Tour</a></li>
              <li><a href="#services">Wedding Cars</a></li>
              <li><a href="#services">Outstation Trips</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#fleet">Car Fleet</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#booking">Book Now</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item"><i className="fas fa-phone"></i><span>{COMPANY.phone}</span></div>
            <div className="footer-contact-item"><i className="fas fa-envelope"></i><span>{COMPANY.email}</span></div>
            <div className="footer-contact-item"><i className="fas fa-map-marker-alt"></i><span>{COMPANY.address}</span></div>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p>© 2025 {COMPANY.name}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a href={`https://wa.me/${COMPANY.whatsapp}`} className="whatsapp-float" target="_blank" rel="noreferrer" title="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
      <a href={`tel:${COMPANY.phone}`} className="call-float" title="Call us">
        <i className="fas fa-phone"></i>
      </a>

      {/* Sticky Social */}
      <div className="sticky-social">
        <a href={COMPANY.facebook} className="ss-fb"><i className="fab fa-facebook-f"></i> Facebook</a>
        <a href={COMPANY.instagram} className="ss-ig"><i className="fab fa-instagram"></i> Instagram</a>
        <a href={COMPANY.twitter} className="ss-tw"><i className="fab fa-twitter"></i> Twitter</a>
        <a href={COMPANY.youtube} className="ss-yt"><i className="fab fa-youtube"></i> YouTube</a>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <i className="fas fa-check-circle"></i>
            <h3>Booking Confirmed!</h3>
            <p>Thank you <strong>{bookedName}</strong>! Your cab booking has been received. We'll call you within 30 minutes to confirm all details.</p>
            <button onClick={() => setShowSuccess(false)}>Great, Thanks!</button>
          </div>
        </div>
      )}
    </>
  );
}
