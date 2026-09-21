import { useState, useEffect, useCallback } from 'react'
import './App.css'
import dji0924 from './assets/farm-images/DJI_0924.JPG'
import dji0965 from './assets/farm-images/DJI_0965.JPG'
import dji0964 from './assets/farm-images/DJI_0964.JPG'
import droneVideo from './assets/farm-images/Drone.mp4'

const WHATSAPP_NUMBERS = ['+919930123456', '+919930456789']
const CONTACT_PERSONS = ['Mr. Foo Bar', 'Mrs. Foo Bar']

const NimboniIcon = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="nimboniLeafGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7a9e5e"/>
        <stop offset="50%" stopColor="#5d7a45"/>
        <stop offset="100%" stopColor="#3d5a48"/>
      </linearGradient>
      <linearGradient id="nimboniTrunkGradient" x1="32" y1="40" x2="32" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B6914"/>
        <stop offset="100%" stopColor="#5D4037"/>
      </linearGradient>
      <radialGradient id="nimboniSunGradient" cx="50" cy="14" r="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD54F"/>
        <stop offset="100%" stopColor="#FFA000"/>
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#nimboniLeafGradient)" opacity="0.12"/>
    <path d="M32 44 C32 44 20 30 20 22 C20 14 26 8 32 8 C38 8 44 14 44 22 C44 30 32 44 32 44 Z" fill="url(#nimboniLeafGradient)"/>
    <path d="M30 44 L29 54 C29 56 31 57 33 57 L35 57 C37 57 39 56 39 54 L38 44" fill="url(#nimboniTrunkGradient)"/>
    <ellipse cx="50" cy="14" rx="14" ry="10" fill="url(#nimboniSunGradient)" opacity="0.9"/>
    <path d="M26 22 C26 22 29 18 32 18 C35 18 38 22 38 22" stroke="#4a6b3a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M30 28 C30 28 31 24 32 24 C33 24 34 28 34 28" stroke="#4a6b3a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
    <path d="M30 33 C30 33 31 30 32 30 C33 30 34 33 34 33" stroke="#4a6b3a" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4"/>
    <circle cx="22" cy="26" r="2.5" fill="#FFD54F" opacity="0.8"/>
    <circle cx="42" cy="28" r="2" fill="#FFD54F" opacity="0.6"/>
    <circle cx="28" cy="36" r="1.5" fill="#FFD54F" opacity="0.5"/>
  </svg>
)

const FARM_IMAGES = [
  { src: dji0924, alt: 'Farm drone view', type: 'image' },
  { src: dji0965, alt: 'Permaculture farm landscape', type: 'image' },
  { src: dji0964, alt: 'Green haven farm view', type: 'image' },
  { src: droneVideo, alt: 'Drone tour of Nimboni Farm', type: 'video' },
]

const TREE_TYPES = [
  { name: 'Lime Plants', count: 450, icon: '🍋', description: 'Organic lime cultivation across 2 acres', color: '#8FBC8F' },
  { name: 'Mahogani Trees', count: 100, icon: '🌳', description: 'Premium timber trees, 15+ years old', color: '#2D5A27' },
  { name: 'Guava Trees', count: 2, icon: '🍐', description: 'White & pink flesh varieties', color: '#8FBC8F' },
  { name: 'Chikoo Trees', count: 2, icon: '🍑', description: 'Sweet sapodilla fruits', color: '#D2691E' },
  { name: 'Banana Plants', count: 2, icon: '🍌', description: 'Multiple harvest cycles yearly', color: '#FFD700' },
  { name: 'Indian Lilac(Nim)', count: 10, icon: '🌿', description: 'Our native guardian', color: '#00ff5e' },
]

const SERVICES = [
  {
    id: 'farm-stay',
    title: 'Farm Stay Experience',
    shortDesc: 'Immerse in nature',
    description: 'Experience authentic farm life in our eco-friendly cottages. Wake up to birdsong, enjoy farm-fresh meals, and reconnect with nature.',
    features: [
      'Eco-friendly mud & bamboo cottages',
      'Farm-to-table organic meals (3 meals/day)',
      'Guided farm tours & nature walks',
      'Bird watching & stargazing',
      'Bonfire evenings (seasonal)',
      'Free WiFi in common areas',
      'Pickup/drop from nearest station',
    ],
    price: '₹4,500',
    pricePeriod: '/night per person',
    icon: '🏡',
    gradient: 'linear-gradient(135deg, #8a9a7b 0%, #6b7d5a 100%)',
  },
  {
    id: 'permaculture-course',
    title: 'Permaculture Design Course',
    shortDesc: '2-Day Weekend Intensive',
    description: 'Learn practical permaculture principles in a hands-on 2-day weekend course. All-inclusive with meals, stay, and course materials.',
    features: [
      'Permaculture ethics & principles',
      'Soil building & composting techniques',
      'Water harvesting & management',
      'Food forest design & implementation',
      'Natural building basics',
      'Seed saving & propagation',
      'Design your own project',
      'Certificate of completion',
    ],
    price: '₹12,000',
    pricePeriod: '/person (all-inclusive)',
    schedule: 'Saturdays & Sundays, 9 AM - 5 PM',
    icon: '🌱',
    gradient: 'linear-gradient(135deg, #d47a5a 0%, #c9b896 100%)',
  },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['hero', 'about', 'services', 'gallery', 'booking', 'contact', 'feedback']
      const scrollPos = window.scrollY + 150
      
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'booking', label: 'Book Now' },
    { id: 'contact', label: 'Contact' },
    { id: 'feedback', label: 'Feedback' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <nav className="nav container" role="navigation" aria-label="Main navigation">
        <a href="#hero" className="nav__logo" aria-label="Nimboni Farm Home">
          <NimboniIcon size={28} className="nav__logo-icon" />
          <span className="nav__logo-text">Nimboni</span>
        </a>
        
        <div className={`nav__menu ${mobileMenuOpen ? 'nav__menu--open' : ''}`}>
          <ul className="nav__list" role="list">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav__link ${activeSection === item.id ? 'nav__link--active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a href="https://wa.me/919930123456" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp nav__cta">
                <span aria-hidden="true">💬</span> Book via WhatsApp
              </a>
            </li>
          </ul>
        </div>
        
        <button
          className="nav__toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="nav__hamburger" aria-hidden="true">
            <span className={mobileMenuOpen ? 'nav__hamburger--open' : ''}></span>
          </span>
        </button>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__background" aria-hidden="true">
        <div className="hero__image" style={{ backgroundImage: `url(${dji0924})` }}></div>
        <div className="hero__gradient"></div>
        <div className="hero__pattern" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="leafPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 2 C8 5 5 8 4 12 C3 16 6 19 10 18 C14 19 17 16 16 12 C15 8 12 5 10 2" fill="currentColor" opacity="0.03"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#leafPattern)"/>
          </svg>
        </div>
      </div>
      
      <div className="hero__content container">
        <div className="hero__badge fade-in">
          <NimboniIcon size={20} />
          <span>4 Acres • 700+ Trees • Organic Certified • Since 2016</span>
        </div>
        
        <div className="hero__brand fade-in slide-up">
          <NimboniIcon size={72} className="hero__icon" />
        </div>
        
        <h1 id="hero-title" className="hero__title slide-up stagger-1">
          Welcome to <span className="hero__highlight">Nimboni Farm</span>
        </h1>
        
        <p className="hero__subtitle slide-up stagger-2">
          A thriving permaculture farm where nature meets nurture. Experience sustainable living, 
          learn regenerative farming, and find your connection to the earth.
        </p>
                
        <div className="hero__actions slide-up stagger-4">
          <a href="#booking" className="btn btn--primary btn--lg" onClick={(e) => {
            e.preventDefault()
            document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            <span aria-hidden="true">📅</span> Book Your Stay
          </a>
          <a href="#services" className="btn btn--secondary btn--lg" onClick={(e) => {
            e.preventDefault()
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Explore Experiences
          </a>
        </div>
        
        <div className="hero__trust slide-up stagger-5" aria-label="Trust indicators">
          {/* <div className="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Organic Certified (NPOP)</span>
          </div> */}
          <div className="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            <span>Rainwater Harvesting</span>
          </div>
          <div className="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <span>Solar Powered</span>
          </div>
          <div className="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <span>Zero Waste</span>
          </div>
        </div>
        
        <div className="hero__scroll-indicator slide-up stagger-6" aria-hidden="true">
          <span className="hero__scroll-text">Scroll to explore</span>
          <svg className="hero__scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function FeaturedTrees() {
  const featuredTrees = TREE_TYPES.slice(0, 6)
  
  return (
    <section id="featured-trees" className="section featured-trees" aria-labelledby="featured-trees-title">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-header__label">Our Green Family</span>
          <h2 id="featured-trees-title" className="section-header__title">Meet the Trees That Call This Home</h2>
          <p className="section-header__description">
            Each species plays a vital role in our food forest ecosystem. Tap a card to learn more.
          </p>
        </div>
        
        <div className="featured-trees__carousel" role="list" aria-label="Featured tree species">
          {featuredTrees.map((tree, index) => (
            <article 
              key={tree.name} 
              className="featured-tree-card" 
              role="listitem"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="featured-tree-card__visual" aria-hidden="true">
                <span className="featured-tree-card__icon">{tree.icon}</span>
                <div className="featured-tree-card__ring" style={{ background: `conic-gradient(from 0deg, ${tree.color || '#7a9e5e'} 0%, transparent 40%)` }}></div>
              </div>
              
              <div className="featured-tree-card__content">
                <h3 className="featured-tree-card__name">{tree.name}</h3>
                <p className="featured-tree-card__count">{tree.count}+ mature trees</p>
                <p className="featured-tree-card__description">{tree.description}</p>
              </div>
              
              <div className="featured-tree-card__meta">
                <span className="featured-tree-card__tag">Perennial</span>
                <span className="featured-tree-card__tag">Food Forest</span>
                <span className="featured-tree-card__tag">Organic</span>
              </div>
            </article>
          ))}
        </div>
        
        <div className="featured-trees__cta fade-in slide-up">
          <a href="#about" className="btn btn--outline btn--lg" onClick={(e) => {
            e.preventDefault()
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            View All 15+ Varieties
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-header__label">Our Farm & Journey to Farm Forest</span>
          <h2 id="about-title" className="section-header__title">Rooted in Nature, Growing with Purpose</h2>
          <p className="section-header__description">
            Nestled on 4 acres of fertile land, Nimboni Farm is a living testament to permaculture principles. 
            Every tree planted, every bed prepared, follows nature's wisdom.
          </p>
        </div>
        
        <div>
          <div className="section-header fade-in">
            <p className="about__story-text">
              What started as barren land in 2016 has transformed into a thriving ecosystem. Through careful observation, patient regeneration, and deep respect for natural cycles, 
              we've cultivated a food forest that feeds both body and soul.
            </p>
            <p className="about__story-text">
              Today, our farm hosts over 700 trees across 15+ varieties, creating a biodiverse haven 
              where beneficial insects, birds, and microorganisms work in harmony. No chemical fertilizers, 
              no pesticides — just pure, regenerative agriculture.
            </p>
            <div className="about__principles">
              <h4>Our Permaculture Principles</h4>
              <ul className="about__principles-list" role="list">
                <li><span aria-hidden="true">🌱</span> Observe & Interact</li>
                <li><span aria-hidden="true">💧</span> Catch & Store Energy</li>
                <li><span aria-hidden="true">🌿</span> Obtain a Yield</li>
                <li><span aria-hidden="true">🔄</span> Apply Self-Regulation</li>
                <li><span aria-hidden="true">🌍</span> Use & Value Renewables</li>
                <li><span aria-hidden="true">♻️</span> Produce No Waste</li>
                <li><span aria-hidden="true">🎨</span> Design from Patterns</li>
                <li><span aria-hidden="true">🤝</span> Integrate, Don't Segregate</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="about__certifications fade-in slide-up stagger-1">
          <h3>Certifications & Practices</h3>
          <div className="about__certifications-grid">
            <div className="certification">
              <span aria-hidden="true">🌿</span>
              <span>Organic Certified (NPOP)</span>
            </div>
            <div className="certification">
              <span aria-hidden="true">💧</span>
              <span>Rainwater Harvesting</span>
            </div>
            <div className="certification">
              <span aria-hidden="true">☀️</span>
              <span>Solar Powered</span>
            </div>
            <div className="certification">
              <span aria-hidden="true">🌱</span>
              <span>Zero Waste Farm</span>
            </div>
            <div className="certification">
              <span aria-hidden="true">🐝</span>
              <span>Pollinator Friendly</span>
            </div>
            <div className="certification">
              <span aria-hidden="true">📚</span>
              <span>Permaculture Demo Site</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-header__label">What We Offer</span>
          <h2 id="services-title" className="section-header__title">Experiences That Transform</h2>
          <p className="section-header__description">
            Whether you seek a peaceful retreat or hands-on learning, our offerings are designed 
            to reconnect you with nature's rhythms.
          </p>
        </div>
        
        <div className="services__grid" role="list">
          {SERVICES.map((service, index) => (
            <article key={service.id} className="service-card" role="listitem" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="service-card__icon" style={{ background: service.gradient }} aria-hidden="true">
                <span style={{ fontSize: '2.5rem' }}>{service.icon}</span>
              </div>
              
              <div className="service-card__content">
                <div className="service-card__header">
                  <span className="service-card__short-desc">{service.shortDesc}</span>
                  <h3 className="service-card__title">{service.title}</h3>
                </div>
                
                <p className="service-card__description">{service.description}</p>
                
                <ul className="service-card__features" role="list">
                  {service.features.map((feature, i) => (
                    <li key={i} className="service-card__feature">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {service.schedule && (
                  <p className="service-card__schedule">
                    <span aria-hidden="true">📅</span> {service.schedule}
                  </p>
                )}
                
                <div className="service-card__price">
                  <span className="service-card__price-amount">{service.price}</span>
                  <span className="service-card__price-period">{service.pricePeriod}</span>
                </div>
                
                <a 
                  href="#booking" 
                  className="btn btn--primary service-card__btn"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                    setTimeout(() => {
                      document.getElementById('service-select')?.focus()
                    }, 500)
                  }}
                >
                  Book {service.id === 'farm-stay' ? 'Your Stay' : 'Your Spot'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const mediaItems = FARM_IMAGES
  const mediaLength = mediaItems.length
  
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % mediaLength)
  }, [mediaLength])
  
  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + mediaLength) % mediaLength)
  }, [mediaLength])
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])
  
  const openLightbox = useCallback((index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])
  
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])
  
  const handleLightboxNext = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % mediaLength)
  }, [mediaLength])
  
  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + mediaLength) % mediaLength)
  }, [mediaLength])
  
  useEffect(() => {
    if (lightboxOpen) {
      const handleKey = (e) => {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowRight') handleLightboxNext()
        if (e.key === 'ArrowLeft') handleLightboxPrev()
      }
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxOpen, closeLightbox, handleLightboxNext, handleLightboxPrev])
  
  const renderMedia = (item, className = '') => {
    if (item.type === 'video') {
      return (
        <video
          src={item.src}
          alt={item.alt}
          className={className}
          controls
          playsInline
          muted
          loop
        />
      )
    }
    return (
      <img
        src={item.src}
        alt={item.alt}
        className={className}
        loading="lazy"
      />
    )
  }

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-header__label">Photo & Video Gallery</span>
          <h2 id="gallery-title" className="section-header__title">Moments at Nimboni Farm</h2>
          <p className="section-header__description">
            Glimpses of life on the farm — from misty mornings to golden sunsets.
          </p>
        </div>
        
        <div className="gallery__main" role="region" aria-label="Main gallery carousel">
          <button 
            className="gallery__nav gallery__nav--prev" 
            onClick={prevSlide}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <div className="gallery__viewport">
            {renderMedia(mediaItems[currentIndex], 'gallery__image')}
          </div>
          
          <button 
            className="gallery__nav gallery__nav--next" 
            onClick={nextSlide}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        
        <div className="gallery__thumbnails" role="list" aria-label="Media thumbnails">
          {mediaItems.map((item, index) => (
            <button
              key={index}
              className={`gallery__thumb ${index === currentIndex ? 'gallery__thumb--active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              role="listitem"
              aria-label={`View ${item.type} ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            >
              {renderMedia(item)}
            </button>
          ))}
        </div>
        
        <div className="gallery__grid" role="list" aria-label="Additional gallery media">
          {mediaItems.slice(4).map((item, index) => (
            <button
              key={index + 4}
              className="gallery__grid-item"
              onClick={() => openLightbox(index + 4)}
              role="listitem"
            >
              {renderMedia(item)}
              <div className="gallery__grid-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  {item.type === 'video' ? (
                    <polygon points="5 3 19 12 5 21 5 3" />
                  ) : (
                    <>
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </>
                  )}
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Media full view">
          <button 
            className="lightbox__close" 
            onClick={(e) => { e.stopPropagation(); closeLightbox() }}
            aria-label="Close lightbox"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <button 
            className="lightbox__nav lightbox__nav--prev" 
            onClick={(e) => { e.stopPropagation(); handleLightboxPrev() }}
            aria-label="Previous media"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <div className="lightbox__media">
            {renderMedia(mediaItems[lightboxIndex], 'lightbox__image')}
          </div>
          
          <button 
            className="lightbox__nav lightbox__nav--next" 
            onClick={(e) => { e.stopPropagation(); handleLightboxNext() }}
            aria-label="Next media"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          
          <p className="lightbox__counter" aria-hidden="true">
            {lightboxIndex + 1} / {mediaItems.length}
          </p>
        </div>
      )}
    </section>
  )
}

function Booking() {
  const [selectedService, setSelectedService] = useState('farm-stay')
  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  
  const today = new Date()
  const minDate = today.toISOString().split('T')[0]
  
  const isWeekend = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    const day = date.getDay()
    return day === 0 || day === 6
  }
  
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^[\d\s+\-()]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number'
    if (!selectedDate) newErrors.date = 'Please select a date'
    else if (!isWeekend(selectedDate)) newErrors.date = 'Courses & stays available on weekends only'
    if (guests < 1) newErrors.guests = 'At least 1 guest required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const bookingData = {
        ...formData,
        service: selectedService,
        date: selectedDate,
        guests,
        timestamp: new Date().toISOString(),
      }
      console.log('Booking submitted:', bookingData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSelectedDate('')
      setGuests(1)
    }
  }

  return (
    <section id="booking" className="section booking" aria-labelledby="booking-title">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-header__label">Reserve Your Experience</span>
          <h2 id="booking-title" className="section-header__title">Book Your Stay or Course</h2>
          <p className="section-header__description">
            Select your preferred date (weekends only) and we'll confirm via WhatsApp. 
            No payment gateway — just simple, direct booking.
          </p>
        </div>
        
        {submitted ? (
          <div className="booking__success fade-in slide-up" role="alert">
            <div className="booking__success-icon" aria-hidden="true">✨</div>
            <h3>Booking Request Sent!</h3>
            <p>We've received your request. Our team will contact you on WhatsApp within 24 hours to confirm availability and details.</p>
            <button className="btn btn--primary" onClick={() => setSubmitted(false)}>
              Make Another Booking
            </button>
          </div>
        ) : (
          <form className="booking__form" onSubmit={handleSubmit} noValidate>
            <div className="booking__form-row">
              <div className="form-group">
                <label htmlFor="service-select" className="form-label">Select Experience <span aria-hidden="true">*</span></label>
                <select
                  id="service-select"
                  className="form-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.title} — {s.price} {s.pricePeriod}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="booking__form-row">
              <div className="form-group">
                <label htmlFor="booking-date" className="form-label">Preferred Date <span aria-hidden="true">*</span></label>
                <div className="form-input-wrapper">
                  <input
                    type="date"
                    id="booking-date"
                    className={`form-input ${errors.date ? 'form-input--error' : ''}`}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={minDate}
                    required
                    aria-describedby={errors.date ? 'date-error' : 'date-hint'}
                  />
                  <span className="form-input-icon" aria-hidden="true">📅</span>
                </div>
                {errors.date && <p id="date-error" className="form-error" role="alert">{errors.date}</p>}
                <p id="date-hint" className="form-hint">Weekends only (Sat & Sun). Courses run 9 AM - 5 PM.</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="guests" className="form-label">Number of Guests <span aria-hidden="true">*</span></label>
                <div className="form-input-wrapper">
                  <input
                    type="number"
                    id="guests"
                    className={`form-input ${errors.guests ? 'form-input--error' : ''}`}
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="10"
                    required
                    aria-describedby={errors.guests ? 'guests-error' : undefined}
                  />
                  <span className="form-input-icon" aria-hidden="true">👥</span>
                </div>
                {errors.guests && <p id="guests-error" className="form-error" role="alert">{errors.guests}</p>}
              </div>
            </div>
            
            <div className="booking__form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name <span aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="name"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="form-error" role="alert">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address <span aria-hidden="true">*</span></label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <p id="email-error" className="form-error" role="alert">{errors.email}</p>}
              </div>
            </div>
            
            <div className="booking__form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number <span aria-hidden="true">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                />
                {errors.phone && <p id="phone-error" className="form-error" role="alert">{errors.phone}</p>}
                <p id="phone-hint" className="form-hint">We'll confirm via WhatsApp/call</p>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Special Requests / Notes</label>
              <textarea
                id="message"
                className="form-textarea"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows="4"
                placeholder="Dietary requirements, accessibility needs, questions about the course..."
              />
            </div>
            
            <div className="booking__actions">
              <button type="submit" className="btn btn--primary booking__submit">
                <span aria-hidden="true">📱</span> Submit & Connect on WhatsApp
              </button>
              <p className="booking__note">
                By submitting, you agree to be contacted via WhatsApp at <strong>{WHATSAPP_NUMBERS[0]}</strong> or <strong>{WHATSAPP_NUMBERS[1]}</strong>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-header__label">Get In Touch</span>
          <h2 id="contact-title" className="section-header__title">We'd Love to Hear From You</h2>
          <p className="section-header__description">
            Have questions? Want to customize your visit? Reach out directly — we're just a message away.
          </p>
        </div>
        
        <div className="contact__grid">
          <div className="contact__info fade-in slide-up">
            <div className="contact__social-section">
              <h3>Follow Our Journey</h3>
              <div className="contact__social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="contact__whatsapp-banner">
              <div className="contact__whatsapp-content">
                <div className="contact__whatsapp-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.454.13-.606.149-.149.347-.347.75-.524 1.12-.523 1.783-1.223 1.98-1.423.233-.233.31-.333.41-.48.133-.2-.027-.353-.37-.558-.387-.227-.967-.688-1.216-.91-.3-.273-.788-.213-1.024-.03-.233.18-.524.67-.79 1.15-.357.646-.82 1.63-1.293 2.726-.47 1.095-.86 2.117-1.17 3.11-.267.866-.31 1.76-.31 1.976 0 .2.067.383.183.55.15.233.283.467.5.633.387.283.987.233 1.266.1.267-.1.633-.167 1.117-.35.283-.1.523-.166.734-.18.25-.017.475-.05.666-.067.183-.033.383.05.5.15.2.15.417.367.583.567.183.217.283.583.317.783.033.183 0 .367-.05.517-.05.133-.2.25-.517.35-.8.083-.3-.066-.567-.433-.95-.367-.367-1.017-1.183-1.183-1.55-.167-.367-.317-.583-.517-.767-.2-.183-.483-.233-.767-.15-.2.067-.4.2-.583.35-.3.267-.933.75-1.083.9-.15.15-.4.333-.583.45-.183.117-.517.167-.85.15-.417-.017-1.2-.333-1.333-1.1-.117-.667-.05-1.35-.1-1.483-.033-.117-.233-.166-.433-.15-.2.017-.4.067-.583.1-.35.05-.617.067-.866.05-.25-.017-.533-.05-.7-.117" />
                  </svg>
                </div>
                <div>
                  <h3>Quick Booking via WhatsApp</h3>
                  <p>Message us directly for instant booking confirmation</p>
                </div>
                <div className="contact__whatsapp-buttons">
                  {WHATSAPP_NUMBERS.map((number, index) => (
                    <a
                      key={index}
                      href={`https://wa.me/${number.replace('+', '')}?text=${encodeURIComponent(`Hello ${CONTACT_PERSONS[index]},\n\nI'm interested in booking a farm stay / permaculture course at Nimboni Farm. Could you please share availability for this weekend?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--whatsapp"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.454.13-.606.149-.149.347-.347.75-.524 1.12-.523 1.783-1.223 1.98-1.423.233-.233.31-.333.41-.48.133-.2-.027-.353-.37-.558-.387-.227-.967-.688-1.216-.91-.3-.273-.788-.213-1.024-.03-.233.18-.524.67-.79 1.15-.357.646-.82 1.63-1.293 2.726-.47 1.095-.86 2.117-1.17 3.11-.267.866-.31 1.76-.31 1.976 0 .2.067.383.183.55.15.233.283.467.5.633.387.283.987.233 1.266.1.267-.1.633-.167 1.117-.35.283-.1.523-.166.734-.18.25-.017.475-.05.666-.067.183-.033.383.05.5.15.2.15.417.367.583.567.183.217.283.583.317.783.033.183 0 .367-.05.517-.05.133-.2.25-.517.35-.8.083-.3-.066-.567-.433-.95-.367-.367-1.017-1.183-1.183-1.55-.167-.367-.317-.583-.517-.767-.2-.183-.483-.233-.767-.15-.2.067-.4.2-.583.35-.3.267-.933.75-1.083.9-.15.15-.4.333-.583.45-.183.117-.517.167-.85.15-.417-.017-1.2-.333-1.333-1.1-.117-.667-.05-1.35-.1-1.483-.033-.117-.233-.166-.433-.15-.2.017-.4.067-.583.1-.35.05-.617.067-.866.05-.25-.017-.533-.05-.7-.117" />
                      </svg>
                      {CONTACT_PERSONS[index]}: {number}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact__map-wrapper fade-in slide-up stagger-1">
            <div className="contact__map" role="img" aria-label="Map showing Nimboni Farm location">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d73.8!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzAwLjAiTiA3M8KwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nimboni Farm Location"
              ></iframe>
              <div className="contact__map-overlay">
                <div className="contact__map-marker" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="contact__visit-info">
              <div className="contact__visit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <h4>Visit Us</h4>
                  <address>
                    <p>Nimboni Farm Permaculture Farm</p>
                    <p>4 Acres, Survey No. 123/4</p>
                    <p>Near Green Valley, Taluka</p>
                    <p>Maharashtra 410XXX, India</p>
                  </address>
                </div>
              </div>
              <div className="contact__visit-item contact__visit-directions">
                <a href="https://maps.app.goo.gl/4yPMbCMtMhX7dhN87" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                    <path d="M12 2v8M12 14v6"/>
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Feedback() {
  const [feedbackList, setFeedbackList] = useState(() => {
    const saved = localStorage.getItem('greenhaven-feedback')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    return []
  })
  const [formData, setFormData] = useState({ name: '', rating: 5, message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  
  const saveFeedback = (feedback) => {
    const updated = [feedback, ...feedbackList].slice(0, 50)
    setFeedbackList(updated)
    localStorage.setItem('greenhaven-feedback', JSON.stringify(updated))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.message.trim()) return
    
    setSubmitting(true)
    setTimeout(() => {
      const newFeedback = {
        id: Date.now(),
        name: formData.name,
        rating: formData.rating,
        message: formData.message,
        date: new Date().toISOString(),
      }
      saveFeedback(newFeedback)
      setFormData({ name: '', rating: 5, message: '' })
      setShowForm(false)
      setSubmitting(false)
    }, 500)
  }
  
  const stars = [1, 2, 3, 4, 5]
  
  return (
    <section id="feedback" className="section feedback" aria-labelledby="feedback-title">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-header__label">Guest Voices</span>
          <h2 id="feedback-title" className="section-header__title">Feedback Wall</h2>
          <p className="section-header__description">
            Real experiences from our visitors. Your story matters too.
          </p>
        </div>
        
        <div className="feedback__layout">
          <div className="feedback__wall fade-in slide-up">
            {feedbackList.length === 0 ? (
              <div className="feedback__empty">
                <span aria-hidden="true">🌱</span>
                <p>No feedback yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="feedback__list" role="list">
                {feedbackList.map((item, index) => (
                  <article key={item.id} className="feedback__card" role="listitem" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="feedback__card-header">
                      <div className="feedback__card-avatar" aria-hidden="true">
                        {item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="feedback__card-meta">
                        <h4 className="feedback__card-name">{item.name}</h4>
                        <time className="feedback__card-date" dateTime={item.date}>
                          {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </time>
                      </div>
                    </div>
                    <div className="feedback__card-rating" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                      {stars.map(star => (
                        <span key={star} className={`feedback__star ${star <= item.rating ? 'feedback__star--filled' : ''}`} aria-hidden="true">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="feedback__card-message">"{item.message}"</p>
                  </article>
                ))}
              </div>
            )}
          </div>
          
          <div className="feedback__form-container fade-in slide-up stagger-1">
            {showForm ? (
              <form className="feedback__form card" onSubmit={handleSubmit}>
                <h3>Share Your Experience</h3>
                
                <div className="form-group">
                  <label htmlFor="feedback-name" className="form-label">Your Name <span aria-hidden="true">*</span></label>
                  <input
                    type="text"
                    id="feedback-name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Your name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Rating <span aria-hidden="true">*</span></label>
                  <div className="feedback__rating-input" role="radiogroup" aria-label="Select rating">
                    {stars.map(star => (
                      <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={formData.rating === star}
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                        className={`feedback__rating-star ${formData.rating >= star ? 'feedback__rating-star--filled' : ''} ${hoverRating >= star ? 'feedback__rating-star--hover' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="feedback-message" className="form-label">Your Experience <span aria-hidden="true">*</span></label>
                  <textarea
                    id="feedback-message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows="4"
                    required
                    placeholder="What did you love? What could we improve? Any memorable moments..."
                  />
                </div>
                
                <div className="feedback__form-actions">
                  <button type="submit" className="btn btn--primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Post Feedback'}
                  </button>
                  <button type="button" className="btn btn--secondary" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button className="btn btn--primary feedback__toggle" onClick={() => setShowForm(true)}>
                <span aria-hidden="true">✍️</span> Write Feedback
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#hero" className="footer__logo">
              <NimboniIcon size={24} className="footer__logo-icon" />
              Nimboni Farm
            </a>
            <p className="footer__tagline">Permaculture Farm Stay & Education Center</p>
            <p className="footer__tagline">4 Acres • 700+ Trees • Since 2015</p>
          </div>
          
          <nav className="footer__nav" aria-label="Footer navigation">
            <h4>Quick Links</h4>
            <ul role="list">
              <li><a href="#about">About the Farm</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#booking">Book Now</a></li>
              <li><a href="#feedback">Feedback</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Nimboni Farm Permaculture Farm. All rights reserved.</p>
          <p>Grown with 🌱 & ☀️ using permaculture principles</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedTrees />
        <About />
        <Services />
        <Gallery />
        <Booking />
        <Contact />
        <Feedback />
      </main>
      <Footer />
    </>
  )
}

export default App