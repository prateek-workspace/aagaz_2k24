import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "../App.css";
import "./style/home.css";
import aagaz_logo from "../res/Logo.png";
import teamPhoto from "../res/aagazbg.png";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMedal, FaTrophy, FaLaptop } from "react-icons/fa";
import sportIcon1 from "../res/valorant.jpg";
import sportIcon2 from "../res/bgmi.jpg";

const Home = () => {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 99,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Animation controls for scroll-triggered animations
  const controls = useAnimation();
  const featuresControl = useAnimation();
  const statsControl = useAnimation();
  const eventsControl = useAnimation();
  
  // Intersection observers for different sections
  const [aboutRef, aboutInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [eventsRef, eventsInView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Event date - set to a future date
  const eventDate = new Date('2025-02-15T00:00:00');

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Trigger animations when sections come into view
  useEffect(() => {
    if (aboutInView) controls.start("visible");
    if (featuresInView) featuresControl.start("visible");
    if (statsInView) statsControl.start("visible");
    if (eventsInView) eventsControl.start("visible");
  }, [controls, aboutInView, featuresControl, featuresInView, statsControl, statsInView, eventsControl, eventsInView]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const heroImageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const countdownVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: i => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  // Event data
  const events = [
    {
      id: 1,
      name: "Valorant Tournament",
      date: "Feb 16, 2025",
      description: "Compete in the region's biggest Valorant tournament with teams from all over India.",
      image: sportIcon1,
      category: "Esports"
    },
    {
      id: 2,
      name: "BGMI Championship",
      date: "Feb 17, 2025",
      description: "Battle it out in BGMI for incredible prizes and glory in this esports extravaganza.",
      image: sportIcon2,
      category: "Esports"
    }
  ];

  // Dynamic background with particles effect
  const ParticleBackground = () => {
    return (
      <div className="particles">
        {Array.from({ length: 30 }).map((_, index) => (
          <motion.div
            key={index}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 5 + 1,
              height: Math.random() * 5 + 1,
              backgroundColor: index % 3 === 0 ? "rgba(242, 56, 73, 0.6)" : 
                             index % 3 === 1 ? "rgba(0, 78, 168, 0.6)" :
                                              "rgba(255, 203, 5, 0.6)"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* Hero Section with dynamic background and countdown */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <ParticleBackground />
        
        <Container>
          <Row className="hero-content">
            <Col lg={6} className="hero-text">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.h1 variants={fadeIn} className="hero-title">
                  AAGAZ <span className="highlight-text">'25</span>
                </motion.h1>
                
                <motion.p variants={fadeIn} className="hero-subtitle">
                  HBTU's Premier Sports & Innovation Festival
                </motion.p>

                <motion.div variants={fadeIn} className="hero-description">
                  Join us for an unforgettable celebration of athleticism, technology, and college spirit. 
                  Where passion meets performance.
                </motion.div>
                
                <motion.div 
                  className="countdown-container"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="countdown-title">Event Starts In</h3>
                  <div className="countdown-timer">
                    <motion.div custom={0} variants={countdownVariants} className="countdown-item">
                      <div className="countdown-value">{timeLeft.days}</div>
                      <div className="countdown-label">Days</div>
                    </motion.div>
                    <motion.div custom={1} variants={countdownVariants} className="countdown-item">
                      <div className="countdown-value">{timeLeft.hours}</div>
                      <div className="countdown-label">Hours</div>
                    </motion.div>
                    <motion.div custom={2} variants={countdownVariants} className="countdown-item">
                      <div className="countdown-value">{timeLeft.minutes}</div>
                      <div className="countdown-label">Minutes</div>
                    </motion.div>
                    <motion.div custom={3} variants={countdownVariants} className="countdown-item">
                      <div className="countdown-value">{timeLeft.seconds}</div>
                      <div className="countdown-label">Seconds</div>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="hero-cta">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="primary-button">
                      <a
                        href="https://forms.fillout.com/t/7eJkvXYn6jus"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-link"
                      >
                        Register Now
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="secondary-button" href="#about-section">
                      Explore Events
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={6} className="hero-image-container">
              <motion.div 
                className="hero-image-wrapper"
                variants={heroImageVariants}
                initial="hidden"
                animate="visible"
              >
                <Image 
                  src={aagaz_logo} 
                  alt="AAGAZ Sports Festival" 
                  className="hero-image" 
                  fluid 
                />
                <div className="hero-image-glow"></div>
              </motion.div>
            </Col>
          </Row>
        </Container>
        
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            delay: 1.5,
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span>Scroll for more</span>
          <div className="scroll-arrow"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about-section" ref={aboutRef} id="about-section">
        <Container>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="section-content"
          >
            <motion.div variants={fadeIn} className="section-heading">
              <h2>About <span className="highlight-text">AAGAZ'25</span></h2>
              <div className="heading-underline"></div>
            </motion.div>
            
            <Row className="about-content">
              <Col md={6} className="about-text">
                <motion.p variants={fadeIn} className="about-paragraph">
                  <span className="highlight-text">AAGAZ'25</span>, HBTU Kanpur's annual sports fest, promises an even grander celebration of
                  sportsmanship, competition, and innovation. Led by{" "}
                  <strong>Secretary Akhilesh Yadav and Awantika</strong>, 4th-year B.Tech students, the event builds upon the phenomenal success of
                  AAGAZ'24.
                </motion.p>
                
                <motion.p variants={fadeIn} className="about-paragraph">
                  This mega inter-college sports fest, initiated by the <strong>Sports Sub-Council</strong>,
                  brings together a diverse range of sporting events under one dynamic platform.
                  <strong> AAGAZ'25 is not just a competition but a movement</strong>—fostering athletic
                  excellence, teamwork, and groundbreaking ideas.
                </motion.p>
                
                <motion.p variants={fadeIn} className="about-paragraph">
                  Under the leadership of <strong>Akhilesh and Awantika</strong>, the organizing team ensures
                  a seamless experience for athletes and participants. <strong>Mohammad Tauqeer and Sahil
                  Sakoor</strong>, the technical heads and creators of the event's website, continue to add an
                  innovative digital touch, enhancing the online experience.
                </motion.p>
                
                <motion.div 
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="about-cta"
                >
                  <Button className="secondary-button" href="/events0">
                    View Our Events
                  </Button>
                </motion.div>
              </Col>
              
              <Col md={6} className="about-image-container">
                <motion.div 
                  className="about-image-wrapper"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image 
                    src={teamPhoto} 
                    alt="AAGAZ Team" 
                    className="about-image" 
                    fluid 
                  />
                  <div className="image-overlay">
                    <h3>AAGAZ Team</h3>
                    <p>Passionate. Dedicated. Driven.</p>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef} id="features-section">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={featuresControl}
            className="section-content"
          >
            <motion.div variants={fadeIn} className="section-heading text-center">
              <h2>Why Choose <span className="highlight-text">AAGAZ'25</span></h2>
              <div className="heading-underline mx-auto"></div>
            </motion.div>

            <Row className="features-grid">
              {[
                {
                  icon: <FaTrophy />,
                  title: "Competitive Excellence",
                  desc: "Participate in high-quality tournaments designed to challenge and showcase your talent"
                },
                {
                  icon: <FaUsers />,
                  title: "Community Building",
                  desc: "Connect with like-minded athletes and build lasting relationships through sports"
                },
                {
                  icon: <FaMedal />,
                  title: "Professional Standards",
                  desc: "Experience events organized according to professional standards with qualified referees"
                },
                {
                  icon: <FaLaptop />,
                  title: "Digital Integration",
                  desc: "Enjoy seamless digital experience with real-time updates and online registrations"
                }
              ].map((feature, i) => (
                <Col lg={3} md={6} sm={6} key={i}>
                  <motion.div
                    className="feature-card"
                    variants={featureCardVariants}
                    custom={i}
                    whileHover="hover"
                  >
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="stats-section" ref={statsRef} id="stats-section">
        <div className="stats-overlay"></div>
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={statsControl}
            className="stats-container"
          >
            <Row>
              {[
                { value: "25+", label: "Sports Events", icon: "🏆" },
                { value: "100+", label: "Participating Colleges", icon: "🏫" },
                { value: "5000+", label: "Athletes & Participants", icon: "👥" },
                { value: "₹10L+", label: "Prize Pool", icon: "💰" }
              ].map((stat, i) => (
                <Col lg={3} md={6} sm={6} xs={6} key={i}>
                  <motion.div
                    className="stat-card"
                    variants={statVariants}
                    custom={i}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                </Col>
              ))}
            </Row>

            <motion.div
              className="stats-cta"
              variants={fadeIn}
            >
              <h3 className="stats-tagline">Get ready for AAGAZ'25 – where sports meet innovation like never before!</h3>
            </motion.div>
          </motion.div>
        </Container>
      </section>
      
      {/* Featured Events Section */}
      <section className="events-section" ref={eventsRef} id="events-section">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={eventsControl}
            className="section-content"
          >
            <motion.div variants={fadeIn} className="section-heading">
              <h2>Featured <span className="highlight-text">Events</span></h2>
              <div className="heading-underline"></div>
            </motion.div>
            
            <Row>
              {events.map((event, i) => (
                <Col lg={6} md={6} key={i}>
                  <motion.div 
                    className="event-card"
                    variants={featureCardVariants}
                    custom={i}
                    whileHover="hover"
                  >
                    <div className="event-image">
                      <Image 
                        src={event.image}
                        alt={event.name}
                        className="event-thumbnail"
                      />
                      <span className="event-category">{event.category}</span>
                    </div>
                    <div className="event-content">
                      <h3 className="event-title">{event.name}</h3>
                      <div className="event-date">
                        <FaCalendarAlt /> <span>{event.date}</span>
                      </div>
                      <p className="event-description">{event.description}</p>
                      <Button className="event-button" href={`/events0`}>
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
            
            <motion.div variants={fadeIn} className="view-all-cta">
              <Button className="primary-button" href="/events0">
                View All Events
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
