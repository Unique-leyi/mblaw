import React from 'react'
import HeroInner from '../features/Hero/HeroInner'
import ContactForm from '../features/Contact/ContactForm'
import ContactInfo from '../features/Contact/ContactInfo'


function ContactPage() {
  return (
    <>
     <HeroInner
       title="Contact us"
       content="Connect With MB Law for Trusted Legal Guidance"
       image="https://res.cloudinary.com/doqvfemo3/image/upload/v1762851586/MbLaw/3ef51ac5abbfe56d086357a70fda80c173be28ee_ec0c10.jpg"
     />
     <ContactForm/>
     <ContactInfo/>
    </>
  )
}

export default ContactPage

