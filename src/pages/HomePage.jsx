import React from 'react'
import HeroHome from '../features/Hero/HeroHome'
import AboutSection from '../features/About/AboutSection'
import PracticeAreas from '../features/PracticeAreas/PracticeAreas'
import TeamSection from '../features/Team/TeamSection'
import Testimonials from '../features/Testimonials/Testimonials'
import BlogSection from '../features/Blog/BlogSection'
import Navbar from '../ui/layouts/Navbar'
import Faqs from '../features/Faqs/Faqs'
import ContactSection from '../features/Contact/ContactSection'

function HomePage() {
  return (
    <>
      <Navbar/>
      <HeroHome/>
      <AboutSection/>
      <PracticeAreas/>
      <TeamSection/>
      <Testimonials/>
      <BlogSection/>
      <ContactSection/>
      <Faqs/>
    </>
  )
}

export default HomePage