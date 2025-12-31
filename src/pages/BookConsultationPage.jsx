import React from 'react'
import HeroInner from '../features/Hero/HeroInner'
import BookConsultation from '../features/Consultations/BookConsultation'
import Faqs from '../features/Faqs/Faqs'


function BookConsultationPage() {
  return (
    <>
     <HeroInner
       title="Consult with us"
       content="Book a Consultation With Us Today"
       image="https://res.cloudinary.com/doqvfemo3/image/upload/v1763311730/MbLaw/735ba88ed47b580cb69fe38981913eb4b7ec8416_h3euds.jpg"
     />
     <BookConsultation/>
     <Faqs/>
    </>
  )
}

export default BookConsultationPage

