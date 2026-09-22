import { useCallback, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Story from './components/Story.jsx'
import Experiences from './components/Experiences.jsx'
import Forest from './components/Forest.jsx'
import Gallery from './components/Gallery.jsx'
import Voices from './components/Voices.jsx'
import Booking from './components/Booking.jsx'
import Faq from './components/Faq.jsx'
import Visit from './components/Visit.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'

export default function App() {
  // Which experience the visitor clicked, handed down to the booking form.
  const [intent, setIntent] = useState(null)
  const choose = useCallback((id) => setIntent(id), [])
  const clearIntent = useCallback(() => setIntent(null), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Experiences onChoose={choose} />
        <Forest />
        <Gallery />
        <Voices />
        <Booking intent={intent} onIntentHandled={clearIntent} />
        <Visit />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
