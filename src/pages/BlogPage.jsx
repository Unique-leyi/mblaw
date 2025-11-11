import React from 'react'
import HeroInner from '../features/Hero/HeroInner'
import Blogs from '../features/Blog/Blogs'


function BlogPage() {
  return (
    <>
     <HeroInner
       title="Blogs & Articles"
       content="Insights, Updates, and Legal Perspectives"
       image="https://res.cloudinary.com/doqvfemo3/image/upload/v1762852006/MbLaw/6228dbefd1e1d07eb8b27dab91adaa317727aaaa_etlecf.jpg"
     />
     <Blogs/>
    </>
  )
}

export default BlogPage

