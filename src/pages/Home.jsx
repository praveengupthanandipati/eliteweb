import React from 'react'
import HomeHero from '../components/HomeHero'
import Homecategories from '../components/Homecategories'
import HomeBanner from '../components/HomeBanner'
import Homeproducts from '../components/Homeproducts'

const Home = () => {
  return (
    <React.Fragment>
      <HomeHero />
      <Homecategories />     
      <Homeproducts />
       <HomeBanner />
       {/* just launched products */}
       
    </React.Fragment>
  )
}

export default Home
