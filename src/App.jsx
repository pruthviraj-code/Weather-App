import React from 'react'
import Header from '@/Sections/Header'
import HeroSection from '@/Sections/HeroSection'
import './index.css' 

export default function App() {
  return (
<div className='min-h-screen font-dm-sans max-w-360 mx-auto'>
  <Header />
  <HeroSection/>
</div>
  )
}
