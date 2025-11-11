import React from 'react'
import HeroInner from '../features/Hero/HeroInner'
import Team from '../features/Team/Team'


function TeamPage() {
  return (
    <>
     <HeroInner
       title="Our Team"
       content="Dedicated Professionals, United by Integrity and Purpose"
       image="https://res.cloudinary.com/doqvfemo3/image/upload/v1762796911/MbLaw/Rectangle_1325_xnc2f6.png"
     />

     <Team/>
    </>
  )
}

export default TeamPage

