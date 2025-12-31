import React from 'react'
import HeroInner from '../features/Hero/HeroInner'
import PracticeAreas from '../features/PracticeAreas/PracticeAreas'
import Faqs from '../features/Faqs/Faqs'

function PracticeAreasPage() {
  return (
    <>
      <HeroInner
        title="Our Practice Areas"
        content="Comprehensive Legal Solutions Across Multiple Specializations"
        image="https://res.cloudinary.com/doqvfemo3/image/upload/v1762775964/MbLaw/c9513e67f953fa8ae6c5f6768cab09029a6fd989_krfiwc.jpg"
      />
      <PracticeAreas />
      <Faqs/>
    </>
  )
}

export default PracticeAreasPage
