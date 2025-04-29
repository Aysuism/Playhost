import React from 'react'
import Hero from './Hero'
import WeArePlayhost from './WeArePlayhost'
import OurSolidTeam from './OurSolidTeam'
import Accomplisments from './Accomplisments'
import CustomerReviews from './CustomerReviews'

const AboutUs = () => {
  return (
    <div className="about">
      <Hero />
      <WeArePlayhost/>
      <OurSolidTeam/>
      <CustomerReviews/>
      <Accomplisments/>
    </div>
  )
}

export default AboutUs