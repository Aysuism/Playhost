import React from 'react'

import Hero from './Hero'
import IncrediblyFeatures from './IncrediblyFeatures '
import StartYourGame from './StartYourGame'
import ServerLocations from './ServerLocations'
import MostComplete from './MostComplete'
import DowloadNow from './DowloadNow'
import DoYouHave from './DoYouHave'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import PaymentMethods from './PaymentMethods'

const Home = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className='home'>
      <Hero />
      <IncrediblyFeatures />
      <StartYourGame />
      <ServerLocations />
      <MostComplete />
      <DoYouHave />
      <DowloadNow />
      <PaymentMethods/>
    </div>
  )
}

export default Home