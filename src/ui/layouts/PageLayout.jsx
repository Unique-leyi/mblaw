import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import AIChatbot from '../AIChatbot'

function PageLayout() {
  return (
    <>
        <Outlet/>
      <Footer/>
      <AIChatbot/>
    </>
  )
}

export default PageLayout
