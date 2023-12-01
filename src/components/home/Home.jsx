import React from 'react'
import NavBar from './NavBar'
import Banner from './Banner'
import Slide from './Slide';
import { Box, styled } from '@mui/material';
import MidSlides from './MidSlides';

const Component = styled(Box)({
  padding: '10px',
  background: '#F2F2F2'
})

const Home = () => { 

  return (
    <>
      <NavBar />
      <Component>
        <Banner />
        <MidSlides title="Best of Electronics" timer={true} />
        <Slide title="Top Deals on Fashion" timer={false} autoPlay={false} filterText = {"clothing"} />
        <Slide title="Season's Top Pick" timer={false} autoPlay={false}  />
        
      </Component>
    </>
    
  )
}

export default Home