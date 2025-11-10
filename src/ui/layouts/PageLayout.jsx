import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import AIChatbot from '../AIChatbot'

function PageLayout() {
  return (
    <>
      <Navbar/>
        <Outlet/>
      <Footer/>
      <AIChatbot/>
    </>
  )
}

export default PageLayout
