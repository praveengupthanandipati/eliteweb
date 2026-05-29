import React from 'react'
import {Link} from 'react-router-dom'
import HomeHero from '../components/HomeHero'
import Homecategories from '../components/Homecategories'
import HomeBanner from '../components/HomeBanner'
import Homeproducts from '../components/Homeproducts'
import Justlaunchedproducts from '../components/Justlaunchedproducts'
import HomeBlog from '../components/HomeBlog'
import MobileAppBanner from '../components/MobileAppBanner'
import HomeDescription from '../components/HomeDescription'
import HomeSubscribe from '../components/HomeSubscribe'
import HomeFeatures from '../components/HomeFeatures'
import homeban01 from '../assets/homeban01.jpg'
import homeban02 from '../assets/homeban02.jpg'



const Home = () => {
  return (
    <React.Fragment>
      <HomeHero />
      <Homecategories />     
      <Homeproducts />
       <HomeBanner />
       {/* just launched products */}
       <Justlaunchedproducts />
       <div className="container-fluid">
        <div className="row ">
          <div className="col-md-6 p-0">
            <Link to="/products">
              <img src={homeban01} alt="homeban01" className='img-fluid w-100' />
            </Link>
          </div>
          <div className="col-md-6 p-0">
            <Link to="/products">
              <img src={homeban02} alt="homeban02" className='img-fluid w-100' />
            </Link>
          </div>
        </div>
       </div>

       {/* blogs */}
       <HomeBlog />
       {/* Mobile App Banner */}
       <MobileAppBanner />

       {/* Home Description */}
       <HomeDescription />

       {/* subscribe section */}
       <HomeSubscribe />
       {/* features strip */}
       <HomeFeatures />

    </React.Fragment>
  )
}

export default Home
