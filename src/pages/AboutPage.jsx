import React from 'react'
import HeroInner from '../features/Hero/HeroInner'
import AboutUs from '../features/About/AboutUs'
import OurMission from '../features/About/OurMission'
import WhyUs from '../features/About/WhyUs'


function AboutPage() {
  return (
    <>
     <HeroInner
       title="About Us"
       content="Our Story of Integrity, Innovation, and Client Dedication"
       image="https://res.cloudinary.com/doqvfemo3/image/upload/v1762796911/MbLaw/Rectangle_1325_xnc2f6.png"
     />
     <AboutUs/>
     <OurMission/>
     <WhyUs/>
    </>
  )
}

export default AboutPage

